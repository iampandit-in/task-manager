import express from "express";
import { SignUp, SignIn, getCurrentUser, SignOut } from "../controllers/user.js";
import { authenticateToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", SignUp)
userRouter.post("/signin", SignIn)
userRouter.post("/signout", SignOut)
userRouter.get("/get-current-user", authenticateToken, getCurrentUser)
userRouter.post("/auth-check", authenticateToken, (req, res) => {
    res.json({ success: true })
})

export default userRouter
