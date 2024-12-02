import express from "express";
import { CreateProductCart, DeleteProductCart, GetProductCart, PutQuantityProductCart } from "./cartControllers.js";
import { authenticateToken } from "../user/userMiddleware.js";

const router = express.Router();
router.post("/",authenticateToken, CreateProductCart);
router.get("/",authenticateToken,  GetProductCart);
router.delete("/:id",authenticateToken, DeleteProductCart);
router.put("/:id",authenticateToken, PutQuantityProductCart)
export default router;
