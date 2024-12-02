import express from "express";
import { verifyToken, verifyTokenIsAdmin } from "../user/userMiddleware.js";
import {
  CreateProduct,
  GetAllProduct,
  GetProductById,
  DeleteProduct,
  UpdateProduct,
} from "./productControllers.js";

const router = express.Router();
router.post("/create", CreateProduct);
router.get("/", GetAllProduct);
router.get("/:id", GetProductById);
router.delete("/:id",  DeleteProduct);
router.put("/:id",  UpdateProduct);
export default router;
