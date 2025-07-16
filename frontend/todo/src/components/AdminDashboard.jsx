import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../api/loginApi';
import { getAllTodos, deleteTodo, updateTodo } from '../api/todoApi';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'users') {
        const usersResponse = await getAllUsers();
        setUsers(usersResponse.data.users);
      } else {
        const todosResponse = await getAllTodos();
        setTodos(todosResponse.data.todos);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch data");
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo._id !== todoId));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const handleUpdateTodo = async (todoId, updatedData) => {
    try {
      const response = await updateTodo(todoId, updatedData);
      setTodos(todos.map(todo => 
        todo._id === todoId ? response.data.todo : todo
      ));
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  const filteredUsers = users.filter(user => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (todo.user?.userName && todo.user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/todos/manage')}
            className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            Back to Todos
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm sm:text-base">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex space-x-1 sm:space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                activeTab === 'users' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                activeTab === 'todos' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Todos
            </button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64 text-sm sm:text-base"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : activeTab === 'users' ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">{user.userName}</td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">{user.email}</td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-500 hover:text-red-700 mr-2 text-sm sm:text-base"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                      <tr key={todo._id}>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                          <div className="font-medium">{todo.title}</div>
                          <div className="sm:hidden text-gray-500 text-xs mt-1 truncate">
                            {todo.description}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm sm:text-base">
                          {todo.description}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                          {todo.user?.userName || 'Unknown'}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                          <select
                            value={todo.status}
                            onChange={(e) => handleUpdateTodo(todo._id, { status: e.target.value })}
                            className={`text-xs px-2 py-1 rounded-full ${
                              todo.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : todo.status === 'in_progress'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                          <div className="flex space-x-1 sm:space-x-2">
                            <button
                              onClick={() => navigate(`/todos/edit/${todo._id}`)}
                              className="text-yellow-500 hover:text-yellow-700 text-sm sm:text-base"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTodo(todo._id)}
                              className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No todos found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;