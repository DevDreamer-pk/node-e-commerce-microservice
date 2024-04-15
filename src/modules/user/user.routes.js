import express from "express";
import UserController from "./user.controller.js";
import UserValidationManager from "../../middleware/user.validation.js";

// User Routes 
const userRouter = express.Router();

userRouter.post("/signup", UserValidationManager.validateSignup, new UserController().signupUser)
userRouter.post("/login", UserValidationManager.validateLogin, new UserController().loginUser)
userRouter.get("/getAllUsers", new UserController().getAllUsers)
userRouter.get("/getUser/:id", UserValidationManager.validateGetUserById , new UserController().getUserById)
userRouter.put("/updateUser/:id", new UserController().updateUser)
userRouter.delete("/deleteUser/:id", new UserController().deleteUser)
userRouter.get("/getUserByType", UserValidationManager.validateGetUserByType, new UserController().getUserByType)


export default userRouter