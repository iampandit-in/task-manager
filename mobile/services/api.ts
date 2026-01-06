import axios from "axios";

const BASE_URL = __DEV__
  ? "http://10.182.77.104:3000/api"
  : "https://task-manager-server-mu-sage.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
