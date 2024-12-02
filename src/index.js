import express from "express";
import user from "./user/userRouter.js";
import product from "./product/productRouter.js";
import cart from "./cart/cartRouter.js";
import bill from "./bill/billRouter.js";
const router = express.Router();

router.use("/user", user);
router.use("/product", product);
router.use("/cart", cart);
router.use("/bill", bill);
export default router;
