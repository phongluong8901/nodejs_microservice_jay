import { type Consumer, Kafka, logLevel, Partitioners, type Producer } from "kafkajs";
import type { MessageBrokerType, MessageHandler, PublishType } from "./broker.type";
import type { MessageType, OrderEvent, TOPIC_TYPE } from "../../types";

// ==========================================
// 1. CẤU HÌNH KẾT NỐI KAFKA
// ==========================================
const CLIENT_ID = process.env.CLIENT_ID || "order-service";         // Tên định danh ứng dụng (hiển thị trên log Kafka)
const GROUP_ID = process.env.GROUP_ID || "order-service-group";   // Nhóm consumer (dùng để chia sẻ tải khi chạy nhiều instance)
const BROKERS = [process.env.BROKER_1 || "localhost:9092"];       // Danh sách địa chỉ các Kafka Broker

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS,
    logLevel: logLevel.INFO,                                      // Mức độ log (INFO để theo dõi thông tin cơ bản)
});

let producer: Producer;                                           // Biến lưu trữ kết nối Producer (bên gửi)
let consumer: Consumer;                                           // Biến lưu trữ kết nối Consumer (bên nhận)


// ==========================================
// 2. HÀM TỰ ĐỘNG TẠO TOPIC
// ==========================================
const createTopic = async (topic: string[]) => {
    // Cấu hình thông số cho các topic muốn tạo
    const topics = topic.map((t) => ({
        topic: t,
        numPartitions: 2,         // Chia topic thành 2 partition để xử lý song song
        replicationFactor: 1,     // Số bản sao dự phòng (phụ thuộc vào số lượng broker thực tế)
    }));

    const admin = kafka.admin();  // Khởi tạo Kafka Admin Client để quản lý cluster
    await admin.connect();        // Kết nối đến Kafka Broker

    const topicExists = await admin.listTopics(); // Lấy danh sách các topic hiện có trên hệ thống
    console.log("topicExists", topicExists);

    // Duyệt qua danh sách, nếu topic nào chưa có thì tiến hành tạo mới
    for (const t of topics) {
        if (!topicExists.includes(t.topic)) {
            await admin.createTopics({
                topics: [t],
            });
        }
    }
    await admin.disconnect();     // Ngắt kết nối Admin sau khi xong việc
};


// ==========================================
// 3. QUẢN LÝ PRODUCER (BÊN GỬI TIN NHẮN)
// ==========================================

// Kết nối Producer (áp dụng mô hình Singleton để tái sử dụng kết nối)
const connectProducer = async <T>(): Promise<T> => {
    await createTopic(["OrderEvents"]); // Đảm bảo topic "OrderEvents" đã tồn tại trước khi gửi tin

    if (producer) {
        console.log("producer already connected with existing connection");
        return producer as unknown as T; // Nếu đã kết nối rồi thì trả về luôn kết nối cũ
    }

    producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner, // Sử dụng chiến lược chia partition mặc định của KafkaJS
    });

    await producer.connect(); // Mở kết nối mới đến Kafka
    console.log("producer connected with a new connection");
    return producer as unknown as T;
};

// Đóng kết nối Producer khi ứng dụng tắt
const disconnectProducer = async (): Promise<void> => {
    if (producer) {
        await producer.disconnect();
    }
};

// Hàm Publish (Gửi message lên Kafka)
const publish = async (data: PublishType): Promise<boolean> => {
    const producer = await connectProducer<Producer>(); // Lấy kết nối producer sẵn sàng

    const result = await producer.send({
        topic: data.topic, // Topic nhận tin nhắn
        messages: [
            {
                headers: data.headers,                // Siêu dữ liệu kèm theo (metadata)
                key: data.event,                      // Key định danh sự kiện (vd: ORDER_CREATED) -> Kafka dùng để chọn partition
                value: JSON.stringify(data.message),  // Nội dung chính (payload) được chuyển sang chuỗi JSON
            },
        ],
    });

    console.log("publishing result", result);
    return result.length > 0; // Trả về true nếu gửi thành công
};


// ==========================================
// 4. QUẢN LÝ CONSUMER (BÊN NHẬN TIN NHẮN)
// ==========================================

// Kết nối Consumer (áp dụng mô hình Singleton)
const connectConsumer = async <T>(): Promise<T> => {
    if (consumer) {
        return consumer as unknown as T; // Nếu đã kết nối thì tái sử dụng
    }

    consumer = kafka.consumer({
        groupId: GROUP_ID, // Gắn consumer vào group để chia tải với các instance khác
    });

    await consumer.connect();
    return consumer as unknown as T;
};

// Đóng kết nối Consumer khi ứng dụng tắt
const disconnectConsumer = async (): Promise<void> => {
    if (consumer) {
        await consumer.disconnect();
    }
};

// Hàm Subscribe (Đăng ký lắng nghe sự kiện từ Topic)
const subscribe = async (
    messageHandler: MessageHandler, // Hàm xử lý nghiệp vụ truyền vào từ bên ngoài
    topic: TOPIC_TYPE               // Topic cần lắng nghe
): Promise<void> => {
    const consumer = await connectConsumer<Consumer>(); // Lấy kết nối consumer

    await consumer.subscribe({ topic: topic, fromBeginning: true }); // Đăng ký topic (fromBeginning: true để đọc cả message cũ chưa đọc)

    await consumer.run({
        // Hàm này chạy liên tục ngầm để hứng message mới xuất hiện trong Kafka
        eachMessage: async ({ topic, partition, message }) => {
            // Kiểm tra bảo mật cơ bản: nếu không phải topic "OrderEvents" thì bỏ qua
            if (topic !== "OrderEvents") {
                return;
            }

            // Kiểm tra xem message có chứa key và value hợp lệ không
            if (message.key && message.value) {
                // Đóng gói lại message nhận được thành định dạng chuẩn của ứng dụng
                const inputMessage: MessageType = {
                    headers: message.headers,
                    event: message.key.toString() as OrderEvent,
                    data: message.value ? JSON.parse(message.value.toString()) : null, // Chuyển chuỗi JSON ngược lại thành Object
                };

                // 1. Gọi hàm thực thi nghiệp vụ chính (vd: lưu database, cập nhật trạng thái đơn hàng...)
                await messageHandler(inputMessage);

                // 2. Commit Offset thủ công: Xác nhận với Kafka rằng message tại vị trí này đã được xử lý xong xuôi
                // (Tăng offset lên +1 để lần sau không đọc lại message này nữa)
                await consumer.commitOffsets([
                    { topic, partition, offset: (Number(message.offset) + 1).toString() },
                ]);
            }
        },
    });
};


// ==========================================
// 5. XUẤT MODULE (EXPORT)
// ==========================================
// Đóng gói tất cả các hàm thành một đối tượng thống nhất để các service khác dễ dàng gọi sử dụng
export const MessageBroker: MessageBrokerType = {
    connectProducer,
    disconnectProducer,
    publish,
    connectConsumer,
    disconnectConsumer,
    subscribe,
};