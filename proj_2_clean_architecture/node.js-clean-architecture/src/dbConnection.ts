import { Pool } from "pg";                          // Nhập lớp Pool từ thư viện pg để quản lý kết nối PostgreSQL
import dotenv from "dotenv";                         // Nhập thư viện dotenv để đọc các biến môi trường từ file .env

dotenv.config();                                     // Nạp cấu hình từ file .env vào process.env

let client: Pool;                                    // Khai báo biến client lưu trữ instance kết nối (áp dụng Singleton pattern)

export const pgClient = (): Pool => {                // Khởi tạo và xuất hàm pgClient trả về đối tượng Pool
  if (!client) {                                     // Kiểm tra nếu client chưa được khởi tạo (tránh tạo nhiều kết nối thừa)
    client = new Pool({                              // Tạo một connection pool mới kết nối tới cơ sở dữ liệu PostgreSQL
      host: process.env.DB_HOST,                     // Lấy địa chỉ host từ biến môi trường
      port: parseInt(`${process.env.DB_PORT}`),      // Lấy cổng kết nối và chuyển đổi sang kiểu số nguyên (number)
      user: process.env.DB_USER,                     // Lấy tên tài khoản đăng nhập cơ sở dữ liệu
      password: process.env.DB_PASSWORD,             // Lấy mật khẩu đăng nhập cơ sở dữ liệu
      database: process.env.DB_NAME,                 // Lấy tên cơ sở dữ liệu cần kết nối
    });
  }
  return client;                                     // Trả về instance kết nối hiện tại (tạo mới nếu chưa có, dùng lại nếu đã có)
};