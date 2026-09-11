import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";

const router = express.Router()

//endpoints
router.post("/product", 
    async(req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({});
})

export default router