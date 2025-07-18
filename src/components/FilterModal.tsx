import React, { useState, useEffect } from 'react';
import { FilterOptions, Priority } from '../types/Task';
import { Colors } from '../constants/Colors';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  availableTags: string[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
  availableTags
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  const handlePriorityToggle = (priority: Priority) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority];
    
    setFilters({
      ...filters,
      priority: newPriorities.length > 0 ? newPriorities : undefined
    });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setFilters({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({});
    onApplyFilters({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
        style={{ backgroundColor: Colors.utility.primaryBackground }}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Filter</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <i className="fas fa-times text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {/* Priority Filter */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Priority</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as Priority[]).map((priority) => (
                <button
                  key={priority}
                  onClick={() => handlePriorityToggle(priority)}
                  className="p-3 rounded-lg border-2 transition-colors"
                  style={{
                    backgroundColor: filters.priority?.includes(priority) 
                      ? (priority === 'high' ? '#ef7385' : priority === 'medium' ? '#ffc75b' : '#B4DD7F')
                      : Colors.utility.secondaryBackground,
                    borderColor: priority === 'high' ? '#ef7385' : priority === 'medium' ? '#ffc75b' : '#B4DD7F',
                    color: filters.priority?.includes(priority) 
                      ? Colors.utility.secondaryBackground 
                      : (priority === 'high' ? '#ef7385' : priority === 'medium' ? '#ffc75b' : '#B4DD7F')
                  }}
                >
                  <div className="text-center">
                    <i 
                      className={`fas ${
                        priority === 'high' ? 'fa-radiation' :
                        priority === 'medium' ? 'fa-triangle-exclamation' : 'fa-exclamation'
                      } text-lg mb-1`}
                      style={{
                        color: filters.priority?.includes(priority) 
                          ? Colors.utility.secondaryBackground 
                          : (priority === 'high' ? '#ef7385' : priority === 'medium' ? '#ffc75b' : '#B4DD7F')
                      }}
                    />
                    <p 
                      className="text-base font-bold capitalize"
                      style={{
                        color: filters.priority?.includes(priority) 
                          ? Colors.utility.secondaryBackground 
                          : (priority === 'high' ? '#ef7385' : priority === 'medium' ? '#ffc75b' : '#B4DD7F')
                      }}
                    >
                      {priority}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Tags</h3>
            
            {availableTags.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-1">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className="px-3 py-2 text-sm rounded-full border transition-colors"
                      style={{
  backgroundColor: filters.tags?.includes(tag)
    ? Colors.brand.primary
    : Colors.utility.secondaryBackground,
  borderColor: filters.tags?.includes(tag)
    ? Colors.brand.primary
    : Colors.utility.secondaryText,
  borderWidth: 1,
  color: filters.tags?.includes(tag)
    ? Colors.utility.secondaryBackground
    : Colors.utility.secondaryText,
}}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm" style={{ color: Colors.utility.secondaryText }}>
                  Add tags to your notes to use this option
                </p>
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Date</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      start: e.target.value || undefined
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: Colors.utility.secondaryBackground,
                    color: Colors.utility.primaryText
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      end: e.target.value || undefined
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ 
                    backgroundColor: Colors.utility.secondaryBackground,
                    color: Colors.utility.primaryText
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClear}
            className="flex-1 py-2 px-4 border-2 rounded-lg transition-colors font-baloo text-lg font-bold"
            style={{ 
              backgroundColor: Colors.utility.secondaryBackground,
              color: Colors.utility.secondaryText,
              borderColor: Colors.utility.secondaryText
            }}
          >
            CLEAR
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 px-4 border-2 rounded-lg transition-colors font-baloo text-lg font-bold"
            style={{ 
              backgroundColor: Colors.utility.secondaryBackground,
              color: Colors.brand.tertiary,
              borderColor: Colors.brand.tertiary
            }}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};