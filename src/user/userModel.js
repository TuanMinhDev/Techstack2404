import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    address: { type: String, required: true },
  },
  { timestamps: true } 
);

export default mongoose.model('User', UserSchema);
