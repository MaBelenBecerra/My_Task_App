import { supabase } from './supabase';

export const getTasks = async (userId) => {
  const { data, error } = await supabase
    .from('tareas')
    .select('*, categorias ( nombre )')
    .eq('user_id', userId)
    .order('fecha', { ascending: true });

  if (error) throw error;
  return data;
};

export const createTask = async (taskData, userId) => {
  const payload = {
    titulo: taskData.title,
    descripcion: taskData.description,
    fecha: taskData.dueDate,
    categoria_id: taskData.categoryId,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from('tareas')
    .insert([payload])
    .select('*, categorias ( nombre )')
    .single();

  if (error) throw error;
  return data;
};

export const updateTask = async (id, taskData) => {
  const payload = {
    titulo: taskData.title,
    descripcion: taskData.description,
    fecha: taskData.dueDate,
    categoria_id: taskData.categoryId,
  };

  const { data, error } = await supabase
    .from('tareas')
    .update(payload)
    .eq('id', id)
    .select('*, categorias ( nombre )')
    .single();

  if (error) throw error;
  return data;
};

export const deleteTask = async (id) => {
  const { error } = await supabase.from('tareas').delete().eq('id', id);
  if (error) throw error;
};

export const toggleTaskStatus = async (id, status) => {
  const { error } = await supabase
    .from('tareas')
    .update({ estado: status })
    .eq('id', id);

  if (error) throw error;
};
