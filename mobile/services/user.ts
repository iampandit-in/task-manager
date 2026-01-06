import api from "./api";

export const signInUser = async (formData: any) => {
  try {
    const response = await api.post("/user/signin", formData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const signUpUser = async (formData: any) => {
  try {
    const response = await api.post("/user/signup", formData);
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const signOutUser = async () => {
  try {
    const response = await api.post("/user/signout");
    return response.data;
  } catch (error: any) {
    return error.response?.data || { success: false, message: error.message };
  }
};
