import express from "express";
import ProductController from "./product.controller.js";
import {uploads} from "../../middleware/files.middleware.js";

// User Routes 
const productRouter = express.Router();

productRouter.post("/add-product", uploads.array("images") ,new ProductController().addProduct)
productRouter.get("/get-all-products", new ProductController().getAllProducts)
productRouter.get("/get-product/:id", new ProductController().getProductById)
productRouter.post("/filter-product", new ProductController().filterProducts)
productRouter.put("/update-product/:id",uploads.array("images"), new ProductController().updateProduct)
// productRouter.delete("/deleteUser/:id", new UserController().deleteUser)
// productRouter.get("/getUserByType", new UserController().getUserByType)


export default productRouter