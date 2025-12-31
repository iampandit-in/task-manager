import express from "express";
import { SignUp, SignIn } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signup", SignUp)
userRouter.post("/signin", SignIn)

export default userRouter
