import productModel from "./productModel.js";


export const CreateProduct = async (req, res) => {
  try {
    const { nameProduct, price, linkImg1, linkImg2, linkImg3, category } = req.body;

    
    const checkProduct = await productModel.findOne({ nameProduct });
    if (checkProduct) {
      return res.status(400).json({ message: "Sản phẩm đã tồn tại" });
    }

    
    if (isNaN(price)) {
      return res.status(400).json({ message: "Giá sản phẩm phải là số" });
    }

    const newProduct = new productModel({
      nameProduct,
      price,
      category,
      linkImg1,
      linkImg2,
      linkImg3,
    });

    await newProduct.save();
    res.status(201).json({ message: "Thêm sản phẩm thành công", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra khi thêm sản phẩm", error });
  }
};

// Get product by ID
export const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy thông tin sản phẩm", error });
  }
};

// Update product
export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameProduct, price, linkImg1, linkImg2, linkImg3, category } = req.body;

    const product = await productModel.findByIdAndUpdate(id, {
      nameProduct,
      price,
      category,
      linkImg1,
      linkImg2,
      linkImg3,
    }, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật sản phẩm thành công", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật sản phẩm", error });
  }
};

// Delete product
export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa sản phẩm", error });
  }
};

// Get all products
export const GetAllProduct = async (req, res) => {
  try {
    const listProduct = await productModel.find();
    res.status(200).json(listProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra khi lấy danh sách sản phẩm", error });
  }
};
