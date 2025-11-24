// src/components/TaskDetails.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import type { Todo } from '../types/Todo';

interface TaskDetailsProps {
  todo: Todo | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: string) => void;
}

export function TaskDetails({ todo, open, onClose, onEdit, onDelete }: TaskDetailsProps) {
  if (!todo) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (completed: boolean) => {
    return completed ? 'success' : 'error';
  };

  // Função segura para formatar datas
  const formatDateSafe = (dateString: string | undefined) => {
    if (!dateString) return 'Data não disponível';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalhes da Tarefa</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {todo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {todo.description || 'Sem descrição'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={
              todo.priority === 'high' ? 'Alta' : todo.priority === 'medium' ? 'Média' : 'Baixa'
            }
            color={getPriorityColor(todo.priority) as any}
            size="small"
          />
          <Chip
            label={todo.completed ? 'Concluída' : 'Pendente'}
            color={getStatusColor(todo.completed) as any}
            size="small"
          />
          {todo.category && <Chip label={todo.category} variant="outlined" size="small" />}
        </Box>

        <Box sx={{ mb: 2 }}>
          {todo.dueDate && (
            <Typography variant="body2" paragraph>
              <strong>Data de Vencimento:</strong> {formatDateSafe(todo.dueDate)}
            </Typography>
          )}
          {todo.location && (
            <Typography variant="body2">
              <strong>Localização:</strong> {todo.location.lat.toFixed(4)},{' '}
              {todo.location.lng.toFixed(4)}
              {todo.location.address && ` (${todo.location.address})`}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Criado em:</strong> {formatDateSafe(todo.createdAt)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Atualizado em:</strong> {formatDateSafe(todo.updatedAt)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        {onEdit && (
          <Button onClick={() => onEdit(todo)} variant="contained">
            Editar
          </Button>
        )}
        {onDelete && (
          <Button onClick={() => todo.id && onDelete(todo.id)} color="error">
            Excluir
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
