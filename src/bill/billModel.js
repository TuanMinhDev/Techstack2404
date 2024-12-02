import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carts: [
    {
      cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  product: {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
}, { timestamps: true });


BillSchema.pre("save", function (next) {
  if ((!this.carts || this.carts.length === 0) && !this.product.productId) {
    return next(new Error("Hóa đơn phải có ít nhất một trong 'carts' hoặc 'product'."));
  }
  if (this.carts.length > 0 && this.product.productId) {
    return next(new Error("Hóa đơn không thể chứa cả 'carts' và 'product' cùng lúc."));
  }
  next();
});

export default mongoose.model("Bill", BillSchema);
