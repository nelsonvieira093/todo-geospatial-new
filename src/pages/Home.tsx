// Página principal integrando componentes
import { useTodos } from '../hooks/useTodos';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';
import { Dashboard } from '../components/Dashboard';
import { TodoMap } from '../components/TodoMap';
import { TaskDetails } from '../components/TaskDetails';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';
import type { Todo } from '../types/Todo';

export function Home() {
  const { todos, isLoading, createTodo, deleteTodo } = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const { t } = useTranslation();

  // Função para lidar com clique no marcador do mapa
  const handleMarkerClick = (lat: number, lng: number) => {
    // Encontrar a tarefa correspondente às coordenadas
    const todo = todos.find((t) => t.location?.lat === lat && t.location?.lng === lng);
    setSelectedTodo(todo || null);
  };

  // Função para fechar o modal
  const handleCloseDetails = () => {
    setSelectedTodo(null);
  };

  // Função para editar tarefa
  const handleEditTodo = (todo: Todo) => {
    // Implementar lógica de edição aqui
    console.log('Editar tarefa:', todo);
    setSelectedTodo(null);
  };

  // Função para excluir tarefa
  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTodo.mutate(id);
      setSelectedTodo(null);
    }
  };

  if (isLoading) return <p>{t('loading')}</p>;

  console.log('Todas as tarefas:', todos);
  console.log('Tarefas por status:', {
    pending: todos.filter((t) => t.status === 'pending').length,
    inProgress: todos.filter((t) => t.status === 'in-progress').length,
    done: todos.filter((t) => t.status === 'done').length,
  });
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🗺️ {t('appTitle')}
          </Typography>
          <Button color="inherit" onClick={() => setShowForm(!showForm)}>
            {showForm ? t('close') : t('createTodo')}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        {showForm && (
          <TodoForm
            onSubmit={(data) => {
              createTodo.mutate(data);
              setShowForm(false);
            }}
          />
        )}

        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={t('taskList')} />
          <Tab label={t('map')} />
          <Tab label={t('dashboard')} />
        </Tabs>

        {currentTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              {t('taskList')} ({todos.length})
            </Typography>
            <TodoList todos={todos} onTodoClick={setSelectedTodo} />
          </Box>
        )}

        {currentTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              🗺️ {t('map')}
            </Typography>
            <TodoMap todos={todos} onMarkerClick={handleMarkerClick} />
          </Box>
        )}

        {currentTab === 2 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              {t('dashboard')}
            </Typography>
            <Dashboard todos={todos} />
          </Box>
        )}

        {/* Modal de Detalhes */}
        <TaskDetails
          todo={selectedTodo}
          open={!!selectedTodo}
          onClose={handleCloseDetails}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </Box>
    </div>
  );
}
