import type { ICatalogRepository } from "../interface/catalogRepository.interface.js";
import type { Product } from "../models/product.models.js";

// Khai báo lớp CatalogRepository thực thi (implement) các quy tắc từ interface ICatalogRepository
export class CatalogRepository implements ICatalogRepository {
    // Triển khai phương thức tạo sản phẩm mới theo hợp đồng
    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    // Triển khai phương thức lấy toàn bộ danh sách sản phẩm
    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    

}