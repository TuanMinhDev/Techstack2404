import cartModel from "./cartModel.js";

export const CreateProductCart = async (req, res) => {
  try {
    const  userId  = req.userId; 
    const { productId, quantity, size } = req.body;

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

    res
      .status(200)
      .json({ message: "Sản phẩm đã được thêm vào giỏ hàng", userCart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};



export const GetProductCart = async (req, res) => {
  try {
    const  userId  = req.userId; 

    if (!userId) {
      return res.status(400).json({ message: "userId là bắt buộc" });
    }

    const userCart = await cartModel
      .findOne({ userId })
      

    if (!userCart) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giỏ hàng của người dùng này" });
    }

 
    res.status(200).json({ userCart });
  } catch (error) {
   
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};



export const DeleteProductCart = async (req, res) => {
  try {
    const  userId  = req.userId;
    const { id } = req.params;

    const userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    
    userCart.products = userCart.products.filter(
      (pro) => !pro.productId.equals(id)
    );

    
    await userCart.save();
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const PutQuantityProductCart = async (req, res) => {
  try {
    const  userId  = req.userId;
    const { newQuantity } = req.body;
    const { id } = req.params;

    
    const userCart = await cartModel.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

   
    const product = userCart.products.find((pro) => pro.productId.equals(id));
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    
    product.quantity = newQuantity;

    
    await userCart.save();

    res.status(200).json({ message: "Cập nhật thành công", userCart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

