import { Pool } from "pg";                          // Nhập lớp Pool từ thư viện pg để quản lý kết nối PostgreSQL
import { Product } from "../entities/Product";       // Nhập thực thể Product
import { IProductRepository } from "../interfaces/IProductRepository"; // Nhập interface của repository
import { pgClient } from "../dbConnection";          // Nhập hàm kết nối cơ sở dữ liệu
import { injectable } from "inversify";              // Nhập decorator từ Inversify để hỗ trợ Dependency Injection

@injectable()                                        // Đánh dấu lớp này có thể được quản lý và tiêm phụ thuộc bởi Inversify
export class ProductRepository implements IProductRepository { // Khai báo lớp ProductRepository triển khai interface IProductRepository
    private client: Pool;                            // Khai báo biến riêng tư client kiểu Pool để tương tác với DB

    constructor() {                                  // Hàm khởi tạo
        this.client = pgClient();                    // Lấy instance kết nối cơ sở dữ liệu gán vào client
    }

    async create({ name, description, price, stock }: Product): Promise<Product> { // Phương thức thêm sản phẩm mới (dùng destructuring tham số)
        const product = await this.client.query(     // Thực thi câu lệnh SQL bất đồng bộ
        `INSERT INTO products (name,description,price,stock) VALUES ($1,$2,$3,$4) RETURNING *`, // Câu lệnh SQL thêm mới và trả về bản ghi vừa tạo
        [name, description, price, stock]            // Mảng tham số truyền vào giúp chống SQL Injection
        );
        return product.rows[0];                      // Trả về dòng dữ liệu đầu tiên (sản phẩm vừa thêm)
    }

    async update(id: number, stock: number): Promise<Product> { // Phương thức cập nhật số lượng tồn kho theo ID
        const product = await this.client.query(     // Thực thi câu lệnh SQL cập nhật
        `UPDATE products SET stock=$1 WHERE id=$2 RETURNING *`, // Câu lệnh SQL update và trả về bản ghi sau khi sửa
        [stock, id]                                  // Mảng tham số truyền vào
        );
        return product.rows[0];                      // Trả về bản ghi sản phẩm đã cập nhật
    }

    async find(limit: number, offset: number): Promise<Product[]> { // Phương thức lấy danh sách sản phẩm có phân trang
        const products = await this.client.query(    // Thực thi câu lệnh SQL truy vấn danh sách
        `SELECT * FROM products OFFSET $1 LIMIT $2`, // Câu lệnh SQL lấy dữ liệu với OFFSET (bỏ qua) và LIMIT (giới hạn)
        [offset, limit]                              // Mảng tham số truyền vào tương ứng với $1 và $2
        );
        return products.rows;                        // Trả về danh sách các sản phẩm lấy được từ database
    }
}