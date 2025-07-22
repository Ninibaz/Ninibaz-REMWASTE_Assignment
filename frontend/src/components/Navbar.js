import React from 'react';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <h1>Todo App</h1>
      <button className="btn btn-danger" onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;