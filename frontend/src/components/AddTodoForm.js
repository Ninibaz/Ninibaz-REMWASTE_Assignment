import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="form-control"
        data-cy="add-todo-input"
      />
      <button 
        type="submit" 
        className="btn btn-primary"
        data-cy="add-todo-button"
      >
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;