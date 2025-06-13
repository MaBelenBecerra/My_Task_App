import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function TaskItem({ task, categories, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedData) => {
    onUpdate(task.id, updatedData);
    setIsEditing(false);
  };

  const categoryName = categories.find(cat => cat.id === task.categoria_id)?.nombre || 'Sin Categoría';

  return (
    <div className={`p-5 rounded-2xl shadow-lg transition-all duration-300 ${task.estado ? 'bg-gray-50 opacity-70' : 'bg-white'}`}>
      {isEditing ? (
        <TaskForm
          categories={categories}
          onSubmit={handleUpdate}
          initialTask={task}
        />
      ) : (
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-bold text-lg ${task.estado ? 'line-through text-gray-500' : 'text-text-dark'}`}>
              {task.titulo}
            </h3>
            <span className="bg-primary/50 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
              {categoryName}
            </span>
          </div>
          <p className={`text-sm text-gray-600 mb-4 ${task.estado ? 'line-through' : ''}`}>
            {task.descripcion || 'Esta tarea no tiene descripción.'}
          </p>
          <div className="text-xs text-gray-500">
            <span>Vence: {task.fecha ? new Date(task.fecha).toLocaleDateString() : 'Sin fecha'}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onToggle(task.id, !task.estado)}
          className={`text-xs font-semibold px-4 py-2 rounded-full transition-colors ${task.estado ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
          {task.estado ? 'Pendiente' : 'Completar'}
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-semibold px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs font-semibold px-4 py-2 rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors">
          Eliminar
        </button>
      </div>
    </div>
  );
}
