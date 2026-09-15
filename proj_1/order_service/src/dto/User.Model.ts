// Mở rộng global namespace của TypeScript để bổ sung thuộc tính mới cho Express
declare global {
    namespace Express {
        // Mở rộng giao diện Request mặc định của Express
        interface Request {
            // Thêm tùy chọn thuộc tính "user" có kiểu dữ liệu là "User" (được định nghĩa bên dưới)
            // Dùng dấu "?" vì không phải request nào cũng có user (ví dụ như API đăng nhập/đăng ký công khai)
            user?: User;
        }
    }
}

// Định nghĩa cấu trúc dữ liệu của User (thường được giải mã từ JWT Token)
export interface User {
    id: number;      // ID định danh người dùng
    email: string;   // Địa chỉ email của người dùng
    iat: number;     // Thời điểm token được phát hành (Issued At - chuẩn JWT)
    exp: number;     // Thời điểm token hết hạn (Expiration Time - chuẩn JWT)
}