import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { ListX } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
  filter: 'all' | 'active' | 'completed';
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  filter
}) => {
  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Sort tasks by creation date (newest first)
  const sortedTasks = [...filteredTasks].sort((a, b) => b.createdAt - a.createdAt);

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <ListX size={48} className="mb-2" />
        <p className="text-lg">No tasks found</p>
        <p className="text-sm">
          {filter === 'all' 
            ? "Add a new task to get started" 
            : filter === 'active' 
              ? "No active tasks found" 
              : "No completed tasks found"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;