import express from "express";
import UserController from "./user.controller.js";

// User Routes 
const userRouter = express.Router();

userRouter.post("/signup", new UserController().signupUser)
userRouter.post("/login", new UserController().loginUser)
userRouter.get("/getAllUsers", new UserController().getAllUsers)
userRouter.get("/getUser/:id", new UserController().getUserById)
userRouter.put("/updateUser/:id", new UserController().updateUser)
userRouter.delete("/deleteUser/:id", new UserController().deleteUser)
userRouter.get("/getUserByType", new UserController().getUserByType)


export default userRouter