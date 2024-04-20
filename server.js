import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./src/modules/user/user.routes.js";
import productRouter from "./src/modules/product/product.routes.js";
import orderRouter from "./src/modules/order/order.routes.js";
import cartRouter from "./src/modules/cart/cart.routes.js";
import connectDB from "./src/config/dbConnection.js";
import JwtAuth from "./src/middleware/jwt.middleware.js";
// import cronJob from "./src/middleware/cron.job.js";
import rabbitMQProducer from "./src/middleware/rabbit.mq.producer.js";

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:5000"
}

app.use(cors(corsOptions));

app.use("/api/user", userRouter)
app.use("/api/product",JwtAuth, productRouter)
app.use("/api/order",JwtAuth, orderRouter)
app.use("/api/cart",JwtAuth, cartRouter)

app.listen(3000, () => {
    connectDB();
    // cronJob.start();
    rabbitMQProducer();
    console.log("Server started on port 3000");
})