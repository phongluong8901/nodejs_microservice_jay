export interface IMailer {                     // Khai báo và xuất một interface có tên IMailer (khuôn mẫu định nghĩa dịch vụ gửi email)
  SendEmail(to: string, product: unknown): Promise<any>; // Khai báo phương thức SendEmail nhận email người nhận (to) và sản phẩm (kiểu unknown), trả về Promise
}                                               // Kết thúc interface IMailer

// Promise<any> nghĩa là hàm này thực hiện một tác vụ bất đồng bộ (async) và trả về một Promise. Khi Promise hoàn thành (resolve), nó có thể trả về bất cứ kiểu dữ liệu nào (any có nghĩa là không giới hạn kiểu dữ liệu).

// Promise: Đại diện cho một kết quả sẽ có trong tương lai (thường dùng cho các tác vụ mất thời gian như gọi API, gửi email, truy vấn database). Bạn cần dùng await hoặc .then() để lấy kết quả.

// any: Tắt tính năng kiểm tra kiểu dữ liệu của TypeScript cho giá trị trả về. Nó có thể là void (không trả gì), một string thông báo thành công, một đối tượng JSON từ server phản hồi, v.v.

// Trong thực tế, việc dùng Promise<any> thường là cách viết tạm thời hoặc tổng quát, giúp bạn không bị giới hạn kiểu dữ liệu trả về khi gọi hàm gửi email. Tuy nhiên, nếu biết rõ hàm gửi mail trả về gì (ví dụ: đối tượng phản hồi từ thư viện Nodemailer hoặc SendGrid), người ta thường thay any bằng một kiểu cụ thể hơn để code an toàn hơn.
