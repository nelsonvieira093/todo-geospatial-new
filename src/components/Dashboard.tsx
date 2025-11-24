// src/components/Dashboard.tsx
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { Todo } from '../types/Todo';
import '../styles/Dashboard.css';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
const STATUS_COLORS = {
  pending: '#FF6B6B',
  'in-progress': '#4ECDC4',
  done: '#45B7D1',
};

export function Dashboard({ todos }: { todos: Todo[] }) {
  // Agora usando o campo status diretamente
  const statusData = [
    {
      name: 'Pendente',
      value: todos.filter((t) => t.status === 'pending').length,
      color: STATUS_COLORS.pending,
    },
    {
      name: 'Em Progresso',
      value: todos.filter((t) => t.status === 'in-progress').length,
      color: STATUS_COLORS['in-progress'],
    },
    {
      name: 'Concluída',
      value: todos.filter((t) => t.status === 'done').length,
      color: STATUS_COLORS.done,
    },
  ];

  const priorityData = [
    { name: 'Baixa', value: todos.filter((t) => t.priority === 'low').length },
    { name: 'Média', value: todos.filter((t) => t.priority === 'medium').length },
    { name: 'Alta', value: todos.filter((t) => t.priority === 'high').length },
  ];

  // Estatísticas para os cards
  const totalTasks = todos.length;
  const pendingTasks = todos.filter((t) => t.status === 'pending').length;
  const inProgressTasks = todos.filter((t) => t.status === 'in-progress').length;
  const completedTasks = todos.filter((t) => t.status === 'done').length;
  const tasksWithLocation = todos.filter((t) => t.location).length;

  return (
    <div
      style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '24px',
        }}
      >
        <h1
          style={{
            margin: '0 0 8px 0',
            color: '#2d3748',
            fontSize: '28px',
            fontWeight: '700',
          }}
        >
          📊 Dashboard
        </h1>
        <p
          style={{
            margin: '0',
            color: '#718096',
            fontSize: '16px',
          }}
        >
          Visão geral das suas tarefas
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #4299e1',
          }}
        >
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
            Total de Tarefas
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2d3748' }}>{totalTasks}</div>
        </div>

        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #FF6B6B',
          }}
        >
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>Pendentes</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#FF6B6B' }}>
            {pendingTasks}
          </div>
        </div>

        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #4ECDC4',
          }}
        >
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
            Em Progresso
          </div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4ECDC4' }}>
            {inProgressTasks}
          </div>
        </div>

        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            borderLeft: '4px solid #45B7D1',
          }}
        >
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>Concluídas</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#45B7D1' }}>
            {completedTasks}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Gráfico de Pizza - Status */}
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px 0',
              color: '#2d3748',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            📈 Status das Tarefas
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tarefas`, 'Quantidade']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras - Prioridade */}
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px 0',
              color: '#2d3748',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            🎯 Tarefas por Prioridade
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#718096" fontSize={12} />
                <YAxis stroke="#718096" fontSize={12} />
                <Tooltip
                  cursor={{ fill: '#f7fafc' }}
                  formatter={(value) => [`${value} tarefas`, 'Quantidade']}
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} name="Tarefas">
                  {priorityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabela de Resumo */}
      {todos.length > 0 && (
        <div
          style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginTop: '24px',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px 0',
              color: '#2d3748',
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            📋 Resumo das Tarefas
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <strong>Status:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Pendente: {pendingTasks}</li>
                <li>Em progresso: {inProgressTasks}</li>
                <li>Concluída: {completedTasks}</li>
              </ul>
            </div>
            <div>
              <strong>Prioridade:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Baixa: {priorityData[0].value}</li>
                <li>Média: {priorityData[1].value}</li>
                <li>Alta: {priorityData[2].value}</li>
              </ul>
            </div>
            <div>
              <strong>Outras Estatísticas:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Com localização: {tasksWithLocation}</li>
                <li>
                  Taxa de conclusão:{' '}
                  {totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0}%
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando não há tarefas */}
      {todos.length === 0 && (
        <div
          style={{
            background: 'white',
            padding: '48px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            marginTop: '24px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <h3
            style={{
              margin: '0 0 8px 0',
              color: '#2d3748',
              fontSize: '24px',
            }}
          >
            Nenhuma tarefa encontrada
          </h3>
          <p
            style={{
              margin: '0',
              color: '#718096',
              fontSize: '16px',
            }}
          >
            Crie algumas tarefas para ver as estatísticas aqui!
          </p>
        </div>
      )}
    </div>
  );
}
