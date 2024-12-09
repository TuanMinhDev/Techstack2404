import express from "express";
import { verifyTokenIsAdmin } from "../user/userMiddleware.js";
import {
  CreateProduct,
  GetAllProduct,
  GetProductById,
  DeleteProduct,
  UpdateProduct,
} from "./productControllers.js";

const router = express.Router();
router.post("/create",verifyTokenIsAdmin, CreateProduct);
router.get("/", GetAllProduct);
router.get("/:id", GetProductById);
router.delete("/:id",verifyTokenIsAdmin,  DeleteProduct);
router.put("/:id",verifyTokenIsAdmin,  UpdateProduct);
export default router;
