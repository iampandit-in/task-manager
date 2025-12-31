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
        age: 20
      },
      {
        name: "Rehan",
        age: 19
      },
      {
        name: "Rahul",
        age: 20
      },
      {
        name: "Ravi",
        age: 20
      },
    ])
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

connectDB()