import express from "express";
import connect from "./config/mongoose.js";
import cors from "cors";
import router from "./Routers/index.js";

const app = express();
const PORT = process.env.port || 4000;
// const httpServer = createServer(app);

connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corOption));
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
