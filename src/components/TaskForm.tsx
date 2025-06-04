import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  initialValues?: Partial<Task>;
  onCancel?: () => void;
  submitLabel?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialValues,
  onCancel,
  submitLabel = 'Add Task'
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [errors, setErrors] = useState<{title?: string; description?: string}>({});

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || '');
      setDescription(initialValues.description || '');
    }
  }, [initialValues]);

  const validate = (): boolean => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({ 
        title: title.trim(), 
        description: description.trim() 
      });
      
      if (!initialValues) {
        // Only clear form on new task creation, not on edit
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-200 ease-in-out"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialValues ? 'Edit Task' : 'Create New Task'}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            errors.title 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
          }`}
          placeholder="What needs to be done?"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-all ${
            errors.description 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
          }`}
          placeholder="Add details about this task..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;