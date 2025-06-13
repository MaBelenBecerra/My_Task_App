import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskItem({ task, categories, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedData) => {
    onUpdate(task.id, updatedData);
    setIsEditing(false);
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm transition-all duration-300 border-l-4 ${task.estado ? 'bg-gray-50 border-green-400' : 'bg-white border-primary'}`}>
      {isEditing ? (
        <TaskForm 
          categories={categories} 
          onSubmit={handleUpdate} 
          initialTask={task} 
        />
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h3 className={`font-bold text-lg ${task.estado ? 'line-through text-gray-400' : 'text-text-dark'}`}>
              {task.titulo}
            </h3>
            <span className="bg-pink-100 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {task.categorias?.nombre || 'Sin categoría'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{task.descripcion || 'Sin descripción'}</p>
          <div className="text-xs text-gray-500 mt-2">
            <span>Vence: {task.fecha ? new Date(task.fecha).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
        <button 
          onClick={() => onToggle(task.id, !task.estado)}
          className={`text-xs font-semibold px-3 py-1 rounded-md transition-colors ${task.estado ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
          {task.estado ? 'Marcar Pendiente' : 'Marcar Completa'}
        </button>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-semibold px-3 py-1 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-xs font-semibold px-3 py-1 rounded-md bg-red-100 text-red-800 hover:bg-red-200 transition-colors">
          Eliminar
        </button>
      </div>
    </div>
  );
}
