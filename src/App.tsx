import React, { useState, useEffect, useRef } from 'react';
import { Task, FilterOptions, SortOption } from './types/Task';
import { TaskItem } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';
import { FilterModal } from './components/FilterModal';
import { SortModal } from './components/SortModal';
import { loadTasks, saveTasks } from './utils/taskStorage';
import { filterTasks, sortTasks } from './utils/taskFilters';
import { Colors } from './constants/Colors';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const isInitialLoad = useRef(true);
  const [activeTab, setActiveTab] = useState<'todo' | 'completed'>('todo');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Separate filter and sort states for each tab
  const [todoFilters, setTodoFilters] = useState<FilterOptions>({});
  const [completedFilters, setCompletedFilters] = useState<FilterOptions>({});
  const [todoSortOption, setTodoSortOption] = useState<SortOption | null>(null);
  const [completedSortOption, setCompletedSortOption] = useState<SortOption | null>(null);

  // Get current filters and sort based on active tab
  const currentFilters = activeTab === 'todo' ? todoFilters : completedFilters;
  const currentSortOption = activeTab === 'todo' ? todoSortOption : completedSortOption;

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (tasks.length >= 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, status: t.status === 'pending' ? 'done' : 'pending' }
        : t
    ));
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    if (activeTab === 'todo') {
      setTodoFilters(newFilters);
    } else {
      setCompletedFilters(newFilters);
    }
  };

  const handleApplySort = (newSort: SortOption | null) => {
    if (activeTab === 'todo') {
      setTodoSortOption(newSort);
    } else {
      setCompletedSortOption(newSort);
    }
  };

  const handleTagClick = (tag: string) => {
    const newFilters = {
      ...currentFilters,
      tags: [tag]
    };
    
    if (activeTab === 'todo') {
      setTodoFilters(newFilters);
    } else {
      setCompletedFilters(newFilters);
    }
  };

  const getFilteredAndSortedTasks = () => {
    const statusFilteredTasks = tasks.filter(task => 
      activeTab === 'todo' ? task.status === 'pending' : task.status === 'done'
    );
    
    let filteredTasks = filterTasks(statusFilteredTasks, currentFilters);
    
    if (currentSortOption) {
      filteredTasks = sortTasks(filteredTasks, currentSortOption);
    }
    
    return filteredTasks;
  };

  const getAllTags = () => {
    const allTags = tasks.flatMap(task => task.tags);
    return [...new Set(allTags)];
  };

  const displayedTasks = getFilteredAndSortedTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
            Meowly Tasks
            <i className="fas fa-cat" />
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('todo')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium font-baloo transition-colors ${
              activeTab === 'todo'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            To-Do ({tasks.filter(t => t.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium font-baloo transition-colors ${
              activeTab === 'completed'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Completed ({tasks.filter(t => t.status === 'done').length})
          </button>
        </div>
      </div>

      {/* Filter and Sort Buttons */}
      <div className="max-w-md mx-auto px-4 mb-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
          >
            <i className="fas fa-filter text-gray-600" />
          </button>
          <button
            onClick={() => setIsSortOpen(true)}
            className="w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 flex items-center justify-center"
          >
            <i className="fas fa-sort text-gray-600" />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-md mx-auto px-4 pb-20">
        {displayedTasks.length === 0 ? (
          <div className="text-center py-12">
            <i className={`fas ${activeTab === 'todo' ? 'fa-paw' : 'fa-paw'} text-4xl text-gray-300 mb-4`} />
            <p className="text-gray-500 font-nunito font-medium text-base">
              {activeTab === 'todo' ? 'No mice to chase! Enjoy a nap.'  : 'No mice to chase! Enjoy a nap'} 
            </p>
            <p className="text-base text-gray-400 mt-1 font-nunito font-medium">
              {activeTab === 'todo' ? 'Tap the + button to add a new task' : 'Complete some tasks to see them here'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => {
          setEditingTask(null);
          setIsFormOpen(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-colors flex items-center justify-center"
        style={{ 
          backgroundColor: Colors.brand.primary,
          color: Colors.utility.secondaryBackground
        }}
      >
        <i className="fas fa-feather-pointed text-xl" />
      </button>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={currentFilters}
        availableTags={getAllTags()}
      />

      {/* Sort Modal */}
      <SortModal
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        onApplySort={handleApplySort}
        currentSort={currentSortOption}
      />
    </div>
  );
}

export default App;