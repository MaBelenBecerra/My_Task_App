import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
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
      const { data: catData, error: catError } = await supabase.from('categorias').select('*').eq('user_id', user.id);
      if (catError) throw catError;
      setCategories(catData);

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
    if (window.confirm('¿Estás segura de que quieres eliminar esta tarea?')) {
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
      setTasks(tasks.map((task) => (task.id === id ? { ...task, estado: currentState } : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-secondary text-xl animate-pulse">Cargando tus tareas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-dark">Mis Tareas</h1>
        <p className="text-lg text-gray-600 mt-2">Organiza tu día y mantente productiva.</p>
        <div className="w-32 h-1 mx-auto mt-4 bg-primary"></div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">¡Ups! Algo salió mal</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 text-center">Crear Nueva Tarea</h2>
          <TaskForm categories={categories} onSubmit={handleCreateTask} />
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-text-dark mb-6 text-center">Mi Lista de Tareas</h2>
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              categories={categories}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">¡Felicidades! No tienes tareas pendientes.</p>
              <p className="text-gray-400 mt-2">Añade una nueva tarea para empezar a organizarte.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
