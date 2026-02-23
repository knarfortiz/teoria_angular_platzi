export interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

export enum TaskFilter {
  All = 'all',
  Pending = 'pending',
  Completed = 'completed'
}