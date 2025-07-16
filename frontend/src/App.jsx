import Login from "./components/Login";
import TodoManagement from "./components/TodoManagement";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos/manage" element={<TodoManagement />} />
        <Route path="/todos/create" element={<CreateTodo />} />
        <Route path="/todos/edit/:id" element={<CreateTodo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
