export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export enum TodoFilter {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
