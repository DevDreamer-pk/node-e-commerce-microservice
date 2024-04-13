import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name : { type: String },
    description : { type: String },
    price : { type: Number },
    images : [{ type: String }],
    category : { type: String },
    brand : { type: String },
    stock : { type: Number },
    rating : [{ type: Number }],
    reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    createdAt : { type: Date, default: Date.now }
})

const productModel = mongoose.model("Product", productSchema);

export default productModel;