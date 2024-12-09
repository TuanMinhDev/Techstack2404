import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    bill: {
        checkout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Checkout",
            required: true,
        }
    }
},{timestamps: true});
export default mongoose.model("Order", OrderSchema);