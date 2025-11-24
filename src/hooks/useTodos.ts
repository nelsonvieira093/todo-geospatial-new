// Hook com TanStack Query para sincronizar com API
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi } from '../api/todos.api';
import type { Todo } from '../types/Todo';

export function useTodos() {
  const qc = useQueryClient();

  interface TodosApiResponse {
    data: Todo[];
    [key: string]: unknown;
  }

  interface TodosQueryError {
    message?: string;
    [key: string]: unknown;
  }

  const todosQuery = useQuery<Todo[], TodosQueryError>({
    queryKey: ['todos'],
    queryFn: (): Promise<Todo[]> =>
      todosApi.getTodos().then((res: TodosApiResponse) => {
        console.log('API Response:', res);
        console.log('Todos data:', res.data);
        return res.data;
      }),
  });

  const createTodo = useMutation({
    mutationFn: (todo: Omit<Todo, 'id'>) => {
      console.log('Enviando para API:', todo);
      return todosApi.create(todo);
    },
    onSuccess: (data) => {
      console.log('Tarefa criada com sucesso:', data);
      qc.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Erro ao criar tarefa:', error);
    },
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) => {
      console.log('Atualizando tarefa:', id, updates);
      return todosApi.update(id, updates);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });

  const deleteTodo = useMutation({
    mutationFn: (id: string) => todosApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });

  return {
    todos: todosQuery.data || [],
    isLoading: todosQuery.isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
