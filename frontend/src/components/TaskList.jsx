import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, categories, onUpdate, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-text-dark font-semibold">Aún no tienes tareas. ¡Añade una para empezar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          categories={categories}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
