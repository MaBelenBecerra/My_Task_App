import React, { useState, useEffect } from 'react';

export default function TaskForm({ categories, onSubmit, initialTask = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.titulo || '');
      setDescription(initialTask.descripcion || '');
      setDueDate(initialTask.fecha ? new Date(initialTask.fecha).toISOString().split('T')[0] : '');
      setCategoryId(initialTask.categoria_id || '');
    } else {
      // Set default category if available and not editing
      if (categories.length > 0) {
        setCategoryId(categories[0].id);
      }
    }
  }, [initialTask, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !categoryId) {
      alert('Title and category are required.');
      return;
    }
    onSubmit({ title, description, dueDate, categoryId });
    // Reset form if not editing
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="" disabled>Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
      <button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}
