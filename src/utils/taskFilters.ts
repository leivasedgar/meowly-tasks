import { Task, FilterOptions, SortOption } from '../types/Task';

export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter(task => {
    // Filter by priority
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(task.priority)) {
        return false;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(filterTag => 
        task.tags.some(taskTag => 
          taskTag.toLowerCase().includes(filterTag.toLowerCase())
        )
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dateRange) {
      if (filters.dateRange.start && task.date) {
        if (task.date < filters.dateRange.start) {
          return false;
        }
      }
      if (filters.dateRange.end && task.date) {
        if (task.date > filters.dateRange.end) {
          return false;
        }
      }
    }

    return true;
  });
};

export const sortTasks = (tasks: Task[], sortOption: SortOption): Task[] => {
  const sorted = [...tasks];

  switch (sortOption) {
    case 'priority-high-low':
      return sorted.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    case 'priority-low-high':
      return sorted.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

    case 'tags-a-z':
      return sorted.sort((a, b) => {
        const aTag = a.tags[0] || '';
        const bTag = b.tags[0] || '';
        return aTag.localeCompare(bTag);
      });

    case 'tags-z-a':
      return sorted.sort((a, b) => {
        const aTag = a.tags[0] || '';
        const bTag = b.tags[0] || '';
        return bTag.localeCompare(aTag);
      });

    case 'date-closest-furthest':
      return sorted.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    case 'date-furthest-closest':
      return sorted.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    default:
      return sorted;
  }
};