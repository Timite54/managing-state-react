import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { Task } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { createTask, getTaskCounts } from './utils/taskUtils';

function App() {
  // Use localStorage to persist tasks
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  
  // State for filtering tasks
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Get counts for filter badges
  const taskCount = getTaskCounts(tasks);

  // Add a new task
  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask = createTask(taskData.title, taskData.description);
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion status
  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Edit a task
  const handleEditTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <CheckSquare className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">TaskFlow</h1>
          </div>
          <p className="text-gray-600">
            Stay organized and boost your productivity
          </p>
        </header>
        
        {/* Main Content */}
        <main>
          {/* Task form */}
          <TaskForm onSubmit={handleAddTask} />
          
          {/* Filter */}
          <TaskFilter 
            filter={filter} 
            onFilterChange={setFilter}
            taskCount={taskCount}
          />
          
          {/* Task list */}
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            filter={filter}
          />
          
          {/* Task stats */}
          {tasks.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                {taskCount.completed} completed / {taskCount.active} remaining
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>TaskFlow - Your simple task management solution</p>
        </footer>
      </div>
    </div>
  );
}

export default App;