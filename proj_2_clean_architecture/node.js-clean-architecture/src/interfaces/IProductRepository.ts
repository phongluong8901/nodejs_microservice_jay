import { Product } from "../entities/Product";              // Nhập thực thể Product làm kiểu dữ liệu chuẩn cho các phương thức

export interface IProductRepository {                       // Khai báo và xuất interface IProductRepository (khuôn mẫu giao tiếp với database)
  create(data: Product): Promise<Product>;                  // Khai báo phương thức bất đồng bộ tạo sản phẩm, nhận vào dữ liệu kiểu Product và trả về Product đã tạo
  update(id: number, stock: number): Promise<Product>;      // Khai báo phương thức bất đồng bộ cập nhật tồn kho theo ID, trả về Product sau khi cập nhật
  find(limit: number, offset: number): Promise<Product[]>;  // Khai báo phương thức bất đồng bộ lấy danh sách sản phẩm phân trang, trả về một mảng chứa các Product
}                                                           // Kết thúc interface IProductRepository