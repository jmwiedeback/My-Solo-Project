import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const userRouter = Router();

// Route for user signup
userRouter.route("/signup").post(createUser);

// Route for user login
userRouter.route("/login").post(loginUser);



export default userRouter;
