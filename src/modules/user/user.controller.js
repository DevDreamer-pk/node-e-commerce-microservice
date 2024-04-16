import userManager from "./user.manager.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
// import userModel from "./user.model.js";
export default class userController {
  async signupUser(req, res) {
    try {
      const { name, email, password, type, address, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await new userManager().signUp({
        name,
        email,
        password: hashedPassword,
        type,
        address,
        phone,
      });
      if (!result) {
        res.status(500).send("User Not Created");
      }
      res.status(201).send({ message: "User Created", result });
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const result = await new userManager().login({ email, password });
      if (result.success == true) {
        const token = jwt.sign(
          {
            email: result.user.email,
            id: result.user._id,
            type: result.user.type,
          },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).send({ message: "User Logged In", token: token });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await new userManager().getAllUsers();
      if (!result) {
        res.status(500).send("Users Not Found");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log("Controller Error", error);
      res.status(500).send(error);
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }
      const result = await new userManager().getUserById(id);
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

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const { name, email, address, phone } = req.body;
      const result = await new userManager().updateUser(id, {
        name,
        email,
        address,
        phone,
      });
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

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const result = await new userManager().deleteUser(id);
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

  async getUserByType(req, res) {
    try {
      const type = req.query.type;
      const result = await new userManager().getUserByType(type);
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
