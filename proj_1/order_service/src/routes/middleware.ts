import type { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils";

// ==========================================
// 1. KHỞI TẠO EXPRESS MIDDLEWARE XÁC THỰC REQUEST
// ==========================================
export const RequestAuthorizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Kiểm tra xem trong header của request gửi lên có đính kèm "authorization" hay không
        if (!req.headers.authorization) {
            // Nếu không có token, chặn request ngay lập tức và trả về mã lỗi 403 Forbidden
            return res
                .status(403)
                .json({ error: "Unauthorized due to authorization token missing!" });
        }

        // Gọi hàm ValidateUser (đã viết ở file trước) để gửi token sang Auth Service xác thực
        const userData = await ValidateUser(req.headers.authorization as string);

        // Nếu token hợp lệ, gắn thông tin người dùng (userData) vào đối tượng "req" của Express
        // (Giúp các controller phía sau có thể dùng ngay req.user mà không cần gọi lại Auth Service)
        req.user = userData;

        // Cho phép request đi tiếp tục đến Controller/Route xử lý tiếp theo trong chuỗi Express middleware
        next();
    } catch (error) {
        // Nếu quá trình xác thực thất bại (token sai, hết hạn, hoặc Auth Service lỗi), trả về mã 403 kèm lỗi
        return res.status(403).json({ error });
    }
};