import { injectable } from "inversify";              // Nhập decorator injectable từ Inversify để cho phép lớp này được quản lý DI container
import { IMailer } from "../interfaces/IMailer";      // Nhập interface IMailer để đảm bảo lớp này triển khai đúng khuôn mẫu gửi email

@injectable()                                        // Đánh dấu lớp Mailer có thể được tiêm phụ thuộc vào các lớp khác
export class Mailer implements IMailer {             // Khai báo và xuất lớp Mailer triển khai interface IMailer
  SendEmail(to: string, product: unknown): Promise<any> { // Triển khai phương thức SendEmail nhận địa chỉ nhận (to) và dữ liệu sản phẩm, trả về Promise
    // send grid implementation                       // Ghi chú hướng dẫn: Nơi tích hợp dịch vụ gửi mail thực tế (ví dụ: SendGrid, Nodemailer)
    console.log("sending email");                     // In ra màn hình dòng chữ thông báo đang thực hiện gửi email
    return Promise.resolve(true);                     // Trả về một Promise đã hoàn thành thành công với giá trị true (giả lập việc gửi mail thành công)
  }
}