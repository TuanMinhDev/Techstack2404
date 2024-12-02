import express from "express";
import connect from "./config/mongoose.js";
import router from "./src/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.port;

//database
connect();
app.use(express.json());

//router
app.use("/api",router);
//localhost
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
