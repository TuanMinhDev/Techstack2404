import cartModel from "./cartModel.js";

// Create or update product in cart
export const CreateProductCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity, size } = req.body;

    if (!productId || !size || quantity === undefined) {
      return res.status(400).json({ message: "Thông tin không đầy đủ (productId, size, quantity)" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
    }

    let userCart = await cartModel.findOne({ userId });
    if (!userCart) {
      userCart = new cartModel({
        userId,
        products: [{ productId, quantity, size }],
      });
    } else {
      const productIndex = userCart.products.findIndex(
        (pro) => pro.productId.equals(productId) && pro.size === size
      );

      if (productIndex !== -1) {
        userCart.products[productIndex].quantity += Number(quantity);
      } else {
        userCart.products.push({ productId, quantity, size });
      }
    }

    await userCart.save();
    res.status(200).json({ message: "Sản phẩm đã được thêm vào giỏ hàng", userCart });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Get user's cart
export const GetProductCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId là bắt buộc" });
    }

    const userCart = await cartModel.findOne({ userId }).populate("products.productId");

    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng của người dùng này" });
    }

    res.status(200).json(userCart);
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Delete a specific product from cart
export const DeleteProductCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { size } = req.query; // Lấy size từ query

    if (!id || !size) {
      return res.status(400).json({ message: "id và size là bắt buộc" });
    }

    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    userCart.products = userCart.products.filter(
      (pro) => !(pro.productId.equals(id) && pro.size === size)
    );

    await userCart.save();
    res.status(200).json({ message: "Xóa sản phẩm khỏi giỏ hàng thành công" });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Update quantity of a product in cart
export const PutQuantityProductCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { newQuantity } = req.body;
    const { size } = req.query; // Lấy size từ query

    if (!id || !size || newQuantity === undefined) {
      return res.status(400).json({ message: "id, size và newQuantity là bắt buộc" });
    }

    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const product = userCart.products.find(
      (pro) => pro.productId.equals(id) && pro.size === size
    );

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    product.quantity = newQuantity;
    await userCart.save();

    res.status(200).json({ message: "Cập nhật số lượng thành công", userCart });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const deleteUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { products } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId là bắt buộc" });
    }


    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng của người dùng" });
    }

    userCart.products = userCart.products.filter(
      (pro) =>
        !products.some(
          (p) => pro.productId.equals(p.productId) && pro.size === p.size
        )
    );

    await userCart.save();

    res.status(200).json({ message: "Xóa sản phẩm thành công", userCart });
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


