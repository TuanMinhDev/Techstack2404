import express from "express";
import user from "./user/userRouter.js";
import product from "./product/productRouter.js";
import cart from "./cart/cartRouter.js";
import checkout from "./checkout/checkoutRouter.js";
// import order from "./order/orderRouter.js";
const router = express.Router();

router.use("/user", user);
router.use("/product", product);
router.use("/cart", cart);
router.use("/checkout", checkout);
// router.use("/order", order);
export default router;
