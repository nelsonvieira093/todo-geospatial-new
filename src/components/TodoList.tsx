// src/components/TodoList.tsx
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box,
  Stack,
  TextField,
  InputAdornment,
  Pagination
} from '@mui/material';
import type { Todo } from '../types/Todo';
import { useDebounce } from '../hooks/useDebounce';
import { useState, useMemo, useEffect } from 'react';
import '../styles/TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onTodoClick?: (todo: Todo) => void;
}

export function TodoList({ todos, onTodoClick }: TodoListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Configuração de paginação
  const itemsPerPage = 5;

  // Filtrar tarefas baseado no search term
  const filteredTodos = useMemo(() => {
    if (!debouncedSearchTerm) return todos;

    const lowercasedFilter = debouncedSearchTerm.toLowerCase();
    return todos.filter(todo => 
      todo.title.toLowerCase().includes(lowercasedFilter) ||
      todo.description?.toLowerCase().includes(lowercasedFilter) ||
      todo.category?.toLowerCase().includes(lowercasedFilter) ||
      todo.priority.toLowerCase().includes(lowercasedFilter) ||
      todo.status.toLowerCase().includes(lowercasedFilter)
    );
  }, [todos, debouncedSearchTerm]);

  // Tarefas paginadas
  const paginatedTodos = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredTodos.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTodos, page]);

  // Resetar para página 1 quando search mudar
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (completed: boolean) => {
    return completed ? 'success' : 'default';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Sem data';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {/* Barra de Busca */}
      <TextField
        placeholder="Buscar tarefas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              🔍
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="outlined"
        size="small"
      />

      {/* Contador de resultados */}
      <Typography variant="body2" color="text.secondary">
        {filteredTodos.length} de {todos.length} tarefas encontradas
        {debouncedSearchTerm && ` para "${debouncedSearchTerm}"`}
        {filteredTodos.length > itemsPerPage && ` (Página ${page} de ${Math.ceil(filteredTodos.length / itemsPerPage)})`}
      </Typography>

      {/* Lista de Tarefas Paginadas */}
      {paginatedTodos.map(todo => (
        <Card 
          key={todo.id}
          sx={{ 
            cursor: onTodoClick ? 'pointer' : 'default',
            transition: 'all 0.2s',
            '&:hover': onTodoClick ? {
              transform: 'translateY(-2px)',
              boxShadow: 3,
              backgroundColor: 'action.hover'
            } : {},
            borderLeft: `4px solid ${
              todo.priority === 'high' ? '#f44336' :
              todo.priority === 'medium' ? '#ff9800' :
              '#4caf50'
            }`
          }}
          onClick={() => onTodoClick?.(todo)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary'
                }}
              >
                {todo.title}
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <Chip 
                  label={todo.priority === 'high' ? 'Alta' : 
                        todo.priority === 'medium' ? 'Média' : 'Baixa'} 
                  color={getPriorityColor(todo.priority) as any}
                  size="small"
                />
                <Chip 
                  label={todo.completed ? 'Concluída' : 'Pendente'} 
                  color={getStatusColor(todo.completed) as any}
                  variant={todo.completed ? 'filled' : 'outlined'}
                  size="small"
                />
              </Stack>
            </Box>

            {todo.description && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {todo.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1}>
                {todo.dueDate && (
                  <Chip 
                    label={`Vence: ${formatDate(todo.dueDate)}`}
                    variant="outlined"
                    size="small"
                  />
                )}
                {todo.category && (
                  <Chip 
                    label={todo.category}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Stack>

              {todo.location && (
                <Chip 
                  label="📍 Com localização"
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Paginação */}
      {filteredTodos.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination 
            count={Math.ceil(filteredTodos.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {filteredTodos.length === 0 && (
        <Card>
          <CardContent>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              textAlign="center"
              sx={{ py: 3 }}
            >
              {todos.length === 0 
                ? 'Nenhuma tarefa encontrada' 
                : `Nenhuma tarefa encontrada para "${debouncedSearchTerm}"`
              }
            </Typography>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}