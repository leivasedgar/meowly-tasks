import React, { useState, useEffect } from 'react';
import { SortOption } from '../types/Task';
import { Colors } from '../constants/Colors';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (sort: SortOption | null) => void;
  currentSort: SortOption | null;
}

type SortType = 'priority' | 'tags' | 'date';
type SortDirection = 'asc' | 'desc';

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  onApplySort,
  currentSort
}) => {
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(currentSort);

  useEffect(() => {
    setSelectedSort(currentSort);
  }, [currentSort, isOpen]);

  const getSortState = (type: SortType): SortDirection | null => {
    if (!selectedSort) return null;
    
    switch (type) {
      case 'priority':
        if (selectedSort === 'priority-high-low') return 'desc';
        if (selectedSort === 'priority-low-high') return 'asc';
        return null;
      case 'tags':
        if (selectedSort === 'tags-a-z') return 'asc';
        if (selectedSort === 'tags-z-a') return 'desc';
        return null;
      case 'date':
        if (selectedSort === 'date-closest-furthest') return 'asc';
        if (selectedSort === 'date-furthest-closest') return 'desc';
        return null;
      default:
        return null;
    }
  };

  const handleSortToggle = (type: SortType) => {
    const currentState = getSortState(type);
    let newSort: SortOption | null = null;

    switch (type) {
      case 'priority':
        if (currentState === null) {
          newSort = 'priority-high-low';
        } else if (currentState === 'desc') {
          newSort = 'priority-low-high';
        } else {
          newSort = null;
        }
        break;
      case 'tags':
        if (currentState === null) {
          newSort = 'tags-a-z';
        } else if (currentState === 'asc') {
          newSort = 'tags-z-a';
        } else {
          newSort = null;
        }
        break;
      case 'date':
        if (currentState === null) {
          newSort = 'date-closest-furthest';
        } else if (currentState === 'asc') {
          newSort = 'date-furthest-closest';
        } else {
          newSort = null;
        }
        break;
    }

    setSelectedSort(newSort);
  };

  const getSortButtonText = (type: SortType): string => {
    const state = getSortState(type);
    
    switch (type) {
      case 'priority':
        if (state === 'desc') return 'Priority (High to Low)';
        if (state === 'asc') return 'Priority (Low to High)';
        return 'Priority';
      case 'tags':
        if (state === 'asc') return 'Tags (A to Z)';
        if (state === 'desc') return 'Tags (Z to A)';
        return 'Tags';
      case 'date':
        if (state === 'asc') return 'Date (Closest to Furthest)';
        if (state === 'desc') return 'Date (Furthest to Closest)';
        return 'Date';
      default:
        return '';
    }
  };

  const getSortIcon = (type: SortType): string => {
    const state = getSortState(type);
    
    if (state === 'asc') return 'fa-arrow-up';
    if (state === 'desc') return 'fa-arrow-down';
    return 'fa-sort';
  };

  const handleApply = () => {
    onApplySort(selectedSort);
    onClose();
  };

  const handleClear = () => {
    setSelectedSort(null);
    onApplySort(null);
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
            <h2 className="text-2xl font-semibold text-gray-800">Sort</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <i className="fas fa-times text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(80vh-140px)]">
          {(['priority', 'tags', 'date'] as SortType[]).map((type) => {
            const isSelected = getSortState(type) !== null;
            
            return (
              <button
                key={type}
                onClick={() => handleSortToggle(type)}
                className="w-full p-4 rounded-lg border transition-colors flex items-center justify-between"
                style={{
  backgroundColor: isSelected
    ? Colors.brand.primary
    : Colors.utility.secondaryBackground,
  borderColor: isSelected
    ? Colors.brand.primary
    : Colors.utility.secondaryText,
  borderWidth: 1,
  color: isSelected
    ? Colors.utility.secondaryBackground
    : Colors.utility.secondaryText,
}}

              >
                <span className="font-medium">{getSortButtonText(type)}</span>
                <i 
                  className={`fas ${getSortIcon(type)}`}
                  style={{
                    color: isSelected 
                      ? Colors.utility.secondaryBackground 
                      : Colors.utility.secondaryText
                  }}
                />
              </button>
            );
          })}
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