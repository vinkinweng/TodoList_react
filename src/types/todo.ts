export type TodoTask = {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  dueDate: string;
};
export type TodoCategory = {
  id: string;
  name: string;
  color: string;
};
export type TodoData = {
  updatedAt: string;
  tasks: TodoTask[];
  categories: TodoCategory[];
  settings: { theme: 'light' | 'dark' };
};