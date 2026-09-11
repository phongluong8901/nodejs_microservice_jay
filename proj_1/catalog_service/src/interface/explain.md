Promise là một đối tượng trong JavaScript/TypeScript đại diện cho kết quả của một tác vụ bất đồng bộ (asynchronous) — những công việc mất một khoảng thời gian để hoàn thành chứ không có kết quả ngay lập tức (như gọi truy vấn cơ sở dữ liệu, gọi API bên ngoài, hay đọc/ghi file).

Một Promise luôn nằm trong một trong ba trạng thái sau:

Pending (Đang chờ): Tác vụ đang được thực thi (ví dụ: câu lệnh SQL đang chạy xuống Database).

Fulfilled (Thành công): Tác vụ hoàn thành thành công và trả về dữ liệu kết quả (trong interface của bạn là trả về Product hoặc mảng Product[]).

Rejected (Thất bại): Tác vụ gặp lỗi (ví dụ: mất kết nối Database hoặc không tìm thấy sản phẩm), trả về một lỗi (Error).

Ví dụ thực tế trong Microservice:
Khi bạn gọi hàm create để lưu sản phẩm vào database, ứng dụng không thể trả về kết quả ngay lập tức vì phải đợi mạng hoặc ổ đĩa phản hồi. Do đó, hàm phải trả về một Promise<Product> để thông báo rằng: "Hãy cứ thực thi tiếp, khi nào database lưu xong, tôi sẽ gửi trả về cho bạn một đối tượng Product hoàn chỉnh".