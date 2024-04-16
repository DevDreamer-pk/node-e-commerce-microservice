import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  type: { enum: ["user", "admin"], type: String },
  address: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  phone: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
