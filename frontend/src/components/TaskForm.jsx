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
      alert('El título y la categoría son obligatorios.');
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-text-dark">Título</label>
        <input
          id="task-title"
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-text-dark">Descripción</label>
        <textarea
          id="task-description"
          placeholder="Añade una descripción..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
        />
      </div>
      <div>
        <label htmlFor="task-dueDate" className="block text-sm font-medium text-text-dark">Fecha de Vencimiento</label>
        <input
          id="task-dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="task-category" className="block text-sm font-medium text-text-dark">Categoría</label>
        <select
          id="task-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-1 w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        className="w-full bg-primary hover:bg-secondary text-text-light font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
      >
        {initialTask ? 'Actualizar Tarea' : 'Añadir Tarea'}
      </button>
    </form>
  );
}
