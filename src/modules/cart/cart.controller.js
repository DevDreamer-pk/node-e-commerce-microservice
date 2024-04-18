
import { Types } from "mongoose";
import cartManager from "./cart.manager.js";
export default class cartController {

    async addToCart(req, res) {
        try {
            const userId = req.user.id;
            const { productId, quantity } = req.body;
            if (!Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ error: "Invalid ObjectId" });
              }
            const result = await new cartManager().addToCart(userId, productId, quantity);
            if (!result.success) {
                res.status(500).send(result);
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.log("Controller Error", error);
            res.status(500).send(error);
        }
    }

    async deleteCartItem (req, res) {
        try {
            const userId = req.user.id;
            const { productId } = req.params;
            if (!Types.ObjectId.isValid(productId)) {
                return res.status(400).json({ error: "Invalid ObjectId" });
              }
            const result = await new cartManager().deleteCartItem(userId, productId);
            if (!result.success) {
                res.status(500).send(result);
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.log("Controller Error", error);
            res.status(500).send(error);
        }
    }

    async getCartItems(req, res) {
        try {
            const userId = req.user.id;
            const result = await new cartManager().getCartItems(userId);
            if (!result.success) {
                res.status(500).send(result);
            } else {
                res.status(200).send(result);
            }
        } catch (error) {
            console.log("Controller Error", error);
            res.status(500).send(error);
        }
    }

}