import mongoose from "mongoose";

const test = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("test", test);
