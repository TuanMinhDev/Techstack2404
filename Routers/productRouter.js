import express from "express";
import { createNewProduct, getProduct, updateProduct, deleteProduct, getAllProducts } from "../Controllers/productController.js";

const router = express.Router();

router.post("/products", createNewProduct);

router.get("/products/:id", getProduct);


router.put("/products/:id", updateProduct);


router.delete("/products/:id", deleteProduct);


router.get("/products", getAllProducts);

export default router;
