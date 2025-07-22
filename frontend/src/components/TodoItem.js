import React, { useState } from 'react';

function TodoItem({ 
  todo, 
  onDelete, 
  onToggleComplete, 
  onEdit, 
  isEditing, 
  onUpdate, 
  onCancelEdit 
}) {
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onUpdate(todo._id, editText);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`} data-cy="todo-item">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="form-control"
            autoFocus
            data-cy="edit-input"
          />
          <div className="actions">
            <button type="submit" className="btn btn-primary" data-cy="update-button">Update</button>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={onCancelEdit}
              data-cy="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-text" onClick={() => onToggleComplete(todo._id, todo.completed)}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => onToggleComplete(todo._id, todo.completed)}
              data-cy="todo-checkbox"
            />
            <span data-cy="todo-text">{todo.text}</span>
          </div>
          <div className="actions">
            <button 
              className="btn btn-warning" 
              onClick={() => onEdit(todo)}
              data-cy="edit-button"
            >
              Edit
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => onDelete(todo._id)}
              data-cy="delete-button"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;