import express from "express";
import { authenticateToken } from "../user/userMiddleware.js";
import { CreateCheckout, GetCheckout,DeleteCheckout } from "./checkoutControllers.js";

const router = express.Router();

router.post ("/",authenticateToken, CreateCheckout);
router.get("/", authenticateToken, GetCheckout);
router.delete("/", authenticateToken, DeleteCheckout);
export default router;