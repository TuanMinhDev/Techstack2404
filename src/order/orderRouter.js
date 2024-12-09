import express from "express";
import { CreateOrder, DeleteOrder, GetOrder, GetAllOrder } from "./orderControllers.js";
import { authenticateToken, verifyTokenIsAdmin } from "../user/userMiddleware.js";

const router = express.Router();
router.post('/',authenticateToken, CreateOrder);
router.get('/user',authenticateToken, GetOrder);
router.delete('/:id',authenticateToken, DeleteOrder);
router.get('/',verifyTokenIsAdmin, GetAllOrder);
export default router;