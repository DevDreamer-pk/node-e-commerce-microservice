import orderModel from "./order.model.js";
import userModel from "../user/user.model.js";
import mongoose from "mongoose";
import productModel from "../product/product.model.js";

import { ObjectId } from "mongodb";
export default class orderController {
  async addOrder(userId, orderItems) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find the user
      const user = await userModel.findById(userId);
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return { message: "User not found", success: false };
      }

      // Check if the user already has an existing order
      let order = await orderModel.findOne({ user: user._id }).session(session);

      if (!order) {
        // If the user doesn't have an existing order, create a new one
        const totalPrice = orderItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        order = new orderModel({
          user: user._id,
          orderItems: orderItems,
          totalPrice: totalPrice,
          paymentMethod: "online",
          shippingAddress: {
            city: user.address.city,
            state: user.address.state,
            country: user.address.country,
          },
          shippingPrice: 10,
        });

        await order.save({ session: session });
      } else {
        // If the user already has an existing order, update it
        const totalPrice = orderItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        order.orderItems.push(...orderItems);
        order.totalPrice += totalPrice;

        await order.save( { session: session } );
      }

      await session.commitTransaction();
      session.endSession();

      return { data: order, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      await session.abortTransaction();
      session.endSession();
      throw new Error(error);
    }
  }

  async getOrders(userId) {
    try {
      const result = await orderModel
        .find({ user: new ObjectId(userId) })
        .populate("user");
      console.log(result);
      if (!result) {
        return { message: "Orders Not Found", success: false };
      }
      return { data: result, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async getAllOrders() {
    try {
      const result = await orderModel.find().populate("user");
      if (!result) {
        return { message: "Orders Not Found", success: false };
      }
      return { data: result, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async updateOrderStatus(userId, orderId, status) {
    try {
      const user = await userModel.findById(userId);
      if(user.type == "user") {
        return { message: "You are not an admin", success: false };
      }

      const result = await orderModel
        .findOneAndUpdate(
          { _id: new ObjectId(orderId) },
          { status: status },
          { new: true }
        )
        .populate("user");
      if (!result) {
        return { message: "Order Not Found", success: false };
      }
      return { data: result, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async cancelOrder(userId, orderId) {
    try {
      const result = await orderModel
        .findOneAndUpdate(
          { user : new ObjectId(userId), _id: new ObjectId(orderId) },
          { status: "cancelled" },
          { new: true }
        )
        .populate("user");
      if (!result) {
        return { message: "Order Not Found", success: false };
      }
      return { data: result, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async generateOrderInvoice(userId, orderId) {
    try {
      const user = await userModel.findById(userId);
      if(user.type == "user") {
        return { message: "You are not an admin", success: false };
      }
      const result = await orderModel
        .findOneAndUpdate(
          { _id: new ObjectId(orderId) },
          { isDelivered: true, deliveredAt: new Date(), status: "delivered", isPaid: true },
          { new: true }
        )
        .populate("user");
      if (!result) {
        return { message: "Order Not Found", success: false };
      }
      return { data: result, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }
}
