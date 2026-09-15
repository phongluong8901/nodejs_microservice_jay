import express from "express";
import catalogRouter from './api/catalog.routes.js'
import { httpLogger, HandleErrorWithLogger } from "./utils/index.js"

const PORT = process.env.PORT || 8000;

// Khởi tạo một ứng dụng Express chính
const app = express();
// Đăng ký middleware toàn cục giúp Express tự động phân tích (parse) cú pháp JSON từ các HTTP request body gửi lên
app.use(express.json());

// Đăng ký router catalog vào ứng dụng, tất cả các request đi vào gốc sẽ được điều hướng qua catalogRouter
app.use("/", catalogRouter);

app.use(HandleErrorWithLogger);

export default app;