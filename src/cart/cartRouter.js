import express from "express";
import { CreateProductCart, deleteUserCart, DeleteProductCart, GetProductCart, PutQuantityProductCart } from "./cartControllers.js";
import { authenticateToken } from "../user/userMiddleware.js";

const router = express.Router();
router.post("/",authenticateToken, CreateProductCart);
router.get("/",authenticateToken,  GetProductCart);
router.delete("/:id",authenticateToken, DeleteProductCart);
router.put("/:id",authenticateToken, PutQuantityProductCart);
router.delete("/",authenticateToken, deleteUserCart);
export default router;
