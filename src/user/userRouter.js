import express from "express";
import { DeleteUser, GetByIdUser, Login, GetAllUser, Register, PutUser } from "./userControllers.js";
import { verifyTokenIsAdmin, verifyTokenIsUser } from "./userMiddleware.js";


const router = express.Router();
router.post('/login',Login);
router.post('/register',Register);
router.get('/:id',verifyTokenIsUser, GetByIdUser);
router.get('/', verifyTokenIsAdmin, GetAllUser);
router.delete('/:id',verifyTokenIsAdmin, DeleteUser);
router.put('/:id',verifyTokenIsUser, PutUser);
export default router;
