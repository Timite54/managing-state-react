import React from 'react';
import { ListFilter } from 'lucide-react';

interface TaskFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  taskCount: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange, taskCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center mb-3">
        <ListFilter className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-800">Filter Tasks</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm flex items-center transition-all ${
            filter === 'all' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800">
            {taskCount.all}
          </span>
        </button>
        
        <button
          onClick={() => onFilterChange('active')}
          className={`px-4 py-2 rounded-md text-sm flex items-center transition-all ${
            filter === 'active' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800">
            {taskCount.active}
          </span>
        </button>
        
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-4 py-2 rounded-md text-sm flex items-center transition-all ${
            filter === 'completed' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-800">
            {taskCount.completed}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;