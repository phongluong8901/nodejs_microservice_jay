import axios from "axios";
import { APIError, AuthorizeError, NotFoundError } from "../error";
import { logger } from "../logger";
import { type Product } from "../../dto/product.dto";
import type { User } from "../../dto/User.Model";

// ==========================================
// 1. CẤU HÌNH ĐỊA CHỈ URL CỦA CÁC MICROSERVICES
// ==========================================
const CATALOG_BASE_URL =
    process.env.CATALOG_BASE_URL || "http://localhost:8000"; // URL của Catalog Service (quản lý sản phẩm)

const AUTH_SERVICE_BASE_URL =
    process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9000"; // URL của Auth Service (xác thực người dùng)


// ==========================================
// 2. GỌI API LẤY CHI TIẾT MỘT SẢN PHẨM
// ==========================================
export const GetProductDetails = async (productId: number) => {
    try {
        // Gửi HTTP GET request sang Catalog Service để lấy thông tin sản phẩm theo ID
        const response = await axios.get(
            `${CATALOG_BASE_URL}/products/${productId}`
        );
        return response.data as Product; // Trả về dữ liệu và ép kiểu sang Product DTO
    } catch (error) {
        logger.error(error); // Ghi log lỗi nếu request thất bại
        throw new NotFoundError("product not found"); // Ném ra lỗi tùy chỉnh khi không tìm thấy sản phẩm
    }
};


// ==========================================
// 3. GỌI API KIỂM TRA TỒN KHO (NHIỀU SẢN PHẨM)
// ==========================================
export const GetStockDetails = async (ids: number[]) => {
    try {
        // Gửi HTTP POST request sang Catalog Service kèm danh sách ID sản phẩm để kiểm tra tồn kho
        const response = await axios.post(`${CATALOG_BASE_URL}/products/stock`, {
            ids,
        });
        return response.data as Product[]; // Trả về danh sách thông tin sản phẩm/tồn kho
    } catch (error) {
        logger.error(error); // Ghi log lỗi
        throw new NotFoundError("error on getting stock details"); // Ném ra lỗi tùy chỉnh
    }
};


// ==========================================
// 4. XÁC THỰC NGƯỜI DÙNG QUA AUTH SERVICE
// ==========================================
export const ValidateUser = async (token: string) => {
    try {
        // Gửi HTTP GET request sang Auth Service kèm token định danh trong header Authorization
        const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/validate`, {
            headers: {
                Authorization: token,
            },
        });

        // Nếu mã trạng thái trả về khác 200 (không thành công) thì coi như không có quyền
        if (response.status !== 200) {
            throw new AuthorizeError("user not authorised");
        }

        return response.data as User; // Trả về thông tin user nếu token hợp lệ
    } catch (error) {
        // Bắt mọi lỗi xảy ra (kể cả lỗi mạng hoặc token sai) và ném ra lỗi phân quyền
        throw new AuthorizeError("user not authorised");
    }
};