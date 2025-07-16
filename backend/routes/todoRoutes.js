import express from "express";
import { createTodo, deletedTodo, getAllTodos, getTodosById, updateTodo} from "../controllers/todo.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createTodo);
router.get("/", auth, getTodosById);
router.get("/admin/", auth, isAdmin, getAllTodos);
router.delete("/:id", auth, deletedTodo);
router.put('/:id', auth, updateTodo);

export default router;