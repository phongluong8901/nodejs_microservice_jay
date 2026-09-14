import type { Product } from "../models/product.models.js";

// Khai báo và xuất interface định nghĩa các hợp đồng (contract) thao tác dữ liệu catalog
export interface ICatalogRepository {
    create(data: Product): Promise<Product>; // Phương thức tạo sản phẩm mới, nhận vào object Product và trả về Promise chứa Product đã tạo
    update(data: Product): Promise<Product>;
    delete(id: any): Promise<Product>;
    find(limit: number, offset: number): Promise<Product[]>  // Phương thức lấy danh sách toàn bộ sản phẩm, trả về Promise chứa mảng Product
    findOne(id: number): Promise<Product>   // Phương thức tìm một sản phẩm theo ID kiểu số, trả về Promise chứa Product tương ứng
}

// Promise là một đối tượng trong JavaScript/TypeScript đại diện cho kết quả của một tác vụ bất đồng bộ (asynchronous) — những công việc mất một khoảng thời gian để hoàn thành chứ không có kết quả ngay lập tức (như gọi truy vấn cơ sở dữ liệu, gọi API bên ngoài, hay đọc/ghi file).
