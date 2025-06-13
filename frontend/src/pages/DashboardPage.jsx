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

  if (loading) return <p className="text-gray-700">Loading tasks...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Añadir Nueva Tarea</h2>
        <TaskForm categories={categories} onSubmit={handleCreateTask} />
      </div>

      <hr className="my-4" />

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Tus Tareas</h2>
        <TaskList 
          tasks={tasks} 
          categories={categories}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </div>
    </div>
  );
}
