import axios from "axios";

// Use your machine's LAN IP for physical devices
const BASE_URL = "http://10.182.77.104:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
