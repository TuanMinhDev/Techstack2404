import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nameProduct:{type:String, required:true},
    price:{type:String, required:true},
    linkImg1:{type:String, required:true},
    linkImg2:{type:String, required:true},
    linkImg3:{type:String, required:true},
},{ timestamps: true });

export default mongoose.model("Product", ProductSchema);