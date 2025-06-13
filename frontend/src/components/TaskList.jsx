import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, categories, onUpdate, onDelete, onToggle }) {
  return (
    <div className="space-y-5">
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
