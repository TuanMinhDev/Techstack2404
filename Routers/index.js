import express from "express";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js"

const router = express.Router();

router.use("/test", testRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);



export default router;
