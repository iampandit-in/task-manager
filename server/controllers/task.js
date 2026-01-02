import TaskModel from "../models/task.js";

const addNewTask = async (req, res) => {
  const { title, description, status, priority, userId } = await req.body;
  try {
    const task = await TaskModel.create({
      title,
      description,
      status,
      priority,
      userId,
    });
    res.status(201).json({ success: true, data: task, message: "Task added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: tasks, message: "Tasks retrieved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
}

const updateTask = async (req, res) => {
  const { id } = await req.params;
  const { title, description, status, priority } = await req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(id, {
      title,
      description,
      status,
      priority,
    });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task, message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
}

const deleteTask = async (req, res) => {
  const { id } = await req.params;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task, message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
}

export { addNewTask, updateTask, deleteTask, getTasks };