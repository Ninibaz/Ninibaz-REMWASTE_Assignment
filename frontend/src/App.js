import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div className="container">
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;