import express from "express";
import { CreateBill, DeleteBill, GetBill } from "./billControllers.js";
import { authenticateToken } from "../user/userMiddleware.js";

const router = express.Router();
router.post('/',authenticateToken, CreateBill);
router.get('/',authenticateToken, GetBill);
router.delete('/',authenticateToken, DeleteBill);
export default router;