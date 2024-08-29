import UserModel from "../Models/userModel.js";

export const createNewUser = async (req, res) => {
  try {
    const { name, email,phoneNumber, password } = req.body;
    console.log(req.body);
    const newUser = new UserModel({
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      password: password,
    });
    const response = await newUser.save();
    console.log(response);
    res.status(200).json("Success");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userInfo = await UserModel.findOne({ email: email });
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const accountFind = await UserModel.findOne({
      email: email,
      password: password,
    });
    if (!!accountFind) {
      res.status(200).json(accountFind);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
