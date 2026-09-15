import express, { type NextFunction, type Request, type Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { type CartRequestInput, CartRequestSchema } from "../dto/cart.request.dto";

const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // jwt
    const isValidUser = true;
    if (!isValidUser) {
        return res.status(403).json({ error: "authorization error" });
    }

    next();
};

router.post(
    "/cart",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const error = ValidateRequest<CartRequestInput>(
                req.body,
                CartRequestSchema
            );

            if (error) {
                return res.status(404).json({ error });
            }

            const response = await service.CreateCart(
                req.body as CartRequestInput,
                repo
            );
            return res.status(200).json(response);
        } catch (error) {
            console.error("CHI TIẾT LỖI:", (error as Error).message || error);
            return res.status(500).json({
                message: "Đã xảy ra lỗi",
                detail: (error as Error).message
            });
        }
    }
);

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
    // comes from our auth user parsed from JWT
    const response = await service.GetCart(req.body.customerId, repo);
    return res.status(200).json(response);
});

router.patch(
    "/cart/:lineItemId",
    async (req: Request, res: Response, next: NextFunction) => {
        const lineItemId = req.params.lineItemId;
        if (!lineItemId) {
            return res.status(400).json({ error: "Line item ID is required" });
        }
        const response = await service.EditCart(
            {
                id: +lineItemId,
                qty: req.body.qty,
            },
            repo
        );
        return res.status(200).json(response);
    }
);

router.delete(
    "/cart/:lineItemId",
    async (req: Request, res: Response, next: NextFunction) => {
        const lineItemId = req.params.lineItemId;
        if (!lineItemId) {
            return res.status(400).json({ error: "Line item ID is required" });
        }
        console.log(lineItemId);
        const response = await service.DeleteCart(+lineItemId, repo);
        return res.status(200).json(response);
    }
);

export default router;