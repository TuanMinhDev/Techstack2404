import express from "express";
import {
  createNewDocument,
  getDocumentByName,
  updateDocumentAge,
  deleteDocumentByName,
} from "../Controllers/testController.js";

const router = express.Router();

router.post("/create", createNewDocument);
router.post("/get-by-name", getDocumentByName);
router.post("/update-age", updateDocumentAge);
router.post("/delete", deleteDocumentByName);

export default router;
