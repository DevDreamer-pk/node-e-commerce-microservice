import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./src/modules/user/user.routes.js";
import productRouter from "./src/modules/product/product.routes.js";
import connectDB from "./src/config/dbConnection.js";
import JwtAuth from "./src/middleware/jwt.middleware.js";

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:5000"
}

app.use(cors(corsOptions));

app.use("/api/user", userRouter)
app.use("/api/product",JwtAuth, productRouter)

app.listen(3000, () => {
    connectDB();
    console.log("Server started on port 3000");
})