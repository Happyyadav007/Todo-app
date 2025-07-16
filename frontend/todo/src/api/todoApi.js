import { api } from "./api.js";


export const getTodos = async () => {
  try {
    const response = await api.get(`/api/todos/`);
    return response;
  } catch (error) {
    console.error("Fetching todos error:", error?.response?.data || error.message);
    throw error;
  }
};


export const createTodo = async (todoData) => {
    try {
        const response = await api.post(`/api/todos/`, todoData);
        return response;
    } catch (error) {
        console.error("Creating todo error:", error?.response?.data || error.message);
        throw error;
    }
    }


export const updateTodo = async (id, todoData) => {
  try {
    const response = await api.put(`/api/todos/${id}`, todoData);
    return response;
  } catch (error) {
    console.error("Updating todo error:", error?.response?.data || error.message);
    throw error;
  }
}   
export const deleteTodo = async (id) => {
    try {
        const response = await api.delete(`/api/todos/${id}`);
        return response;
    } catch (error) {
        console.error("Deleting todo error:", error?.response?.data || error.message);
        throw error;
    }
    }

    export const getAllTodos = async () => {
  try {
    const response = await api.get("/api/todos/admin/");
    return response;
  } catch (error) {
    console.error("Fetching all todos error:", error?.response?.data || error.message);
    throw error;
  }
};