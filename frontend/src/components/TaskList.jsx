import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, categories, onUpdate, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to get started!</p>;
  }

  return (
    <div>
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
