import express from "express"
import cors from "cors"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
dotenv.config()

// PROD SERVER URL : https://task-manager-server-mu-sage.vercel.app/
// LOCAL SERVER URL : http://localhost:3000    
// PROD CLIENT URL : https://task-manager-five-lac-27.vercel.app/
// LOCAL CLIENT URL : http://localhost:5173
// LOCAL MOBILE URL : exp://10.182.77.104:8081

const app = express()
connectDB()
app.set("trust proxy", 1);

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            "https://task-manager-five-lac-27.vercel.app",
            "http://localhost:8081"
        ];
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://192.168.") || origin.startsWith("http://10.") || origin.endsWith(".vercel.app")) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)

app.get("/", (req, res) => {
    res.json({ success: true, message: "Welcome to Momentum" })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
