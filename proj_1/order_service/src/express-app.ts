import express, { type NextFunction, type Request, type Response } from "express";
import orderRoutes from './routes/order.routes.js'
import cartRoutes from './routes/cart.routes.js'
import cors from 'cors'

const PORT = process.env.APP_PORT || 9000;

// Khởi tạo một ứng dụng Express chính
const app = express();
app.use(cors());
// Đăng ký middleware toàn cục giúp Express tự động phân tích (parse) cú pháp JSON từ các HTTP request body gửi lên
app.use(express.json());
app.use(orderRoutes);
app.use(cartRoutes);

// Đăng ký router catalog vào ứng dụng, tất cả các request đi vào gốc sẽ được điều hướng qua catalogRouter
app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "healthy" });
});





export default app;