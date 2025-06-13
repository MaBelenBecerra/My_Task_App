import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskItem({ task, categories, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedData) => {
    onUpdate(task.id, updatedData);
    setIsEditing(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {isEditing ? (
        <TaskForm 
          categories={categories} 
          onSubmit={handleUpdate} 
          initialTask={task} 
        />
      ) : (
        <div>
          <h3 style={{ textDecoration: task.estado ? 'line-through' : 'none' }}>
            {task.titulo}
          </h3>
          <p>{task.descripcion}</p>
          <p>Due: {task.fecha ? new Date(task.fecha).toLocaleDateString() : 'N/A'}</p>
          <p>Category: {task.categorias?.nombre || 'Uncategorized'}</p>
          <p>Status: {task.estado ? 'Completed' : 'Pending'}</p>
        </div>
      )}

      <div>
        <button onClick={() => onToggle(task.id, !task.estado)}>
          {task.estado ? 'Mark as Pending' : 'Mark as Complete'}
        </button>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
