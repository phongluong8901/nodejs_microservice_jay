import express, { type Request, type Response, type NextFunction } from 'express'
import * as service from '../service/order.service'

export const router = express.Router()

router.post("/order", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.CreateOrder(req.body)
    return res.status(200).json(response)
})

router.get("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetOrder(req.body)
    return res.status(200).json(response)
})

router.put("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.UpdateOrder(req.body)
    return res.status(200).json(response)
})

router.delete("/order/:id", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.DeleteOrder(req.body)
    return res.status(200).json(response)
})

router.get("/order", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.GetAllOrder()
    return res.status(200).json(response)
})

export default router;