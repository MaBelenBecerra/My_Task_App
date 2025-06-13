import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch categories first
      const { data: catData, error: catError } = await supabase
        .from('categorias')
        .select('*')
        .eq('user_id', user.id);
      if (catError) throw catError;
      setCategories(catData);

      // Fetch tasks with category info
      const { data: taskData, error: taskError } = await supabase
        .from('tareas')
        .select('*, categorias ( nombre )')
        .eq('user_id', user.id)
        .order('fecha', { ascending: true });

      if (taskError) throw taskError;
      setTasks(taskData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { data, error } = await supabase
        .from('tareas')
        .insert([{ ...taskData, user_id: user.id, titulo: taskData.title, descripcion: taskData.description, fecha: taskData.dueDate, categoria_id: taskData.categoryId }])
        .select('*, categorias ( nombre )');
      
      if (error) throw error;
      setTasks([...tasks, data[0]]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const { data, error } = await supabase
        .from('tareas')
        .update({ titulo: taskData.title, descripcion: taskData.description, fecha: taskData.dueDate, categoria_id: taskData.categoryId })
        .eq('id', id)
        .select('*, categorias ( nombre )');

      if (error) throw error;
      fetchData(); // Refetch all data to ensure consistency
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const { error } = await supabase.from('tareas').delete().eq('id', id);
        if (error) throw error;
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleToggleTask = async (id, currentState) => {
    try {
      const { error } = await supabase
        .from('tareas')
        .update({ estado: currentState })
        .eq('id', id);

      if (error) throw error;
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, estado: currentState } : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h2>Add a New Task</h2>
      <TaskForm categories={categories} onSubmit={handleCreateTask} />

      <hr />

      <h2>Your Tasks</h2>
      <TaskList 
        tasks={tasks} 
        categories={categories}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
      />
    </div>
  );
}
