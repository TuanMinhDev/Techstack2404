import express from "express";
import {
  login,
  createNewUser,
  getUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/create", createNewUser);
router.post("/get", getUser);

export default router;
