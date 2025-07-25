import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://todo-app-jblt.onrender.com",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
