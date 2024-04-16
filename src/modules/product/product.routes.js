import express from "express";
import ProductController from "./product.controller.js";
import {uploads} from "../../middleware/files.middleware.js";
import ProductValidationManager from "../../middleware/validation.js";

// User Routes 
const productRouter = express.Router();

productRouter.post("/add-product",  uploads.array("images") , ProductValidationManager.validateAddProduct, new ProductController().addProduct)
productRouter.get("/get-all-products", new ProductController().getAllProducts)
productRouter.get("/get-product/:id", new ProductController().getProductById)
productRouter.post("/filter-product", new ProductController().filterProducts)
productRouter.put("/update-product/:id",uploads.array("images"), new ProductController().updateProduct)
productRouter.delete("/delete-product/:id", new ProductController().deleteProduct)
productRouter.post("/rate-product", ProductValidationManager.validateRateProduct, new ProductController().rateProduct)
productRouter.post("/review-product", ProductValidationManager.validateReviewProduct, new ProductController().reviewProduct)
// productRouter.get("/getUserByType", new UserController().getUserByType)


export default productRouter