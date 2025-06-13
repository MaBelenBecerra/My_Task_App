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

  if (loading) return <p>Loading categories...</p>;

  return (
    <div>
      <h1>Categories</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {editingCategoryId === category.id ? (
              <div>
                <input 
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                />
                <button onClick={() => handleUpdateCategory(category.id)}>Save</button>
                <button onClick={() => setEditingCategoryId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {category.nombre}
                <button onClick={() => startEditing(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
