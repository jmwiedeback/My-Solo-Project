import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signup").post(createUser);

userRouter.route("/login").post(loginUser);

export default userRouter;
