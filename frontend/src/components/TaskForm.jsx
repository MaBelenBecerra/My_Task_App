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
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategoryId(categories.length > 0 ? categories[0].id : '');
    }
  }, [initialTask, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !categoryId) {
      alert('Por favor, completa el título y la categoría.');
      return;
    }
    onSubmit({ title, description, dueDate, categoryId });
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-gray-500 mb-1">Título</label>
        <input
          id="task-title"
          type="text"
          placeholder="Ej: Ir al gimnasio"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>
      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-gray-500 mb-1">Descripción</label>
        <textarea
          id="task-description"
          placeholder="Añade más detalles..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows="3"
        />
      </div>
      <div>
        <label htmlFor="task-dueDate" className="block text-sm font-medium text-gray-500 mb-1">Fecha Límite</label>
        <input
          id="task-dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="task-category" className="block text-sm font-medium text-gray-500 mb-1">Categoría</label>
        <select
          id="task-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
        className="w-full bg-secondary hover:bg-accent text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
      >
        {initialTask ? 'Actualizar Tarea' : 'Añadir Tarea'}
      </button>
    </form>
  );
}
