import { NextFunction, Request, Response } from "express"; // Nhập các kiểu dữ liệu từ Express (NextFunction, Request, Response) để xử lý HTTP request/response
import { IProductInteractor } from "../interfaces/IProductInteractor"; // Nhập interface của tầng Interactor (chứa logic nghiệp vụ)
import { inject, injectable } from "inversify";          // Nhập decorator inject và injectable từ Inversify để thực hiện Dependency Injection
import { INTERFACE_TYPE } from "../utils";                  // Nhập các token Symbol dùng để định danh khi tiêm phụ thuộc

@injectable()                                            // Đánh dấu lớp ProductController có thể được quản lý và tiêm phụ thuộc bởi Inversify container
export class ProductController {                         // Khai báo và xuất lớp ProductController (tầng nhận HTTP request từ client)
  private interactor: IProductInteractor;                // Khai báo biến riêng tư lưu trữ tầng interactor để xử lý logic

  constructor(                                           // Hàm khởi tạo nhận interactor được tiêm vào tự động
    @inject(INTERFACE_TYPE.ProductInteractor) interactor: IProductInteractor // Tiêm interactor dựa vào Symbol token định nghĩa sẵn
  ) {
    this.interactor = interactor;                        // Gán interactor vừa tiêm vào biến nội bộ của lớp
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) { // Controller xử lý API tạo sản phẩm mới (HTTP POST)
    try {
      const body = req.body;                             // Lấy dữ liệu thân request gửi lên từ client
      // validate logic                                  // Ghi chú vị trí thực hiện kiểm tra tính hợp lệ dữ liệu (validation)
      const data = await this.interactor.createProduct(body); // Gọi interactor để thực hiện nghiệp vụ tạo sản phẩm

      return res.status(200).json(data);                 // Trả về phản hồi thành công (mã 200) kèm dữ liệu sản phẩm dưới dạng JSON
    } catch (error) {
      next(error);                                       // Bắt lỗi và chuyển tiếp sang middleware xử lý lỗi chung của Express
    }
  }
  
  async onGetProducts(req: Request, res: Response, next: NextFunction) { // Controller xử lý API lấy danh sách sản phẩm phân trang (HTTP GET)
    try {
      const offset = parseInt(`${req.query.offset}`) || 0; // Lấy tham số offset từ query string (vị trí bắt đầu), mặc định là 0 nếu không truyền
      const limit = parseInt(`${req.query.limit}`) || 10;  // Lấy tham số limit từ query string (số lượng bản ghi), mặc định là 10

      const data = await this.interactor.getProducts(limit, offset); // Gọi interactor lấy danh sách sản phẩm theo giới hạn và vị trí

      return res.status(200).json(data);                 // Trả về mảng danh sách sản phẩm kèm mã 200 JSON
    } catch (error) {
      next(error);                                       // Chuyển lỗi sang middleware xử lý lỗi
    }
  }
  
  async onUpdateStock(req: Request, res: Response, next: NextFunction) { // Controller xử lý API cập nhật số lượng tồn kho (HTTP PUT/PATCH)
    try {
      const id = parseInt(req.params.id);                // Lấy ID sản phẩm từ tham số trên đường dẫn URL (route parameter)
      const stock = req.body.stock;                      // Lấy giá trị tồn kho mới từ phần thân request

      const data = await this.interactor.updateStock(id, stock); // Gọi interactor thực hiện cập nhật tồn kho

      return res.status(200).json(data);                 // Trả về dữ liệu sản phẩm sau khi cập nhật kèm mã 200 JSON
    } catch (error) {
      next(error);                                       // Chuyển lỗi sang middleware xử lý lỗi
    }
  }
}