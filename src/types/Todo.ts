// src/types/todo.ts
// src/types/Todo.ts
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: 'pending' | 'in-progress' | 'done'; // ← Adicionar esta linha
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  category?: string;
  createdAt: string;
  updatedAt: string;
}
