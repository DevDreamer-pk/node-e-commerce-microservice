import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  images: [{ type: String }],
  category: { type: String },
  brand: { type: String },
  stock: { type: Number },
  rating: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      rating: { type: Number },
    },
  ],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      review: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
