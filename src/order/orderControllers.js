import orderModel from "./orderModel.js";
export const CreateOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { bill } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId là bắt buộc" });
    }

    const userOrder = new orderModel({ userId, bill });
    await userOrder.save();
    res.status(200).json({ message: "Tạo đơn hàng thành công", userOrder });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
export const GetOrder = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId là bắt buộc" });
    }
    const userOrder = await orderModel.find({ userId });
    res.status(200).json({ message: "Lấy đơn hàng thành công", userOrder });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
export const DeleteOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId là bắt buộc" });
    }
    await orderModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Xóa đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
export const GetAllOrder = async (req, res) => {
    try {
      const adminOrder = await orderModel.find();
      res.status(200).json({ message: "Tất cả đơn hàng", adminOrder });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };
