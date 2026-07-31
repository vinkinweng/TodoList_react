import type { TodoTask, TodoCategory } from "../types/todo"
export const initialTasks: TodoTask[] = [
  { id: 1, title: 'Reactコンポーネントの学習', category: 'work', completed: false, dueDate: '2026-05-27' },
  { id: 2, title: 'Todoデータの整理', category: 'life', completed: true, dueDate: '2026-06-27' },
  { id: 3, title: 'ページデザインの調整', category: 'study', completed: true, dueDate: '' }
];
export const categorys: TodoCategory[] = [
  { id: 'work', name: '工作', color: '#2563eb' },
  { id: 'life', name: '生活', color: '#16a34a' },
  { id: 'study', name: '学习', color: '#f59e0b' }
]



