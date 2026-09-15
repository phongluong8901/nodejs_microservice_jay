import expressApp from './expressApp.js'
import { logger } from './utils/index.js';

const PORT = process.env.PORT || 8000;

// Khai báo và xuất một hàm bất đồng bộ (async) để chịu trách nhiệm khởi chạy toàn bộ dịch vụ
export const StartServer = async () => {
    // Yêu cầu ứng dụng Express bắt đầu lắng nghe
    expressApp.listen(PORT, () => {
        logger.info(`App is listening to: ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
        logger.error(err);
        // Thoát khỏi tiến trình ứng dụng Node.js với mã lỗi (exit code 1) nhằm tránh để server chạy ở trạng thái không ổn định
        process.exit(1);
    });
}

// hàm khởi động server
StartServer().then(() => {
    logger.info("Server is up");
});