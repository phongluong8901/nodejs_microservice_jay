import { type Request, type Response, type NextFunction } from 'express'; // Nhập các kiểu dữ liệu TypeScript từ Express dành cho middleware
import {
    AuthorizeError,
    NotFoundError,
    ValidationError,
} from './errors'; // Nhập các lớp lỗi tùy chỉnh đã được định nghĩa từ file errors
import { logger } from '../logger'; // Nhập module logger để ghi nhật ký lỗi

export const HandleErrorWithLogger = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => { // Định nghĩa hàm middleware xử lý lỗi tổng quát cho ứng dụng Express
    let reportError = true; // Biến cờ đánh dấu xem có phải lỗi hệ thống nghiêm trọng cần báo động hay không (mặc định là true)
    let status = 500; // Đặt mã trạng thái HTTP mặc định là 500 (Internal Server Error)
    let data = error.message; // Đặt nội dung trả về mặc định là thông điệp của lỗi

    // Bỏ qua việc báo động đối với các lỗi thông thường / lỗi do client gây ra
    [NotFoundError, ValidationError, AuthorizeError].forEach(
        (typeOfError) => {
            if (error instanceof typeOfError) { // Kiểm tra xem lỗi hiện tại có thuộc nhóm lỗi client hay không
                reportError = false; // Đánh dấu không phải lỗi hệ thống nghiêm trọng
                status = error.status; // Lấy mã trạng thái tương ứng từ lỗi (ví dụ: 400, 403, 404)
                data = error.message; // Lấy thông điệp chi tiết của lỗi đó
            }
        },
    );

    if (reportError) {
        // Các công cụ theo dõi báo cáo lỗi (ví dụ: Cloudwatch, Sentry, v.v.)
        logger.error(error); // Nếu là lỗi hệ thống (500), ghi log ở mức độ lỗi nghiêm trọng (error)
    } else {
        logger.warn(error); // Nếu là lỗi do người dùng (4xx), chỉ ghi log ở mức cảnh báo (warn) để đỡ loãng hệ thống
    }

    return res.status(status).json(data); // Trả về mã trạng thái HTTP kèm theo nội dung lỗi dưới dạng JSON cho client
};

export const HandleUnCaughtException = async (
    error: Error,
) => {
    // Công cụ giám sát và báo cáo lỗi
    logger.error(error); // Ghi log lỗi cực kỳ nghiêm trọng khi có ngoại lệ chưa được bắt (uncaught exception)
    // Khôi phục trạng thái bằng cách tắt ứng dụng
    process.exit(1); // Thoát tiến trình ngay lập tức với mã 1 để các trình quản lý (Docker, PM2, K8s) khởi động lại service an toàn
};