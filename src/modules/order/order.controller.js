
import { Types } from "mongoose";
import orderManager from "./order.manager.js";
export default class orderController {

    async addOrder(req, res) {
        try {
            const userId = req.user.id;
            const { orderItems } = req.body;
            const result = await new orderManager().addOrder(userId,orderItems);
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

    async listOrdersByUser(req, res) {
        try {
            const userId = req.user.id;
            const result = await new orderManager().getOrders(userId);
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

    async listAllOrders(req, res) {
        try {
            const result = await new orderManager().getAllOrders();
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

    async updateOrderStatus(req, res) {
        try {
            const userId = req.user.id;
            const orderId = req.params.id;
            if (!Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ error: "Invalid ObjectId" });
              }
            const status = req.body.status;
            const result = await new orderManager().updateOrderStatus(userId, orderId, status);
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

    async cancelOrder(req, res) {
        try {
            const userId = req.user.id;
            const orderId = req.params.id;

            // console.log("userId", userId);
            // console.log("OrderId", orderId);

            if (!Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ error: "Invalid ObjectId" });
              }
            
            const result = await new orderManager().cancelOrder(userId, orderId);
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

    async generateOrderInvoice(req, res) {
        try {
            const userId = req.user.id;
            const orderId = req.params.id;
            if (!Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ error: "Invalid ObjectId" });
              }
            const result = await new orderManager().generateOrderInvoice(userId, orderId);
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