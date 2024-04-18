import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    }
  ]
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
