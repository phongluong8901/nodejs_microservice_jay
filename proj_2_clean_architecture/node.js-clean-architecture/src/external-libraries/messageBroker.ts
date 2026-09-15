import { injectable } from "inversify";              // Nhập decorator injectable từ Inversify để cho phép lớp này được quản lý DI container
import { IMessageBroker } from "../interfaces/IMessageBroker"; // Nhập interface IMessageBroker để đảm bảo lớp này tuân thủ đúng khuôn mẫu truyền tin

@injectable()                                        // Đánh dấu lớp MessageBroker có thể được tiêm phụ thuộc vào các tầng khác (như Interactor)
export class MessageBroker implements IMessageBroker { // Khai báo và xuất lớp MessageBroker triển khai interface IMessageBroker
  NotifyToPromotionService(product: unknown): Promise<any> { // Triển khai phương thức gửi thông báo sự kiện sản phẩm cho dịch vụ khuyến mãi
    // Kafka // RabbitMQ                              // Ghi chú hướng dẫn: Nơi tích hợp hệ thống message queue thực tế (như Apache Kafka hoặc RabbitMQ)
    console.log("Calling message broker");             // In ra màn hình dòng chữ thông báo đang gọi message broker
    return Promise.resolve(true);                     // Trả về một Promise đã hoàn thành với giá trị true (giả lập việc gửi message thành công)
  }
}