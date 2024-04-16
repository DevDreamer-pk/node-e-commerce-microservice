import { ObjectId } from "mongodb";
import userModel from "./user.model.js";
import bcrypt from "bcrypt";
export default class userManager {
  async signUp(userData) {
    try {
      const user = new userModel(userData);
      const result = await user.save();
      if (!result) {
        return "user not created";
      }
      return result;
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async login(userData) {
    try {
      const { email, password } = userData;
      const user = await userModel.findOne({ email });
      if (!user) {
        return { message: "User Not Found", success: false };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return { message: "User Logged In", user: user, success: true };
      } else {
        return { message: "Wrong Password", success: false };
      }
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async getAllUsers() {
    try {
      const result = await userModel.find();
      if (!result) {
        return "users not found";
      }
      return result;
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      const result = await userModel.findById({ _id: new ObjectId(id) });
      console.log(result);
      if (!result) {
        return { message: "User Not Found", success: false };
      }
      return { message: "User Found", success: true, user: result };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async updateUser(id, userData) {
    try {
      const result = await userModel.findByIdAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          name: userData.name,
          email: userData.email,
          address: userData.address,
          phone: userData.phone,
        },
        { new: true }
      );
      console.log(result);
      if (!result) {
        return { message: "User Not Found", success: false };
      }
      return { message: "User Updated", success: true, user: result };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async deleteUser(id) {
    try {
      const result = await userModel.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!result) {
        return { message: "User Not Found", success: false };
      }
      return { message: "User Deleted Successfully", success: true };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }

  async getUserByType(type) {
    try {
      const result = await userModel.find({ type });
      if (!result || result.length == 0) {
        return { message: "User Not Found", success: false };
      }
      return { message: "User Found", success: true, user: result };
    } catch (error) {
      console.log("Manager Error", error);
      throw new Error(error);
    }
  }
}
