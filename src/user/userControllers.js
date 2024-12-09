import userModel from "./userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRETKEY = process.env.SECRETKEY;

export const Register = async (req, res) => {
  try {
    const { email, name, phoneNumber, password, address } = req.body;

    let userRole = "user";
    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new userModel({
      email,
      name,
      phoneNumber,
      password: hash,
      role: userRole,
      address,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Tạo tài khoản thành công", user: newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      SECRETKEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Đăng nhập thành công",user: user ,accessToken  });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const GetByIdUser = async (req, res) => {
  try {
    const  userId  = req.userId; 
    const user = await userModel.findById(userId);
    res.status(200).json({ message: "User", user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const GetAllUser = async (req, res) => {
  try {
    const listUser = await userModel.find();
    res.status(200).json(listUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json(error);
  }
};
export const PutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, phoneNumber, address } = req.body;
    await userModel.findByIdAndUpdate(id, {
      email,
      name,
      phoneNumber,
      address,
    });
    res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    res.status(500).json(error);
  }
};
