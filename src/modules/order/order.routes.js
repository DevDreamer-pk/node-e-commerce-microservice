import express from "express";

import orderController from "./order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", new orderController().addOrder);
// orderRouter.get("/get-order/:id", new orderController().getOrderByID);
// orderRouter.delete("/delete-order/:id", new orderController().deleteOrder)
orderRouter.get("/list-orders", new orderController().listOrdersByUser);
orderRouter.get("/orders/all", new orderController().listAllOrders);
orderRouter.post("/orders/:id/status", new orderController().updateOrderStatus)
orderRouter.post("/orders/:id/cancel", new orderController().cancelOrder)
// orderRouter.post("/orders/:id/refund", new orderController().refundOrder)
orderRouter.post("/orders/:id/invoice", new orderController().generateOrderInvoice)
// orderRouter.post("/orders/:id/resend-confirmation", new orderController().resendOrderConfirmation)




export default orderRouter



