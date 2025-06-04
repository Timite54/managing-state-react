import React, { useState } from 'react';
import { Task } from '../types';
import { CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';
import TaskForm from './TaskForm';
import ConfirmDialog from './ConfirmDialog';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleEdit = (values: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    onEdit(task.id, values);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="mb-4 animate-fadeIn">
        <TaskForm
          initialValues={task}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          submitLabel="Save Changes"
        />
      </div>
    );
  }

  return (
    <>
      <div 
        className={`bg-white rounded-lg shadow-md p-4 mb-4 transition-all duration-200 hover:shadow-lg ${
          task.completed ? 'border-l-4 border-green-500 bg-green-50' : 'border-l-4 border-blue-500'
        }`}
      >
        <div className="flex items-start">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mr-3 mt-1 focus:outline-none ${
              task.completed ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'
            } transition-colors`}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? 
              <CheckCircle className="h-5 w-5" /> : 
              <Circle className="h-5 w-5" />
            }
          </button>
          
          <div className="flex-1">
            <h3 
              className={`text-lg font-medium ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <p 
              className={`mt-1 text-sm ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              Added: {new Date(task.createdAt).toLocaleString()}
            </div>
          </div>
          
          <div className="flex space-x-2 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-500 transition-colors focus:outline-none"
              aria-label="Edit task"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
              aria-label="Delete task"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {showConfirmDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this task?"
          confirmLabel="Delete"
          onConfirm={() => {
            onDelete(task.id);
            setShowConfirmDelete(false);
          }}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </>
  );
};

export default TaskItem;