import express from "express"
import cors from "cors"
import connectDB from "./db/index.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors())

app.get("/", (req, res) => {
    res.json([
      {
        name: "Pandit",
        email: "pandit@gmail.com"
      },
      {
        name: "Rehan",
        email: "rehan@gmail.com"
      }
    ])
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

connectDB()