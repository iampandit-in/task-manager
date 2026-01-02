import express from "express";
import { addNewTask, updateTask, deleteTask, getTasks } from "../controllers/task.js";
import { authenticateToken } from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter.post("/add-task", authenticateToken, addNewTask)
taskRouter.put("/update-task/:id", authenticateToken, updateTask)
taskRouter.delete("/delete-task/:id", authenticateToken, deleteTask)
taskRouter.get("/get-tasks", authenticateToken, getTasks)

export default taskRouter
