import { STATUS_CODES } from "./status-codes"; // Nhập các mã HTTP status từ file cấu hình ngoài

class BaseError extends Error { // Khai báo lớp lỗi cơ sở (Base Error) kế thừa từ lớp Error chuẩn của JavaScript
    public readonly name: string; // Khai báo thuộc tính tên lỗi (chỉ đọc)
    public readonly status: number; // Khai báo mã trạng thái HTTP (chỉ đọc)
    public readonly message: string; // Khai báo thông điệp lỗi (chỉ đọc)

    constructor(name: string, status: number, description: string) { // Hàm khởi tạo nhận vào tên lỗi, mã HTTP và mô tả
        super(description); // Gọi constructor của lớp cha (Error) truyền vào mô tả
        this.name = name; // Gán tên cho lỗi
        this.status = status; // Gán mã HTTP status code
        this.message = description; // Gán thông điệp chi tiết
        Object.setPrototypeOf(this, new.target.prototype); // Sửa lỗi nguyên mẫu (prototype chain) khi kế thừa từ built-in Error trong TypeScript/ES6
        Error.captureStackTrace(this); // Ẩn hàm constructor hiện tại ra khỏi vết ngăn xếp (stack trace) để log lỗi gọn gàng hơn
    }
}

// 500 Internal Error
export class APIError extends BaseError { // Lớp lỗi đại diện cho lỗi hệ thống nội bộ (Mã 500)
    constructor(description = "api error") { // Nhận vào mô tả, mặc định là "api error" nếu không truyền
        super(
            "api internal server error",
            STATUS_CODES.INTERNAL_ERROR,
            description
        ); // Truyền thông tin lên lớp cha BaseError với mã lỗi 500
    }
}

// 400 Validation Error
export class ValidationError extends BaseError { // Lớp lỗi đại diện cho dữ liệu đầu vào không hợp lệ (Mã 400)
    constructor(description = "bad request") { // Nhận vào mô tả, mặc định là "bad request"
        super("bad request", STATUS_CODES.BAD_REQUEST, description); // Truyền thông tin lên lớp cha với mã lỗi 400
    }
}

// 403 Authorize error
export class AuthorizeError extends BaseError { // Lớp lỗi đại diện cho việc không có quyền truy cập (Mã 403)
    constructor(description = "access denied") { // Nhận vào mô tả, mặc định là "access denied"
        super("access denied", STATUS_CODES.UN_AUTHORISED, description); // Truyền thông tin lên lớp cha với mã lỗi tương ứng
    }
}

// 404 Not Found
export class NotFoundError extends BaseError { // Lớp lỗi đại diện cho việc không tìm thấy tài nguyên (Mã 404)
    constructor(description = "not found") { // Nhận vào mô tả, mặc định là "not found"
        super(description, STATUS_CODES.NOT_FOUND, description); // Truyền thông tin lên lớp cha với mã lỗi 404
    }
}