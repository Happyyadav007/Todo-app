import { api } from "./api.js";

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/users/login", { email, password });
    return response;
  } catch (error) {
    console.error("Login error:", error?.response?.data || error.message);
    throw error;
  }
};


export const register = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData);
    return response;
  } catch (error) {
    console.error("Registration error:", error?.response?.data || error.message);
    throw error;
  }
};


export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/users/admin/users");
    return response;
  } catch (error) {
    console.error("Fetching users error:", error?.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/admin/${userId}`);
    return response;
  } catch (error) {
    console.error("Deleting user error:", error?.response?.data || error.message);
    throw error;
  }
};
