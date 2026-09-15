import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { CatalogService } from "../services/catalog.service.js";
import { CatalogRepository } from "../repositoriy/catalog.repository.js";
import { RequestValidator } from "../utils/requestValidator.js";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto.js";


const router = express.Router()

export const catalogService = new CatalogService(new CatalogRepository())


//endpoints
router.post("/products",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        CreateProductRequest,
        req.body
      );
      if (errors) return res.status(400).json(errors);

      const data = await catalogService.createProduct(input);
      return res.status(201).json(data);
    } catch (error) {
      const err = error as Error
      return res.status(500).json(err.message)
    }
  })

router.patch("/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { errors, input } = await RequestValidator(
        UpdateProductRequest,
        req.body
      );

      const id = parseInt(String(req.params.id), 10) || 0

      if (errors) return res.status(400).json(errors);
      const data = await catalogService.updateProduct({ id, ...input });
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
)

router.get("/products",
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
      const data = await catalogService.getProducts(limit, offset);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
)

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(String(req.params.id)) || 0;
    try {
      const data = await catalogService.getProduct(id);
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json(err.message);
    }
  }
)

router.get(
  "/products/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(String(req.params.id)) || 0;
    console.log("Product với ID:", id); // Kiểm tra xem ID có nhận đúng là 1 không
    try {
      const data = await catalogService.getProduct(id);
      console.log("Kết quả trả về từ DB:", data); // Kiểm tra xem DB có tìm thấy không
      return res.status(200).json(data);
    } catch (error) {
      const err = error as Error;
      console.log("Lỗi:", err.message);
      return res.status(500).json(err.message);
    }
  }
);


export default router;