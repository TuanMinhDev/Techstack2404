import mongoose from "mongoose";
import checkoutModel from "./checkoutModel.js";

export const CreateCheckout = async (req, res) => {
  try {
    const userId = req.userId;
    const { products, totalPrice } = req.body;

    if (
      !userId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      !totalPrice
    ) {
      return res
        .status(400)
        .json({ message: "Dữ liệu truyền vào không hợp lệ" });
    }

    for (const { productId, quantity } of products) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
          .status(400)
          .json({ message: `productId không hợp lệ: ${productId}` });
      }
      if (quantity <= 0) {
        return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
      }
    }

    let userCheckout = await checkoutModel.findOne({ userId });

    if (!userCheckout) {
      userCheckout = new checkoutModel({
        userId,
        products,
        totalPrice,
      });
    } else {
      userCheckout.products = products;
      userCheckout.totalPrice = totalPrice;
    }

    await userCheckout.save();

    res.status(200).json({ message: "Thanh toán thành công", userCheckout });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const GetCheckout = async (req, res) => {
  try {
    const userId = req.userId;
    const userCheckout = await checkoutModel.findOne({ userId });
    res.status(200).json(userCheckout);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}

export const DeleteCheckout = async (req, res) => {
  try {
    const userId = req.userId;
    const userCheckout = await checkoutModel.deleteMany({ userId });
    res.status(200).json(userCheckout);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
