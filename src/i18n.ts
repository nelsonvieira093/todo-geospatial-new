// Configuração simples i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // App
      appTitle: 'Todo Geospatial App',
      createTodo: 'Create Todo',
      close: 'Close',
      searchPlaceholder: 'Search tasks...',
      tasksFound: '{{count}} of {{total}} tasks found',
      searchResultsFor: 'for "{{term}}"',
      noTasksFound: 'No tasks found',
      noTasksForSearch: 'No tasks found for "{{term}}"',
      // Todo fields
      title: 'Title',
      description: 'Description',
      priority: 'Priority',
      status: 'Status',
      dueDate: 'Due Date',
      location: 'Location',
      latitude: 'Latitude',
      longitude: 'Longitude',

      // Priority options
      low: 'Low',
      medium: 'Medium',
      high: 'High',

      // Status options
      pending: 'Pending',
      inProgress: 'In Progress',
      done: 'Done',

      // UI
      tasks: 'Tasks',
      taskList: 'Task List',
      map: 'Map',
      dashboard: 'Dashboard',
      loading: 'Loading...',
      noTasks: 'No tasks registered',
      createFirstTask: 'Create the first task!',

      // Dashboard
      tasksByStatus: 'Tasks by Status',
      tasksByPriority: 'Tasks by Priority',
      totalTasks: 'Total Tasks',

      // Form validation
      titleRequired: 'Title is required',
      descriptionRequired: 'Description is required',
      dateRequired: 'Date is required',

      // Actions
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
    },
  },
  pt: {
    translation: {
      // App
      appTitle: 'Aplicativo Todo Geospatial',
      createTodo: 'Criar Tarefa',
      close: 'Fechar',

      searchPlaceholder: 'Buscar tarefas...',
      tasksFound: '{{count}} de {{total}} tarefas encontradas',
      searchResultsFor: 'para "{{term}}"',
      noTasksFound: 'Nenhuma tarefa encontrada',
      noTasksForSearch: 'Nenhuma tarefa encontrada para "{{term}}"',
      // Todo fields
      title: 'Título',
      description: 'Descrição',
      priority: 'Prioridade',
      status: 'Status',
      dueDate: 'Data de Vencimento',
      location: 'Localização',
      latitude: 'Latitude',
      longitude: 'Longitude',

      // Priority options
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',

      // Status options
      pending: 'Pendente',
      inProgress: 'Em Progresso',
      done: 'Concluída',

      // UI
      tasks: 'Tarefas',
      taskList: 'Lista de Tarefas',
      map: 'Mapa',
      dashboard: 'Painel',
      loading: 'Carregando...',
      noTasks: 'Nenhuma tarefa cadastrada',
      createFirstTask: 'Crie a primeira tarefa!',

      // Dashboard
      tasksByStatus: 'Tarefas por Status',
      tasksByPriority: 'Tarefas por Prioridade',
      totalTasks: 'Total de Tarefas',

      // Form validation
      titleRequired: 'Título é obrigatório',
      descriptionRequired: 'Descrição é obrigatória',
      dateRequired: 'Data é obrigatória',

      // Actions
      save: 'Salvar',
      edit: 'Editar',
      delete: 'Excluir',
      cancel: 'Cancelar',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
