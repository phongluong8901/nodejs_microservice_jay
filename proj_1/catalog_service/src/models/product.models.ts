
// Khai báo và xuất class Product ra ngoài để các module khác có thể import sử dụng
export class Product {

    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly stock: number, // Thuộc tính số lượng tồn kho: kiểu số (number), chỉ đọc
        public readonly id?: number, // Thuộc tính ID định danh: tùy chọn (dấu ?), thường dùng khi tạo mới sản phẩm chưa có ID từ database

    ) {
        
    }
}

// public: Cho phép thuộc tính này có thể được truy cập và đọc/ghi từ bất cứ đâu — bên trong lớp, các lớp con kế thừa, và từ bên ngoài (như từ các file Service, Controller, hoặc khi gọi đối tượng ở nơi khác).

// readonly: Khóa cứng giá trị của thuộc tính, ngăn chặn việc gán lại giá trị mới sau khi đối tượng đã được khởi tạo xong (đảm bảo tính bất biến - immutability).