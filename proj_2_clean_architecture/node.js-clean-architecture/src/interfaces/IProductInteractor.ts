export interface IProductInteractor {                  // Khai báo và xuất interface IProductInteractor (khuôn mẫu cho tầng Interactor/Use Case xử lý logic nghiệp vụ sản phẩm)
  createProduct(input: any): Promise<any>;             // Khai báo phương thức bất đồng bộ tạo sản phẩm mới, nhận dữ liệu đầu vào tùy ý và trả về Promise bất định kiểu
  updateStock(id: number, stock: number): Promise<any>; // Khai báo phương thức bất đồng bộ cập nhật tồn kho theo ID và số lượng mới, trả về Promise bất định kiểu
  getProducts(limit: number, offset: number): Promise<any>; // Khai báo phương thức bất đồng bộ lấy danh sách sản phẩm có phân trang (giới hạn và vị trí bắt đầu), trả về Promise bất định kiểu
}                                                      // Kết thúc interface IProductInteractor