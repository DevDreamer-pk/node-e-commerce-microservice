import productManager from "./product.manager.js";

export default class productController {
  async addProduct(req, res) {
    try {
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
        rating: rating,
        reviews: reviews,
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

      console.log("FILTERS", category, brand, minPrice, maxPrice);

      const result = await new productManager().filterProducts(
        category,
        brand,
        minPrice,
        maxPrice
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
    //   const images = req.files.map((file) => file.filename);
      const newProduct = {
        name: name,
        description: description,
        price: price,
        category: category,
        brand: brand,
        stock: stock,
        rating: rating,
        reviews: reviews,
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
}
