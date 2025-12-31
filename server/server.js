import express from "express"
import cors from "cors"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.js"
dotenv.config()

const app = express()
connectDB()
app.use(cors({ origin: ["http://localhost:5173", "https://task-manager-five-lac-27.vercel.app/"], methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.json([
      {
        name: "Pandit",
        email: "pandit@gmail.com"
      },
      {
        name: "Rehan",
        email: "rehan@gmail.com"
      },
      {
        name: "Umesh",
        email: "umesh@gmail.com"
      }
    ])
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
