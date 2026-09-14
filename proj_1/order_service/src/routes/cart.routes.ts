import express, { type Request, type Response, type NextFunction } from 'express'
import * as service from '../service/cart.service'
import * as repository from '../repository/cart.repository.js'
const router = express.Router()
const repo = repository.CartRepository

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.CreateCart(req.body, repo)
    return res.status(200).json(response)
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