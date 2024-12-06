import axios from "axios";

const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: BASE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    },
  
});

export default axiosInstance;
