import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    bill: {
        billId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill",
            required: true,
        }
    }
},{timestamps: true});
export default mongoose.model("Order", OrderSchema);