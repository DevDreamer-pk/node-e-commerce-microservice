import cartModel from "./cart.model.js";
import userModel from "../user/user.model.js";
import mongoose from "mongoose";
import productModel from "../product/product.model.js";

import { ObjectId } from "mongodb";
export default class cartController {
  async addToCart(userId, productId, quantity) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return { message: "User not found", success: false };
      }

      const cart = await cartModel.findOne({ user: userId });
      if (!cart) {
        const newCart = new cartModel({
          user: userId,
          cartItems: [{ product: productId, quantity: quantity }],
        });
        await newCart.save();
      } else {
        const existingItem = cart.cartItems.find(
          (item) => item.product.toString() === productId.toString()
        );
        if (existingItem) {
          existingItem.quantity = quantity;
        } else {
          cart.cartItems.push({ product: productId, quantity: quantity });
        }
        await cart.save();
      }
      return { message: "Product added to cart", success: true };
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error(error);
    }
  }

  async deleteCartItem(userId, productId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return { message: "User not found", success: false };
      }
      const cart = await cartModel.findOne({ user: userId });

      if (!cart) {
        return { message: "Cart not found", success: false };
      }

      const itemIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      if (itemIndex === -1) {
        return { message: "Item not found in cart", success: false };
      }

      cart.cartItems.splice(itemIndex, 1);

      await cart.save();

      return { message: "Item deleted from cart", success: true };
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      throw new Error(error);
    }
  }

  async getCartItems(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return { message: "User not found", success: false };
      }

      const cart = await cartModel.findOne({ user: userId }).populate(
        "cartItems.product"
      );

      if (!cart) {
        return { message: "Cart not found", success: false };
      }

      // const cartItems = await Promise.all(
      //   cart.cartItems.map(async (item) => {
      //     const product = await productModel.findById(item.product);
      //     return {
      //       product: product,
      //       quantity: item.quantity,
      //     };
      //   })
      // );

      return { data: cart, success: true };
    } catch (error) {
      console.error("Error getting cart items:", error);
      throw new Error(error);
    }
  }
}
