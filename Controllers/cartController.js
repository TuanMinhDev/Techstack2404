import CartItemModel from "../Models/cartItemModel.js";
import ProductModel from "../Models/productModel.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const cartItem = new CartItemModel({ productId, quantity });
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const cartItem = await CartItemModel.findByIdAndUpdate(id, { quantity }, { new: true });
        res.status(200).json(cartItem);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        await CartItemModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItemModel.find().populate('productId');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json(err);
    }
}
