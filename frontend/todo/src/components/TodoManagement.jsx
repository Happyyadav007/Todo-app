import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateTodo from './CreateTodo';
import EditTodo from './EditTodo';
import { getTodos, deleteTodo } from '../api/todoApi';

function TodoManagement() {
  const [todos, setTodos] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
    
    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getTodos();
        setTodos(response.data.todos);
      } catch (error) {
        setError("Failed to fetch todos. Please try again later.");
        if (error.response?.status === 401) navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleCreateTodo = async (newTodo) => {
    try {
      setTodos([newTodo, ...todos]);
      setShowCreateForm(false);
      const response = await getTodos();
      setTodos(response.data.todos);
    } catch (error) {
      setTodos(todos.filter(todo => todo._id !== newTodo._id));
      alert("Todo created but failed to refresh list");
    }
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
    setEditingTodo(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete todo");
      if (error.response?.status === 401) navigate('/');
    }
  };

  const handleDashboardClick = () => navigate('/admin/dashboard');

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Todo Management</h1>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {userRole === 'admin' && (
              <button
                onClick={handleDashboardClick}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-3 sm:mb-4 text-sm">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full sm:w-auto px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            disabled={isLoading || editingTodo}
          >
            {isLoading ? 'Loading...' : 'Create New Todo'}
          </button>
        </div>

        {showCreateForm && <CreateTodo onCreate={handleCreateTodo} onCancel={() => setShowCreateForm(false)} />}
        {editingTodo && <EditTodo todo={editingTodo} onUpdate={handleUpdateTodo} onCancel={() => setEditingTodo(null)} />}

        {isLoading && !showCreateForm && !editingTodo ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {todos.length === 0 ? (
              <div className="p-4 sm:p-6 text-center text-gray-500 text-sm sm:text-base">
                No todos found. Create your first todo!
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {todos.map((todo) => (
                  <li key={todo?._id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 truncate">{todo?.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{todo?.description}</p>
                        <div className="mt-1 flex flex-wrap gap-1 sm:gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            todo?.category === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {todo?.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            todo?.status === 'completed' ? 'bg-green-100 text-green-800' :
                            todo?.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {todo?.status.replace('_', ' ')}
                          </span>
                          {todo?.due_date && (
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                              Due: {new Date(todo?.due_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => setEditingTodo(todo)}
                          className="px-2 py-1 text-xs sm:text-sm text-yellow-500 hover:text-yellow-700 border border-yellow-500 rounded hover:bg-yellow-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(todo._id)}
                          className="px-2 py-1 text-xs sm:text-sm text-red-500 hover:text-red-700 border border-red-500 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoManagement;