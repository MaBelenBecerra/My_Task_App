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
      const { data, error } = await supabase.from('categorias').select('*').eq('user_id', user.id).order('nombre', { ascending: true });
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
      const { data, error } = await supabase.from('categorias').insert([{ nombre: newCategoryName, user_id: user.id }]).select();
      if (error) throw error;
      setCategories([...categories, data[0]]);
      setNewCategoryName('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('¿Estás segura? Esto eliminará la categoría y todas sus tareas asociadas.')) {
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
      await supabase.from('categorias').update({ nombre: editingCategoryName }).eq('id', id).select();
      fetchCategories();
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-dark">Mis Categorías</h1>
        <p className="text-lg text-gray-600 mt-2">Organiza tus tareas agrupándolas por temas.</p>
        <div className="w-32 h-1 mx-auto mt-4 bg-primary"></div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">¡Ups! Algo salió mal</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 text-center">Nueva Categoría</h2>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <input
              type="text"
              placeholder="Ej: Trabajo"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-3 text-text-dark bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-accent text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
            >
              Añadir Categoría
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 text-center">Mi Lista de Categorías</h2>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category.id} className="p-4 rounded-xl bg-gray-50 flex items-center justify-between transition-all">
                {editingCategoryId === category.id ? (
                  <div className="flex-grow flex items-center space-x-2">
                    <input
                      type="text"
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      className="flex-grow w-full px-4 py-2 text-text-dark bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={() => handleUpdateCategory(category.id)} className="text-xs font-semibold px-4 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors shrink-0">Guardar</button>
                    <button onClick={() => setEditingCategoryId(null)} className="text-xs font-semibold px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors shrink-0">Cancelar</button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-text-dark">{category.nombre}</span>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => startEditing(category)} className="text-xs font-semibold px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Editar</button>
                      <button onClick={() => handleDeleteCategory(category.id)} className="text-xs font-semibold px-4 py-2 rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors">Eliminar</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          {categories.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Aún no tienes categorías.</p>
              <p className="text-gray-400 mt-2">Crea tu primera categoría para empezar a organizar tus tareas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
