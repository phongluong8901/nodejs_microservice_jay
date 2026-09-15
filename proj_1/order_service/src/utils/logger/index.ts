import { pinoHttp } from "pino-http"; // Nhập middleware pino-http để tự động log các HTTP request/response
import pino from "pino"; // Nhập thư viện pino chính để tạo logger

export const logger = pino({
    level: "info", // Đặt mức log tối thiểu là "info" (sẽ ghi nhận info, warn, error, fatal)
    base: {
        serviceName: "order-service", // Tự động gắn tên service vào mọi dòng log (hữu ích cho microservices)
    },
    serializers: pino.stdSerializers, // Sử dụng các serializer chuẩn của pino để định dạng an toàn các đối tượng như err, req, res
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`, // Tùy chỉnh định dạng thời gian log theo chuẩn ISO string
    transport: {
        target: "pino-pretty", // Dùng pino-pretty để hiển thị log đẹp mắt, dễ đọc khi dev (thực tế production có thể đổi sang sentry hoặc json thuần)
        level: "error", // Chỉ định mức log áp dụng cho transport này là "error"
    },
});

export const httpLogger = pinoHttp({
    level: "error", // Cấu hình mức độ log HTTP request ở mức lỗi
    logger, // Kế thừa instance logger đã được cấu hình ở trên để ghi log HTTP
});