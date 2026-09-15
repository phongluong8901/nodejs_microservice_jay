export class Product {
  // Hàm khởi tạo được gọi khi tạo đối tượng mới (new Product)
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly id?: number // Thuộc tính mã ID tùy chọn (kiểu số, có thể có hoặc không)
  ) {}
}

// public readonly là sự kết hợp của hai từ khóa trong TypeScript để quản lý quyền truy cập và tính bất biến của thuộc tính trong một lớp (class):

// public: Cho phép thuộc tính có thể được truy cập và chỉnh sửa từ bất kỳ đâu (bên trong lớp, các lớp con, hoặc từ bên ngoài khi gọi đối tượng như product.name).

// readonly: Đảm bảo rằng giá trị của thuộc tính chỉ được gán một lần duy nhất khi khởi tạo đối tượng (qua constructor). Sau đó, bạn không thể gán lại giá trị mới cho nó ở bất kỳ đâu trong chương trình (ví dụ: product.price = 20 sẽ báo lỗi).
