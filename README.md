# 🗺️ Todo List Geoespacial

Uma aplicação moderna de gerenciamento de tarefas com recursos geoespaciais, desenvolvida como teste técnico de frontend.

## 🚀 Funcionalidades

- ✅ **CRUD Completo** - Criar, visualizar, editar e excluir tarefas
- 🗺️ **Mapas Interativos** - React Leaflet com seleção de localização
- 📊 **Dashboard Analítico** - Gráficos com Recharts
- 🔍 **Busca Inteligente** - Debounce search em tempo real
- 🌐 **Internacionalização** - Suporte a PT/EN
- 📄 **Paginação** - Navegação eficiente entre tarefas
- 🎨 **UI Moderna** - Material-UI com design responsivo

## 🛠️ Tecnologias

- **Frontend**: React 19 + TypeScript
- **UI Framework**: Material-UI (MUI)
- **Estado**: TanStack Query v5
- **Formulários**: React Hook Form + Zod
- **Mapas**: React Leaflet
- **Gráficos**: Recharts
- **i18n**: i18next
- **Build**: Vite
- **Testing**: Vitest + Testing Library

## 🏗️ Arquitetura
src/
├── components/ # Componentes reutilizáveis
│ ├── TodoList.tsx # Lista com busca e paginação
│ ├── TodoForm.tsx # Formulário com validação
│ ├── TodoMap.tsx # Mapa com seleção de localização
│ ├── Dashboard.tsx # Gráficos e estatísticas
│ └── TaskDetails.tsx # Modal de detalhes/edição
├── hooks/ # Custom hooks
│ ├── useTodos.ts # Gerenciamento de estado
│ └── useDebounce.ts # Hook de debounce
├── types/ # Definições TypeScript
│ └── Todo.ts # Interface principal
├── api/ # Camada de API
│ └── todos.api.ts # Mock API com TanStack Query
├── styles/ # Estilos CSS
└── i18n/ # Configuração de internacionalização

text

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar testes
npm test

# Formatar código
npm run format
📦 Scripts Disponíveis
npm run dev - Servidor de desenvolvimento

npm run build - Build de produção

npm run preview - Preview do build

npm run test - Executar testes

npm run format - Formatar código com Prettier

🌐 Deploy
A aplicação está disponível em: https://seu-app.netlify.app



Desenvolvido como teste técnico demonstrando habilidades em React, TypeScript e ecossistema moderno de frontend.