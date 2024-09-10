import CartItemModel from "../Models/cartItemModel.js";
import ProductModel from "../Models/productModel.js";

// Add to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;

        // Kiểm tra tính hợp lệ của quantity
        if (quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        // Tìm sản phẩm theo productId
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa (cùng productId và size)
        let cartItem = await CartItemModel.findOne({ productId, size });
        if (cartItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng quantity
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Nếu chưa có, tạo mới
            cartItem = new CartItemModel({ productId, quantity, size });
            await cartItem.save();
        }

        res.status(200).json(cartItem);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
// Update Cart Item
export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, size } = req.body;

        // Kiểm tra tính hợp lệ của quantity
        if (quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const cartItem = await CartItemModel.findByIdAndUpdate(
            id,
            { quantity, size },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json(cartItem);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// Remove Cart Item
export const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await CartItemModel.findByIdAndDelete(id);

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// Get Cart Items
export const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItemModel.find().populate('productId');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}
