import React, { useState, useEffect } from 'react';
import { Task, Priority } from '../types/Task';
import { generateId } from '../utils/taskStorage';
import { Colors } from '../constants/Colors';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  editingTask?: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSave, editingTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    date: '',
    time: '',
    tags: '',
    priority: 'medium' as Priority
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        notes: editingTask.notes || '',
        date: editingTask.date || '',
        time: editingTask.time || '',
        tags: editingTask.tags.join(', '),
        priority: editingTask.priority
      });
    } else {
      setFormData({
        title: '',
        notes: '',
        date: '',
        time: '',
        tags: '',
        priority: 'medium'
      });
    }
    setErrors({});
  }, [editingTask, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.time && !formData.date) {
      newErrors.date = 'Date is required when time is specified';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const task: Task = {
      id: editingTask?.id || generateId(),
      title: formData.title.trim(),
      notes: formData.notes.trim() || undefined,
      date: formData.date || undefined,
      time: formData.time || undefined,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),
      priority: formData.priority,
      status: editingTask?.status || 'pending',
      createdAt: editingTask?.createdAt || new Date().toISOString()
    };

    onSave(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50"
      onClick={onClose}
    >
      <div 
        className="w-full max-h-[80vh] rounded-t-2xl overflow-hidden"
        style={{ backgroundColor: Colors.utility.primaryBackground }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingTask ? 'Edit Task' : 'New Task'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <i className="fas fa-times text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-baloo">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter task title"
              style={{ 
                backgroundColor: Colors.utility.secondaryBackground,
                color: Colors.utility.primaryText
              }}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-baloo">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Add notes (optional)"
              rows={2}
              style={{ 
                backgroundColor: Colors.utility.secondaryBackground,
                color: Colors.utility.primaryText
              }}
            />
          </div>

          {/* Date and Time */}
          <div className="flex justify-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-baloo text-center">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-baloo text-base font-bold cursor-pointer ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
                style={{ 
                  backgroundColor: Colors.utility.secondaryBackground,
                  color: Colors.utility.primaryText,
                  width: '150px'
                }}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 font-baloo text-center">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-baloo text-base font-bold cursor-pointer"
                style={{ 
                  backgroundColor: Colors.utility.secondaryBackground,
                  color: Colors.utility.primaryText,
                  width: '150px'
                }}
                step="300"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-baloo">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas"
              style={{ 
                backgroundColor: Colors.utility.secondaryBackground,
                color: Colors.utility.primaryText
              }}
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-baloo">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as Priority[]).map((priority) => {
                const priorityColors = {
                  high: '#ef7385',
                  medium: '#ffc75b',
                  low: '#B4DD7F'
                };
                const isSelected = formData.priority === priority;
                
                return (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFfaormData({ ...formData, priority })}
                    className="p-3 rounded-lg border-2 transition-colors"
                    style={{
                      backgroundColor: isSelected ? priorityColors[priority] : Colors.utility.secondaryBackground,
                      borderColor: priorityColors[priority],
                      color: isSelected ? Colors.utility.secondaryBackground : priorityColors[priority]
                    }}
                >
                  <div className="text-center">
                    <i 
                      className={`fas ${
                        priority === 'high' ? 'fa-radiation' :
                        priority === 'medium' ? 'fa-triangle-exclamation' : 'fa-exclamation'
                      } mb-1`}
                        style={{
                          color: isSelected ? Colors.utility.secondaryBackground : priorityColors[priority]
                        }}
                    />
                      <p 
                        className="text-base font-bold capitalize"
                        style={{
                          color: isSelected ? Colors.utility.secondaryBackground : priorityColors[priority]
                        }}
                      >
                        {priority}
                      </p>
                  </div>
                </button>
                );
              })}
            </div>
          </div>
          </form>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full max-w-[200px] mx-auto py-3 rounded-lg font-bold transition-colors border-2 font-baloo text-lg block"
            style={{ 
              backgroundColor: Colors.utility.secondaryBackground,
              color: Colors.brand.tertiary,
              borderColor: Colors.brand.tertiary
            }}
          >
            {editingTask ? 'UPDATE' : 'ADD'}
          </button>
        </div>
      </div>
    </div>
  );
};