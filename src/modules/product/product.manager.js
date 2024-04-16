import { ObjectId } from "mongodb";
import productModel from "./product.model.js";
import userModel from "../user/user.model.js";
export default class productManager {
  async addProduct(product) {
    try {
      const newProduct = new productModel(product);
      const result = await newProduct.save();
      if (!result) {
        return { message: "Product Not Saved in Database", success: false };
      }
      return { data: result, success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async getAllProducts() {
    try {
      const result = await productModel.find();
      if (!result) {
        return "Products Not Found";
      }
      return result;
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const result = await productModel.findById({ _id: new ObjectId(id) });
      if (!result) {
        return { message: "Product Not Found", success: false };
      }
      return { message: "Product Found", success: true, product: result };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async filterProducts(category, brand, minPrice, maxPrice) {
    try {
      let filter = {};

      if (category) {
        filter.category = category;
      }

      if (brand) {
        filter.brand = brand;
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice !== undefined) {
        filter.price = { $gte: minPrice };
      } else if (maxPrice !== undefined) {
        filter.price = { $lte: maxPrice };
      }

      const result = await productModel.find(filter);
      if (!result || result.length === 0) {
        return { message: "Products Not Found", success: false };
      }
      return { message: "Products Found", success: true, products: result };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async updateProduct(id, product) {
    try {
      const result = await productModel.findByIdAndUpdate(
        { _id: new ObjectId(id) },
        product,
        { new: true }
      );
      if (!result) {
        return { message: "Product Not Found", success: false };
      }
      return { message: "Product Updated", success: true, product: result };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!result) {
        return { message: "Product Not Found", success: false };
      }
      return { message: "Product Deleted", success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async rateProduct(userId, productId, rating) {
    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return { message: "Product Not Found", success: false };
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return { message: "User Not Found", success: false };
      }

      // Check if the user has already rated the product
      const existingRatingIndex = product.rating.findIndex(
        (r) => r.user.toString() === userId
      );
      if (existingRatingIndex !== -1) {
        // Update the existing rating
        product.rating[existingRatingIndex].rating = rating;
      } else {
        // Add a new rating
        product.rating.push({
          user: userId,
          product: productId,
          rating: rating,
        });
      }

      // Save the updated product
      await product.save();

      return { message: "Product Rated", success: true, product: product };
    } catch (error) {
      console.error("Error rating product:", error);
      throw new Error(error);
    }
  }

  async reviewProduct(userId, productId, review) {
    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return { message: "Product Not Found", success: false };
      }
      const user = await userModel.findById(userId);
      if (!user) {
        return { message: "User Not Found", success: false };
      }

      // Check if the user has already reviewed the product
      const existingReviewIndex = product.reviews.findIndex(
        (r) => r.user.toString() === userId
      );

      if (existingReviewIndex !== -1) {
        // Update the existing review
        product.reviews[existingReviewIndex].review = review;
      } else {
        // Add a new review
        product.reviews.push({
          user: userId,
          product: productId,
          review: review,
        });
      }

      // Save the updated product
      await product.save();

      return { message: "Product Reviewed", success: true, product: product };
    } catch (error) {
      console.error("Error reviewing product:", error);
      throw new Error(error);
    }
  }
}
