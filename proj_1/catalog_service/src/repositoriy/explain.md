Tệp Mock (MockCatalogRepository) dùng để giả lập dữ liệu và hành vi của tầng cơ sở dữ liệu (Database) hoặc các dịch vụ bên ngoài mà không cần kết nối thực tế.

Phát triển độc lập (Independent Development): Cho phép bạn xây dựng và kiểm thử tầng Service, Controller ngay cả khi cơ sở dữ liệu thật (như PostgreSQL, MongoDB) chưa được cài đặt hoặc thiết lập xong.

Chạy thử và debug nhanh (Fast Prototyping): Trả về dữ liệu mẫu (hardcoded) ngay lập tức trên RAM mà không mất thời gian cấu hình kết nối mạng, Docker container hay viết câu lệnh SQL phức tạp.

Viết Unit Test hiệu quả: Giúp cô lập các bài kiểm thử tự động, đảm bảo kết quả test luôn ổn định và không bị ảnh hưởng bởi việc dữ liệu trong database thật bị thay đổi hay xóa.

Linh hoạt thay thế (Dependency Injection): Nhờ tuân thủ interface ICatalogRepository, bạn có thể dễ dàng chuyển đổi giữa CatalogRepository (dùng database thật ở môi trường Production) và MockCatalogRepository (dùng dữ liệu giả khi chạy Test hoặc Local Dev) mà không phải sửa đổi code ở các tầng trên.