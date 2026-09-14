import type { ICatalogRepository } from "../interface/catalogRepository.interface.js";
import type { Product } from "../models/product.models.js";
import { ProductFactory } from "../utils/fixfuture/index.js";
import { db } from "../prisma/db.js";


// Khai báo lớp CatalogRepository thực thi (implement) các quy tắc từ interface ICatalogRepository
export class CatalogRepository implements ICatalogRepository {
    
    // Triển khai phương thức tạo sản phẩm mới theo hợp đồng
    async create(data: Product): Promise<Product> {
        const result = await db.orm.public.Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
        });
        return result as unknown as Product;
    }

    async update(data: Product): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    async delete(id: any): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    // Triển khai phương thức lấy toàn bộ danh sách sản phẩm
    async find(limit: number, offset: number): Promise<Product[]> {
        const products = ProductFactory.buildList(limit);
        return Promise.resolve(products);
    }
    async findOne(id: number): Promise<Product> {
        const product = ProductFactory.build();
        return Promise.resolve(product);
    }
    

}