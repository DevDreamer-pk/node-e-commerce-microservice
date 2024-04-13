import { ObjectId } from "bson";
import productModel from "./product.model.js";
export default class productManager {
    async addProduct(product) {
        const newProduct = new productModel(product);
        const result = await newProduct.save();
        if(!result) {
            return { message: "Product Not Saved in Database", success: false }
        }
        return { data : result, success: true }
    }

    async getAllProducts() {
        const result = await productModel.find();
        if(!result) {
            return "Products Not Found";
        }
        return result;
    }

    async getProductById(id) {
        const result = await productModel.findById({_id : new ObjectId(id)});
        if(!result) {
            return { message: "Product Not Found", success: false };
        }
        return { message: "Product Found", success: true, product : result };
    }

    async filterProducts(category, brand, minPrice, maxPrice) {
        let filter = {}

        if(category){
            filter.category = category;
        }

        if(brand){
            filter.brand = brand;
        }

        if(minPrice !== undefined && maxPrice !== undefined) {
            filter.price = { $gte: minPrice, $lte: maxPrice };
        } else if(minPrice !== undefined) {
            filter.price = { $gte: minPrice };
        } else if(maxPrice !== undefined) {
            filter.price = { $lte: maxPrice };
        }

        const result = await productModel.find(filter);
        if(!result || result.length === 0) {
            return { message: "Products Not Found", success: false };
        }
        return { message: "Products Found", success: true, products : result };
    }

    async updateProduct(id, product) {
        const result = await productModel.findByIdAndUpdate({_id : new ObjectId(id)}, product, {new: true});
        if(!result) {
            return { message: "Product Not Found", success: false };
        }
        return { message: "Product Updated", success: true, product : result };
    }
}