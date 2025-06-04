import { Task } from '../types';

// Generate unique ID for tasks
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Create a new task
export const createTask = (title: string, description: string): Task => {
  return {
    id: generateId(),
    title,
    description,
    completed: false,
    createdAt: Date.now()
  };
};

// Get task counts by status
export const getTaskCounts = (tasks: Task[]) => {
  const all = tasks.length;
  const active = tasks.filter(task => !task.completed).length;
  const completed = tasks.filter(task => task.completed).length;
  
  return { all, active, completed };
};