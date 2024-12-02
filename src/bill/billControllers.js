import billModel from "./billModel.js";


export const CreateBill = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartId, totalPrice, product } = req.body;

    if (!userId || (!cartId && !product)) {
      return res
        .status(400)
        .json({ message: "Thông tin truyền vào không hợp lệ" });
    }

    let userBill;

    if (cartId && totalPrice) {
      userBill = await billModel.findOne({ userId });

      if (!userBill) {
        userBill = new billModel({
          userId,
          carts: [{ cartId, totalPrice }],
        });
      } else {
        userBill.carts.push({ cartId, totalPrice });
      }
    } else if (product) {
      userBill = new billModel({
        userId,
        product,
      });
    }

    await userBill.save();

    res.json({ message: "Tạo hóa đơn thành công", billId: userBill });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

// Lấy thông tin hóa đơn
export const GetBill = async (req, res) => {
  try {
    const userId = req.userId;

    // Kiểm tra thông tin đầu vào
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }

    // Tìm hóa đơn theo userId
    const userBill = await billModel
      .findOne({ userId })
      .populate("carts.cartId product.productId");

    if (!userBill) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    res.json(userBill);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};


export const DeleteBill = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }
    const deletedBills = await billModel.deleteMany({ userId });

    if (deletedBills.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hóa đơn nào để xóa" });
    }

    res.json({
      message: `Xóa thành công ${deletedBills.deletedCount} hóa đơn`,
      deletedBills,
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};
