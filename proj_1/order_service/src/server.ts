import expressApp from './express-app.js'

const PORT = process.env.APP_PORT || 9000;

// Khai báo và xuất một hàm bất đồng bộ (async) để chịu trách nhiệm khởi chạy toàn bộ dịch vụ
export const StartServer = async () => {
    // Yêu cầu ứng dụng Express bắt đầu lắng nghe
    expressApp.listen(PORT, () => {
        console.log(`App is listening to: ${PORT}`);
    });

    process.on("uncaughtException", async (err) => {
        console.log(err);
        // Thoát khỏi tiến trình ứng dụng Node.js với mã lỗi (exit code 1) nhằm tránh để server chạy ở trạng thái không ổn định
        process.exit(1);
    });
}

// hàm khởi động server
StartServer().then(() => {
    console.log("Server is up");
});