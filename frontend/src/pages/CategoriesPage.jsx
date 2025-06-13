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
    if (window.confirm('Are you sure you want to delete this category?')) {
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

  if (loading) return <p className="text-gray-700">Loading categories...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Categories</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <form onSubmit={handleCreateCategory} className="mb-4">
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button type="submit"  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Category</button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2 p-2 rounded shadow-sm bg-white flex items-center justify-between">
            {editingCategoryId === category.id ? (
              <div className="flex items-center">
                <input 
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <button onClick={() => handleUpdateCategory(category.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Save</button>
                <button onClick={() => setEditingCategoryId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-4">{category.nombre}</span>
                <div>
                  <button onClick={() => startEditing(category)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Edit</button>
                  <button onClick={() => handleDeleteCategory(category.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
