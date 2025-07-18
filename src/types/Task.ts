export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'done';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  date?: string;
  time?: string;
  tags: string[];
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
}

export interface FilterOptions {
  priority?: Priority[];
  tags?: string[];
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export type SortOption = 
  | 'priority-high-low'
  | 'priority-low-high'
  | 'tags-a-z'
  | 'tags-z-a'
  | 'date-closest-furthest'
  | 'date-furthest-closest';