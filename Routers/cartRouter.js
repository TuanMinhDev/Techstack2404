import express from "express";
import { addToCart, updateCartItem, removeCartItem, getCartItems } from "../Controllers/cartController.js";

const router = express.Router();

router.post("/cart", addToCart);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", removeCartItem);
router.get("/cart", getCartItems);

export default router;
