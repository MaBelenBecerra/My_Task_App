import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase'; // For categories, will be refactored later
import * as taskService from '../services/taskService';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch categories (can be moved to its own service later)
      const { data: catData, error: catError } = await supabase
        .from('categorias')
        .select('*')
        .eq('user_id', user.id);
      if (catError) throw catError;
      setCategories(catData);

      // Fetch tasks using the service
      const taskData = await taskService.getTasks(user.id);
      setTasks(taskData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData, user.id);
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleToggleTask = async (id, currentState) => {
    try {
      await taskService.toggleTaskStatus(id, currentState);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, estado: currentState } : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-secondary text-xl animate-pulse">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-secondary mb-8">Dashboard</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Añadir Nueva Tarea</h2>
          <TaskForm categories={categories} onSubmit={handleCreateTask} />
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Tus Tareas</h2>
          <TaskList 
            tasks={tasks} 
            categories={categories}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        </div>
      </div>
    </div>
  );
}
