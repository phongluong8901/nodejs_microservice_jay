import express, { type Request, type Response, type NextFunction } from 'express'
import * as service from '../service/cart.service'
import * as repository from '../repository/cart.repository.js'
import { ValidateRequest } from '../utils/validator'
import { CartRequestSchema, type CartRequestInput } from '../dto/cart.request.dto'
const router = express.Router()
const repo = repository.CartRepository

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
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
        return res.status(404).json({ error });
    }
})

router.get("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetCart(req.body, repo)
    return res.status(200).json(response)
})

router.put("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.UpdateCart(req.body, repo)
    return res.status(200).json(response)
})

router.delete("/cart/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.DeleteCart(req.body, repo)
    return res.status(200).json(response)
})

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetAllCart(repo)
    return res.status(200).json(response)
})

export default router;