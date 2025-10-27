# Solucione Mobile 📱

Uma aplicação mobile desenvolvida com React Native e Expo para gerenciamento de reclamações e problemas urbanos. O app permite que os usuários registrem, visualizem e acompanhem reclamações sobre problemas em suas comunidades.

## Repositórios complementares

- Backend: https://github.com/garciaagui/solucione-backend
- Infra: https://github.com/garciaagui/solucione-infra

## 🚀 Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e deploy
- **TypeScript** - Tipagem estática para JavaScript
- **Expo Router** - Roteamento baseado em arquivos
- **React Query (TanStack Query)** - Gerenciamento de estado do servidor
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP
- **AsyncStorage** - Armazenamento local
- **React Native Toast Message** - Notificações

## 📱 Funcionalidades

### 🔐 Autenticação

- Login com email e senha
- Gerenciamento de sessão automático
- Logout seguro
- Persistência de dados do usuário

### 🏠 Tela Principal

- Dashboard com lista de reclamações
- Header personalizado com informações do usuário
- Botão flutuante para nova reclamação
- Pull-to-refresh para atualizar dados
- Estados de loading e empty state

### 📝 Nova Reclamação

- Formulário completo com validação
- Campos: título, descrição, endereço, CEP, bairro, referência
- Upload de imagem obrigatório
- Validação em tempo real com Zod
- Modal com animação slide-from-bottom

### 👤 Perfil

- Informações do usuário
- Avatar personalizado
- Seletor de tema (claro/escuro/sistema)
- Botão de logout
- Estado para usuários não autenticados

### 🎨 Tema

- Suporte a tema claro e escuro
- Modo automático baseado no sistema
- Persistência da preferência do usuário
- Cores e componentes adaptativos

## 🏗️ Arquitetura

### Estrutura de Pastas

```
solucione-mobile/
├── app/                          # Rotas da aplicação (Expo Router)
│   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   ├── _layout.tsx           # Layout do grupo auth
│   │   └── sign-in.tsx           # Tela de login
│   ├── (tabs)/                   # Grupo de rotas com tabs
│   │   ├── _layout.tsx           # Layout com tabs
│   │   ├── index.tsx             # Tela inicial (Home)
│   │   ├── complaints.tsx        # Tela de reclamações
│   │   └── profile.tsx           # Tela de perfil
│   ├── _layout.tsx               # Layout raiz
│   └── new-complaint.tsx         # Modal de nova reclamação
├── components/                   # Componentes reutilizáveis
│   ├── app/                     # Componentes específicos da app
│   │   ├── _screens/            # Componentes por tela
│   │   ├── complaints-container/ # Container de reclamações
│   │   ├── new-complaint-button.tsx
│   │   ├── tab-bar.tsx
│   │   └── unauthenticated-container.tsx
│   ├── icons/                   # Ícones customizados
│   ├── ui/                      # Componentes de UI base
│   └── custom-toast.tsx         # Configuração de toast
├── constants/                   # Constantes da aplicação
│   ├── query-keys.ts           # Chaves do React Query
│   ├── storage-keys.ts         # Chaves do AsyncStorage
│   └── theme.ts                # Cores e fontes
├── contexts/                   # Contextos React
│   ├── auth-context.tsx        # Contexto de autenticação
│   ├── step-context.tsx        # Contexto de steps
│   └── theme-context.tsx       # Contexto de tema
├── functions/                  # Funções utilitárias
│   ├── complaints.ts          # Funções relacionadas a reclamações
│   ├── error.ts               # Tratamento de erros
│   ├── storage.ts             # Funções de armazenamento
│   └── toast.ts               # Funções de notificação
├── hooks/                     # Custom hooks
│   ├── use-complaints.ts      # Hook para reclamações
│   └── use-theme-color.ts     # Hook para cores do tema
├── schemas/                   # Schemas de validação (Zod)
│   ├── auth.ts                # Schema de autenticação
│   └── complaint.ts           # Schema de reclamação
├── services/                  # Serviços de API
│   ├── api/                   # Configuração do Axios
│   ├── auth.ts                # Serviços de autenticação
│   └── complaint.ts           # Serviços de reclamação
└── types/                     # Definições de tipos TypeScript
    ├── api.ts                 # Tipos da API
    ├── auth.ts                # Tipos de autenticação
    ├── complaint.ts           # Tipos de reclamação
    ├── reply.ts               # Tipos de resposta
    ├── shared.ts              # Tipos compartilhados
    ├── ui.ts                  # Tipos de UI
    └── user.ts                # Tipos de usuário
```

### Padrões de Desenvolvimento

- **File-based Routing**: Uso do Expo Router para navegação
- **Context API**: Gerenciamento de estado global (auth, theme)
- **Custom Hooks**: Lógica reutilizável encapsulada
- **Component Composition**: Componentes pequenos e focados
- **TypeScript**: Tipagem forte em toda a aplicação
- **Schema Validation**: Validação com Zod
- **Error Handling**: Tratamento centralizado de erros
- **Loading States**: Estados de carregamento consistentes

## 🛠️ Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android)
- Xcode (para iOS - apenas macOS)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd solucione-mobile
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   # Crie um arquivo .env na raiz do projeto
   EXPO_PUBLIC_API_URL=https://sua-api-url.com
   ```

4. **Inicie o projeto**
   ```bash
   npm start
   ```

### Scripts Disponíveis

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar na web
npm run web

# Linting
npm run lint

# Prebuild (para builds nativos)
npm run prebuild

# Build para iOS
npm run build:ios

# Build para Android
npm run build:android
```

## 📱 Funcionalidades Detalhadas

### Sistema de Autenticação

- **Login**: Validação de credenciais com feedback visual
- **Persistência**: Dados do usuário salvos localmente
- **Auto-login**: Verificação automática de sessão
- **Logout**: Limpeza segura de dados

### Gerenciamento de Reclamações

- **Listagem**: Exibição de reclamações com cards informativos
- **Criação**: Formulário completo com validação em tempo real
- **Estados**: Loading, empty state e error handling
- **Refresh**: Pull-to-refresh para atualizar dados

### Interface e UX

- **Tema Adaptativo**: Suporte completo a modo claro/escuro
- **Navegação**: Tab bar customizada com ícones
- **Animações**: Transições suaves entre telas
- **Feedback**: Toast notifications para ações do usuário
- **Responsividade**: Layout adaptativo para diferentes tamanhos

### Componentes de UI

- **Input**: Campo de texto com validação
- **Button**: Botão com estados de loading
- **Textarea**: Área de texto com contador de caracteres
- **ImagePicker**: Seletor de imagem com preview
- **Skeleton**: Loading states animados
- **Toast**: Sistema de notificações

## 🔧 Configurações

### Expo Configuration

- **Bundle ID**: `com.garciagui.solucionemobile`
- **Scheme**: `solucionemobile`
- **New Architecture**: Habilitada
- **Typed Routes**: Habilitado
- **React Compiler**: Habilitado

### TypeScript

- **Strict Mode**: Habilitado
- **Path Mapping**: `@/*` para imports absolutos
- **Type Checking**: Configuração rigorosa

### ESLint

- **Expo Config**: Configuração base do Expo
- **Prettier**: Integração com Prettier
- **Custom Rules**: Regras personalizadas

## 🚀 Deploy

### Desenvolvimento

```bash
# Iniciar em modo desenvolvimento
npm start

# Executar em dispositivo físico
npm run android  # ou npm run ios
```

### Produção

```bash
# Build para produção
npm run prebuild

# Build para Android
npm run build:android

# Build para iOS
npm run build:ios
```

## 📊 Estrutura de Dados

### Usuário

```typescript
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt: string
}
```

### Reclamação

```typescript
interface Complaint {
  id: string
  title: string
  description: string
  street: string
  neighborhood: string
  zipCode: string
  addressReference?: string
  images: string[]
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected'
  userId: string
  user: User
  replies: Reply[]
  createdAt: string
  updatedAt: string
}
```

## 🎨 Design System

### Cores

- **Primária**: #121212 (claro) / #FFFFFF (escuro)
- **Sucesso**: #079455 (claro) / #47CD89 (escuro)
- **Erro**: #D92D20
- **Aviso**: #DC6803 (claro) / #F79009 (escuro)
- **Info**: #007AFF (claro) / #2883DF (escuro)

### Tipografia

- **Sistema**: Fontes nativas do sistema
- **Tamanhos**: xs, sm, base, lg, xl, 2xl
- **Pesos**: normal, medium, semibold, bold
