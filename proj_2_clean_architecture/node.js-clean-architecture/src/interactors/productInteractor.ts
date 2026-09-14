import { inject, injectable } from "inversify";          // Nhập các decorator inject và injectable từ InversifyJS để thực hiện Dependency Injection
import { IMailer } from "../interfaces/IMailer";          // Nhập interface quản lý gửi email
import { IMessageBroker } from "../interfaces/IMessageBroker"; // Nhập interface quản lý message broker
import { IProductInteractor } from "../interfaces/IProductInteractor"; // Nhập interface của tầng Interactor (Use Case)
import { IProductRepository } from "../interfaces/IProductRepository"; // Nhập interface của tầng Repository
import { INTERFACE_TYPE } from "../utils";                  // Nhập các token Symbol dùng để định danh khi tiêm phụ thuộc

@injectable()                                            // Đánh dấu lớp này có thể được quản lý và tiêm phụ thuộc bởi Inversify container
export class ProductInteractor implements IProductInteractor{ // Khai báo và xuất lớp ProductInteractor triển khai interface IProductInteractor (chứa logic nghiệp vụ)

    private repository: IProductRepository;                // Khai báo biến riêng tư lưu trữ repository tương tác database
    private mailer: IMailer;                               // Khai báo biến riêng tư lưu trữ dịch vụ gửi mail
    private broker: IMessageBroker;                        // Khai báo biến riêng tư lưu trữ dịch vụ message queue

    constructor(                                           // Hàm khởi tạo nhận các phụ thuộc được tiêm vào tự động
        @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository, // Tiêm repository dựa vào Symbol token
        @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,    // Tiêm dịch vụ mailer dựa vào Symbol token
        @inject(INTERFACE_TYPE.MessageBroker) broker: IMessageBroker, // Tiêm dịch vụ message broker dựa vào Symbol token
    ) {
        this.repository = repository;                      // Gán repository vào biến nội bộ
        (this.mailer = mailer), (this.broker = broker);    // Gán mailer và broker vào biến nội bộ
    }

    async createProduct(input: any) {                      // Phương thức bất đồng bộ xử lý nghiệp vụ tạo sản phẩm mới
        const data = await this.repository.create(input);  // Gọi repository để lưu sản phẩm vào cơ sở dữ liệu
        // do some checks                                   // Khu vực kiểm tra logic nghiệp vụ phụ (nếu có)
        await this.broker.NotifyToPromotionService(data);  // Gửi thông báo sự kiện tạo sản phẩm sang dịch vụ khuyến mãi qua broker

        return data;                                       // Trả về dữ liệu sản phẩm hoàn chỉnh
    }
    
    async updateStock(id: number, stock: number) {         // Phương thức bất đồng bộ xử lý cập nhật số lượng tồn kho
        const data = await this.repository.update(id, stock); // Gọi repository cập nhật tồn kho theo ID trong DB
        await this.mailer.SendEmail("someone@someone.com", data); // Gửi email thông báo cập nhật đến địa chỉ định sẵn
        return data;                                       // Trả về dữ liệu sản phẩm sau khi cập nhật
    }
    
    async getProducts(limit: number, offset: number) {     // Phương thức xử lý lấy danh sách sản phẩm phân trang
        return this.repository.find(limit, offset);        // Chuyển tiếp yêu cầu lấy dữ liệu xuống tầng repository và trả về kết quả
    }
}