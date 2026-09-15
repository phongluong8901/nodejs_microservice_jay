import express, { type NextFunction, type Request, type Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { type CartRequestInput, CartRequestSchema } from "../dto/cart.request.dto";
import { RequestAuthorizer } from "./middleware";

const router = express.Router();
const repo = repository.CartRepository;

// ==========================================
// 1. API: TẠO HOẶC THÊM SẢN PHẨM VÀO GIỎ HÀNG (POST /cart)
// ==========================================
router.post(
    "/cart",
    RequestAuthorizer, // Middleware: Bắt buộc phải có Token hợp lệ mới được đi tiếp
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Lấy thông tin user đã được gắn sẵn vào request từ middleware RequestAuthorizer
            const user = req.user;
            if (!user) {
                next(new Error("User not found"));
                return;
            }

            // Kiểm tra tính hợp lệ của dữ liệu đầu vào (body) dựa trên Schema quy định
            const error = ValidateRequest<CartRequestInput>(
                req.body,
                CartRequestSchema
            );

            if (error) {
                return res.status(404).json({ error });
            }

            const input: CartRequestInput = req.body;

            // Gọi service để xử lý nghiệp vụ tạo/thêm giỏ hàng, kết hợp customerId lấy từ Token
            const response = await service.CreateCart(
                {
                    ...input,
                    customerId: user.id,
                },
                repo
            );
            return res.status(200).json(response);
        } catch (error) {
            next(error); // Chuyển lỗi cho middleware xử lý lỗi chung của Express
        }
    }
);

// ==========================================
// 2. API: LẤY THÔNG TIN GIỎ HÀNG (GET /cart)
// ==========================================
router.get(
    "/cart",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user) {
                next(new Error("User not found"));
                return;
            }
            // Gọi service lấy giỏ hàng dựa theo ID của user đăng nhập
            const response = await service.GetCart(user.id, repo);
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

// ==========================================
// 3. API: CẬP NHẬT SỐ LƯỢNG SẢN PHẨM TRONG GIỎ (PATCH /cart/:lineItemId)
// ==========================================
router.patch(
    "/cart/:lineItemId",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user) {
                next(new Error("User not found"));
                return;
            }

            // Lấy tham số lineItemId từ đường dẫn URL
            const lineItemId = req.params.lineItemId;
            if (!lineItemId) {
                return res.status(400).json({ error: "lineItemId is required" });
            }

            // Gọi service chỉnh sửa giỏ hàng (dùng dấu `+` để ép kiểu lineItemId từ string sang number)
            const response = await service.EditCart(
                {
                    id: +lineItemId,
                    qty: req.body.qty,
                    customerId: user.id,
                },
                repo
            );
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

// ==========================================
// 4. API: XÓA SẢN PHẨM KHỎI GIỎ HÀNG (DELETE /cart/:lineItemId)
// ==========================================
router.delete(
    "/cart/:lineItemId",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user) {
                next(new Error("User not found"));
                return;
            }

            const lineItemId = req.params.lineItemId;
            if (!lineItemId) {
                return res.status(400).json({ error: "lineItemId is required" });
            }

            // Gọi service xóa sản phẩm khỏi giỏ hàng theo ID dòng sản phẩm và ID khách hàng
            const response = await service.DeleteCart(
                { customerId: user.id, id: +lineItemId },
                repo
            );
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;