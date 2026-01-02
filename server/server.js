import express from "express"
import cors from "cors"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
dotenv.config()

const app = express()
connectDB()
app.use(cors({ origin: ["http://localhost:5173", "https://task-manager-five-lac-27.vercel.app/"], methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)

app.get("/", (req, res) => {
    res.json({ success: true, message: "Welcome to Task Manager" })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
