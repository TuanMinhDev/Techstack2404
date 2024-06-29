import express from "express";
import { createNewProduct, getProduct, updateProduct, deleteProduct, getAllProducts } from "../Controllers/productController.js";

const router = express.Router();

router.post("/product", createNewProduct);
router.get("/product/:id", getProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);
router.get("/getproduct", getAllProducts); 
export default router;
