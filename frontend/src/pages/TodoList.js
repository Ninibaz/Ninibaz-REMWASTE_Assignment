import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (text) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/items',
        { text, completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      const todo = todos.find(t => t._id === id);
      const updatedTodo = { ...todo, completed: !completed };
      
      await axios.put(
        `http://localhost:5000/api/items/${id}`,
        updatedTodo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setTodos(todos.map(t => t._id === id ? { ...t, completed: !completed } : t));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error(err);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (id, text) => {
    try {
      const token = localStorage.getItem('token');
      const todo = todos.find(t => t._id === id);
      const updatedTodo = { ...todo, text };
      
      await axios.put(
        `http://localhost:5000/api/items/${id}`,
        updatedTodo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setTodos(todos.map(t => t._id === id ? { ...t, text } : t));
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="card" data-cy="todo-list">
      <h2>My Todos</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <AddTodoForm onAddTodo={handleAddTodo} />
      
      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTodo}
              isEditing={editingTodo && editingTodo._id === todo._id}
              onUpdate={handleUpdateTodo}
              onCancelEdit={cancelEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;