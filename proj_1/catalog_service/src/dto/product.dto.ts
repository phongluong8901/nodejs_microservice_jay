import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"; // Import các hàm decorator dùng để validate dữ liệu từ thư viện class-validator

export class CreateProductRequest {                                     // Khai báo và xuất (export) class DTO dùng để kiểm tra dữ liệu tạo sản phẩm
  @IsString()                                                         // Ràng buộc: trường 'name' bắt buộc phải là kiểu chuỗi (string)
  @IsNotEmpty()                                                       // Ràng buộc: trường 'name' không được để trống (null, undefined, chuỗi rỗng)
  name: string;                                                       // Khai báo thuộc tính name kiểu string

  @IsString()                                                         // Ràng buộc: trường 'description' bắt buộc phải là kiểu chuỗi (string)
  description: string;                                                // Khai báo thuộc tính description kiểu string

  @IsNumber()                                                         // Ràng buộc: trường 'price' bắt buộc phải là kiểu số (number)
  @Min(1)                                                             // Ràng buộc: giá trị tối thiểu của 'price' phải từ 1 trở lên
  price: number;                                                      // Khai báo thuộc tính price kiểu number

  @IsNumber()                                                         // Ràng buộc: trường 'stock' bắt buộc phải là kiểu số (number)
  stock: number;                                                      // Khai báo thuộc tính stock kiểu number
}                                                                       // Kết thúc class

export class UpdateProductRequest {
  name?: string;

  description?: string;

  price?: number;

  @IsNotEmpty()
  stock?: number;
}