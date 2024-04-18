import express from "express";

import cartController from "./cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/add", new cartController().addToCart);
cartRouter.delete("/remove/:productId", new cartController().deleteCartItem);
// cartRouter.put("/update/:productId", new cartController().updateCartItem);
cartRouter.get("/list", new cartController().getCartItems);
// cartRouter.get("/clear", new cartController().clearCart);


// cartRouter.get("/get-cart", new cartController().getCart);
// cartRouter.delete("/delete-cart", new cartController().deleteCart);
// cartRouter.post("/update-cart", new cartController().updateCart);
// cartRouter.post("/checkout", new cartController().checkout);
// cartRouter.post("/add-cart-item", new cartController().updateCartItem);

export default cartRouter



