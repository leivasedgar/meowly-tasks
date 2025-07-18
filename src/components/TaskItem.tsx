import React, { useState } from 'react';
import { Task, Priority } from '../types/Task';
import { Colors } from '../constants/Colors';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

const priorityConfig = {
  high: { color: '#ef7385', icon: 'fa-radiation' },
  medium: { color: '#ffc75b', icon: 'fa-triangle-exclamation' },
  low: { color: '#B4DD7F', icon: 'fa-exclamation' }
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleStatus, onTagClick }) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touchX = e.touches[0].clientX;
    const diffX = touchX - startX;
    
    if (Math.abs(diffX) > 10) {
      setCurrentX(diffX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (Math.abs(currentX) > 60) {
      if (currentX > 0) {
        setSwipeDirection('right'); // Edit
      } else {
        setSwipeDirection('left'); // Delete
      }
    } else {
      setSwipeDirection(null);
    }
    setCurrentX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const diffX = e.clientX - startX;
    
    if (Math.abs(diffX) > 10) {
      setCurrentX(diffX);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(currentX) > 60) {
      if (currentX > 0) {
        setSwipeDirection('right'); // Edit
      } else {
        setSwipeDirection('left'); // Delete
      }
    } else {
      setSwipeDirection(null);
    }
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setSwipeDirection(null);
      setCurrentX(0);
    }
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const formatDateTime = () => {
    if (!task.date) return null;
    const date = new Date(task.date);
    const dateStr = date.toLocaleDateString();
    const timeStr = task.time ? task.time : '';
    return `${dateStr} ${timeStr}`.trim();
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-lg mb-3">
      {/* Edit button (swipe right) */}
      <button
        className="absolute left-0 top-0 h-full w-20 flex items-center justify-center text-white transition-transform duration-200"
        style={{ 
          backgroundColor: Colors.semantic.info,
          transform: `translateX(${swipeDirection === 'right' ? 0 : -80}px)`
        }}
        onClick={() => {
          onEdit(task);
          setSwipeDirection(null);
        }}
      >
        <i className="fas fa-pen-to-square text-lg" />
      </button>

      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(${
            swipeDirection === 'right' ? 80 : 
            swipeDirection === 'left' ? -80 : 
            isDragging ? currentX : 0
          }px)`,
          borderLeft: `4px solid ${priorityConfig[task.priority].color}`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <i 
              className={`fas ${priorityConfig[task.priority].icon} text-lg mt-1`}
              style={{ color: priorityConfig[task.priority].color }}
            />
            <div className="flex-1 min-w-0 pr-8">
              <div className="mb-1">
                <h3 className={`font-baloo font-medium text-lg ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
              </div>
              
              {task.notes && (
                <p className={`text-sm mb-2 font-nunito ${task.status === 'done' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.notes}
                </p>
              )}
              
              {formatDateTime() && (
                <p className={`text-xs mb-2 font-nunito ${task.status === 'done' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <i className="fas fa-clock mr-1" />
                  {formatDateTime()}
                </p>
              )}
              
              {task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-nunito rounded-full cursor-pointer hover:opacity-80 transition-opacity ${
                        task.status === 'done' 
                          ? 'bg-gray-200 text-gray-400' 
                          : 'bg-blue-100 text-blue-700'
                      }`}
                      onClick={(e) => handleTagClick(tag, e)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Checkbox moved to top right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStatus(task.id);
              }}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                task.status === 'done' 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {task.status === 'done' && (
                <i className="fas fa-check text-white text-xs" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Delete button */}
      <button
        className="absolute right-0 top-0 h-full w-20 flex items-center justify-center text-white transition-transform duration-200"
        style={{ 
          backgroundColor: Colors.semantic.error,
          transform: `translateX(${swipeDirection === 'left' ? 0 : 80}px)`
        }}
        onClick={() => {
          onDelete(task.id);
          setSwipeDirection(null);
        }}
      >
        <i className="fas fa-trash-can text-lg" />
      </button>
    </div>
  );
};