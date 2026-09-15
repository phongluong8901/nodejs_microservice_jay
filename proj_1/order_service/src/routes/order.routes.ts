import express, { type NextFunction, type Request, type Response } from "express";
import { MessageBroker } from "../utils";

import { OrderEvent, OrderStatus } from "../types";
import { RequestAuthorizer } from "./middleware";
import * as service from "../service/order.service";
import { OrderRepository } from "../repository/order.repository";
import { CartRepository } from "../repository/cart.repository";
const repo = OrderRepository;
const cartRepo = CartRepository;
const router = express.Router();

router.post(
    "/orders",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }
        const response = await service.CreateOrder(user.id, repo, cartRepo);
        return res.status(200).json(response);
    }
);

router.get(
    "/orders",
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }
        const response = await service.GetOrders(user.id, repo);
        return res.status(200).json(response);
    }
);

router.get(
    "/orders/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }
        const response = await service.GetOrder(user.id, repo);
        return res.status(200).json(response);
    }
);

router.get(
    "/orders/:id",
    RequestAuthorizer, // Nhớ thêm middleware xác thực nếu cần
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user) {
                next(new Error("User not found"));
                return;
            }

            // Lấy và kiểm tra id an toàn
            const idParam = req.params.id;
            if (!idParam || typeof idParam !== "string") {
                return res.status(400).json({ error: "Invalid order ID" });
            }

            const response = await service.GetOrder(parseInt(idParam), repo);
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    "/orders/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParam = req.params.id;
            if (!idParam || typeof idParam !== "string") {
                return res.status(400).json({ error: "Invalid order ID" });
            }

            const orderId = parseInt(idParam);
            const status = req.body.status as OrderStatus;
            const response = await service.UpdateOrder(orderId, status, repo);
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    "/orders/:id",
    RequestAuthorizer,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user) {
                next(new Error("User not found"));
                return;
            }

            const idParam = req.params.id;
            if (!idParam || typeof idParam !== "string") {
                return res.status(400).json({ error: "Invalid order ID" });
            }

            const orderId = parseInt(idParam);
            const response = await service.DeleteOrder(orderId, repo);
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
);

export default router;