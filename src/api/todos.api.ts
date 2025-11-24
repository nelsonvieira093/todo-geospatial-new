// Mock API com Axios — simula servidor real
import type { Todo } from '../types';

// Mock local em memória
let todos: Todo[] = [];
let nextId = 1;

export const todosApi = {
  async getTodos() {
    return { data: todos };
  },
  async create(todo: Omit<Todo, 'id'>) {
    const newTodo: Todo = {
      ...todo,
      id: nextId.toString(),
    };
    nextId++;
    todos.push(newTodo);
    return { data: newTodo };
  },
  async update(id: string, updates: Partial<Todo>) {
    todos = todos.map((t) => (t.id === id ? { ...t, ...updates } : t));
    return { data: todos.find((t) => t.id === id)! };
  },
  async remove(id: string) {
    todos = todos.filter((t) => t.id !== id);
    return { data: true };
  },
};
