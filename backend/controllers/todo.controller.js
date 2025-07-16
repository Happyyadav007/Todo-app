import Todo from "../model/Todo.model.js";

const createTodo = async (req, res) => {
  try {
    const { title, description, due_date, category } = req.body;
    console.log("creating to do:-", req.body);

    //validation
    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill required fields" });
    }
    if (title.length > 100) {
      return res
        .status(500)
        .json({
          success: false,
          message: "title must be less than 100 characters",
        });
    }
    if (description.length > 500) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Description must be less than 500 characters",
        });
    }

    const user = req.user._id;

    //create todo
    const newTodo = new Todo({ title, description, due_date, category, user });
    await newTodo.save();
    res
      .status(201)
      .json({ success: true, message: "Todo created Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while creating todo",
      });
  }
};

const getTodosById = async (req, res) => {
  const userId = req.user._id;
  try {
    const todo = await Todo.find({ user: userId });
    res.status(200).json({ success: true, todos: todo });
  } catch (error) {
     console.error("Error in createTodo:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while fetching todos",
      });
  }
};

const getAllTodos = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const allTodos = await Todo.find().populate("user", "userName email");
    res.status(200).json({ success: true, todos: allTodos });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while fetching all todos",
      });
  }
};

const deletedTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    if (
      req.user._id.toString() !== todo.user.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    await Todo.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while deleting todos",
      });
  }
};

const updateTodo = async (req, res) => {
    const todoId = req.params.id;
    const { title, description, due_date, category, completed } = req.body;

    try {
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        const isOwner = req.user._id.toString() === todo.user.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Validate
        if (title && title.length > 100) {
            return res.status(400).json({ success: false, message: "Title must be less than 100 characters" });
        }

        if (description && description.length > 500) {
            return res.status(400).json({ success: false, message: "Description must be less than 500 characters" });
        }

        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (due_date !== undefined) todo.due_date = due_date;
        if (category !== undefined) todo.category = category;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();

        res.status(200).json({ success: true, message: "Todo updated successfully", todo });
    } catch (error) {
        console.error("Error in updateTodo:", error);
        res.status(500).json({ success: false, message: "Internal server error while updating todo" });
    }
};





export { createTodo, getTodosById, getAllTodos, deletedTodo, updateTodo};
