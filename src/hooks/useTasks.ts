import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStats } from '../types/task';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load tasks from Supabase
  const loadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading tasks:', error);
      } else {
        const formattedTasks: Task[] = data.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description || undefined,
          completed: task.completed,
          priority: task.priority,
          category: task.category,
          dueDate: task.due_date || undefined,
          createdAt: task.created_at,
          completedAt: task.completed_at || undefined,
        }));
        setTasks(formattedTasks);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: taskData.title,
          description: taskData.description || null,
          completed: taskData.completed,
          priority: taskData.priority,
          category: taskData.category,
          due_date: taskData.dueDate || null,
          completed_at: taskData.completedAt || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding task:', error);
      } else {
        const newTask: Task = {
          id: data.id,
          title: data.title,
          description: data.description || undefined,
          completed: data.completed,
          priority: data.priority,
          category: data.category,
          dueDate: data.due_date || undefined,
          createdAt: data.created_at,
          completedAt: data.completed_at || undefined,
        };
        setTasks(prev => [newTask, ...prev]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description || null,
          completed: updates.completed,
          priority: updates.priority,
          category: updates.category,
          due_date: updates.dueDate || null,
          completed_at: updates.completedAt || null,
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating task:', error);
      } else {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, ...updates } : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting task:', error);
      } else {
        setTasks(prev => prev.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskComplete = async (id: string) => {
    if (!user) return;

    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updates = {
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : undefined,
    };

    await updateTask(id, updates);
  };

  const getTaskStats = (): TaskStats => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(
      task => !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
    ).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate,
    };
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    getTaskStats,
    loadTasks,
  };
};