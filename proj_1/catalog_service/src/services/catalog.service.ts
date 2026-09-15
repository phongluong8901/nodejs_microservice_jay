import type { ICatalogRepository } from "../interface/catalogRepository.interface.js";

// Khai báo và xuất lớp CatalogService chứa toàn bộ logic nghiệp vụ (business logic) của catalog
export class CatalogService {
    // Khai báo thuộc tính riêng tư (private) để lưu trữ tầng repository tương tác dữ liệu
    private _repository: ICatalogRepository

    // Hàm khởi tạo áp dụng mẫu Dependency Injection (tiêm phụ thuộc)
    constructor(repository: ICatalogRepository) {
        this._repository = repository; // Gán đối tượng repository được truyền vào vào biến nội bộ của lớp
    }

    // Phương thức nghiệp vụ xử lý logic tạo mới sản phẩm từ dữ liệu đầu vào (input)
    async createProduct(input: any) {
        const data = await this._repository.create(input);
        if (!data.id) {
            throw new Error("unable to create product");
        }
        return data;
    }

    async updateProduct(input: any) {
        const data = await this._repository.update(input);
        //emit event to update record in elastic search
        if (!data.id) {
            throw new Error("unable to update product");
        }
        return data;
    }

    //instead of this we will get product from Elastic search
    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset)
        return products
    }

    async getProduct(id: number) {
        const product = await this._repository.findOne(id);
        return product;
    }

    async deleteProduct(id: number) {
        const response = await this._repository.delete(id);
        // delete record from Elastic search
        return response;
    }


    async getProductStock(ids: number[]) {
        const products = await this._repository.findStock(ids);
        if (!products) {
            throw new Error("unable to find product stock details");
        }
        return products;
    }
}