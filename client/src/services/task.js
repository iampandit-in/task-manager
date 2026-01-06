import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/task`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addNewTask = async (formData) => {
  try {
    const response = await api.post("/add-task", formData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const getAllTasks = async () => {
  try {
    const response = await api.get("/get-tasks");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const updateTask = async (id, formData) => {
  try {
    const response = await api.put(`/update-task/${id}`, formData);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/delete-task/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};
