// Drawer simples para detalhes
import type { Todo } from '../types/Todo';

export function TaskDrawer({ todo }: { todo: Todo | null }) {
  if (!todo) return null;
  return (
    <div style={{ border: '1px solid #ccc', padding: 12 }}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Prioridade: {todo.priority}</p>
      <p>Status: {todo.status}</p>
    </div>
  );
}
