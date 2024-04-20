import productManager from "./product.manager.js";
import { Types } from "mongoose";

export default class productController {
  async addProduct(req, res) {
    try {
      const { name, description, price, category, brand, stock } = req.body;
      console.log("BODY IS ", req.body);
      const images = req.files.map((file) => file.filename);
      const newProduct = {
        name: name,
        description: description,
        price: price,
        images: images,
        category: category,
        brand: brand,
        stock: stock,
      };
      const result = await new productManager().addProduct(newProduct);
      if (!result.data) {
        res.status(500).send("Product Not Created");
      } else {
        res.status(201).send({ message: "Product Created", result });
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async getAllProducts(req, res) {
    try {
      const result = await new productManager().getAllProducts();
      if (!result) {
        res.status(500).send("Products Not Found");
      } else {
        res.status(200).send({ message: "Products Found", products: result });
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }
      const result = await new productManager().getProductById(id);
      if (result.success == false) {
        res.status(500).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async filterProducts(req, res) {
    try {
      const category = req.query.category;
      const brand = req.query.brand;
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const searchTerm = req.query.searchTerm;

      console.log("FILTERS", category, brand, minPrice, maxPrice,searchTerm);

      const result = await new productManager().filterProducts(
        category,
        brand,
        minPrice,
        maxPrice,
        searchTerm
      );
      if (result.success == false) {
        res.status(500).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const {
        name,
        description,
        price,
        category,
        brand,
        stock,
        rating,
        reviews,
      } = req.body;
      const images = req.files.map((file) => file.filename);
      // console.log("Images IS ",images);

      const newProduct = {
        name: name,
        description: description,
        price: price,
        category: category,
        brand: brand,
        stock: stock,
        rating: rating,
        reviews: reviews,
        images: images,
      };
      const result = await new productManager().updateProduct(id, newProduct);
      if (result.success == false) {
        res.status(500).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }
      const result = await new productManager().deleteProduct(id);
      if (result.success == false) {
        res.status(500).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async rateProduct(req, res) {
    try {
      const { productId, rating } = req.body;
      const userId = req.user.id;
      if (!Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }
      const result = await new productManager().rateProduct(
        userId,
        productId,
        rating
      );
      if (result.success == false) {
        res.status(500).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }
  async reviewProduct(req, res) {
    try {
      const { productId, review } = req.body;
      const userId = req.user.id;
      if (!Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }
      const result = await new productManager().reviewProduct(
        userId,
        productId,
        review
      );
      if (result.success == false) {
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
