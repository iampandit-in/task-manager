import api from "./api";

export const getAllTasks = async () => {
  try {
    const response = await api.get("/task/get-tasks");
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const addNewTask = async (taskData: any) => {
  try {
    const response = await api.post("/task/add-task", taskData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const updateTask = async (id: string, taskData: any) => {
  try {
    const response = await api.put(`/task/update-task/${id}`, taskData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/task/delete-task/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};
