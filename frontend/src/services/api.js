import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },
  
  getTodos: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/items`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  addTodo: async (todo) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/items`, todo, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  updateTodo: async (id, todo) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/items/${id}`, todo, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  deleteTodo: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default api;