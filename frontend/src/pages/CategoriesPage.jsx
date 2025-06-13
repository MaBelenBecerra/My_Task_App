import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .eq('user_id', user.id)
        .order('nombre', { ascending: true });

      if (error) throw error;
      setCategories(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('categorias')
        .insert([{ nombre: newCategoryName, user_id: user.id }])
        .select();

      if (error) throw error;
      setCategories([...categories, data[0]]);
      setNewCategoryName('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('¿Estás segura de que quieres eliminar esta categoría? Esto también eliminará las tareas asociadas.')) {
      try {
        const { error } = await supabase.from('categorias').delete().eq('id', id);
        if (error) throw error;
        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleUpdateCategory = async (id) => {
    try {
      const { data, error } = await supabase
        .from('categorias')
        .update({ nombre: editingCategoryName })
        .eq('id', id)
        .select();

      if (error) throw error;
      fetchCategories(); // Refetch to show updated data
      setEditingCategoryId(null);
      setEditingCategoryName('');
    } catch (error) {
      setError(error.message);
    }
  };

  const startEditing = (category) => {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.nombre);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-secondary text-xl animate-pulse">Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-secondary mb-8">Gestionar Categorías</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-text-dark mb-4">Añadir Nueva Categoría</h2>
        <form onSubmit={handleCreateCategory} className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Nombre de la nueva categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-grow w-full px-4 py-2 text-text-dark bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-text-light font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 shrink-0"
          >
            Añadir
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-text-dark mb-4">Tus Categorías</h2>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.id} className="p-3 rounded-lg bg-gray-50 flex items-center justify-between transition-all">
              {editingCategoryId === category.id ? (
                <div className="flex-grow flex items-center space-x-2">
                  <input
                    type="text"
                    value={editingCategoryName}
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    className="flex-grow w-full px-4 py-2 text-text-dark bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button onClick={() => handleUpdateCategory(category.id)} className="text-xs font-semibold px-3 py-1 rounded-md bg-green-100 text-green-800 hover:bg-green-200 transition-colors shrink-0">Guardar</button>
                  <button onClick={() => setEditingCategoryId(null)} className="text-xs font-semibold px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors shrink-0">Cancelar</button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-text-dark">{category.nombre}</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => startEditing(category)} className="text-xs font-semibold px-3 py-1 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">Editar</button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="text-xs font-semibold px-3 py-1 rounded-md bg-red-100 text-red-800 hover:bg-red-200 transition-colors">Eliminar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        {categories.length === 0 && (
          <div className="text-center py-6">
            <p className="text-text-dark">No has creado ninguna categoría todavía.</p>
          </div>
        )}
      </div>
    </div>
  );
}
