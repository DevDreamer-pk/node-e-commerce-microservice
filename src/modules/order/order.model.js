import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["cod", "online"], required: true },
  isPaid: { type: Boolean, default: false },
  shippingAddress: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  shippingPrice: { type: Number, required: true },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
