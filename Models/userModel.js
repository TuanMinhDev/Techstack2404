import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
     
    },
    name: {
      type: String,
      trim: true, // Removes any leading or trailing whitespace
    },
    phoneNumber: {
      type: String,
      trim: true, // Removes any leading or trailing whitespace
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Username", userSchema);
