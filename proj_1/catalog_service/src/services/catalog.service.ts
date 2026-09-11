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
    createProduct(input: any) {

    }

    updateProduct(input: any) {

    }

    getProducts(limit: number, offset: number) {

    }

    getProduct(id: number) {
        
    }

    deleteProduct(id: number) {

    }
}