# 🚀 Desafio Drikey

Uma aplicação web moderna de autenticação e dashboard construída com React, TypeScript e Vite.

## 📋 Descrição

O Repositorio é uma aplicação que oferece um sistema completo de autenticação de usuários com dashboard protegido. A aplicação inclui funcionalidades de registro, login, logout e uma área restrita para usuários autenticados.

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd Drikey
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Em outro terminal, inicie o servidor mock**

   ```bash
   npm run server
   ```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento Vite
- `npm run server` - Inicia o JSON Server na porta 3001
- `npm run build` - Constrói a aplicação para produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o ESLint

## 🌐 Acesso à Aplicação

- **Frontend**: <http://localhost:5173>
- **API Mock**: <http://localhost:3001>

## 🔑 Login de Teste

Para acessar o sistema com um usuário de testes, utilize as seguintes credenciais:

- **Email:** `user@example.com`  
- **Senha:** `123456`

Basta inserir esses dados na tela de login após iniciar o projeto.

## ✨ Funcionalidades

- 🔐 **Sistema de Autenticação**
  - Registro de usuários
  - Login com email e senha
  - Logout seguro
  - Rotas protegidas
  - Contexto de autenticação global

- 🎨 **Interface Moderna**
  - Design responsivo
  - Estilização com SCSS
  - Componentes reutilizáveis
  - Navegação intuitiva

- 🛡️ **Segurança**
  - JWT para autenticação
  - Hash de senhas com bcrypt
  - Rotas protegidas
  - Validação de formulários

- 📊 **Dashboard**
  - Estatísticas visuais
  - Atividades recentes
  - Interface administrativa
  - Dados dinâmicos

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento da aplicação
- **SCSS** - Pré-processador CSS

### Backend (Mock)

- **JSON Server** - API REST simulada
- **Axios** - Cliente HTTP

### Autenticação

- **JWT Decode** - Decodificação de tokens JWT
- **bcryptjs** - Hash de senhas

### Desenvolvimento

- **ESLint** - Linting de código
- **TypeScript ESLint** - Regras específicas para TypeScript

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Login/          # Componente de login
│   ├── Register/       # Componente de registro
│   └── ProtectedRoute/ # Rota protegida
├── context/            # Contextos React
│   ├── AuthContext.tsx # Contexto de autenticação
│   └── AuthProvider.tsx # Provedor do contexto
├── hooks/              # Hooks customizados
│   └── useAuth.ts      # Hook de autenticação
├── page/               # Páginas da aplicação
│   ├── Home/           # Página inicial
│   └── Dashboard/      # Dashboard principal
├── services/           # Serviços da aplicação
│   └── authService.ts  # Serviço de autenticação
└── types/              # Definições de tipos TypeScript
    └── index.ts        # Interfaces e tipos
```

## 📱 Funcionalidades Principais

### 1. Autenticação

- **Registro**: Crie uma nova conta com nome, email e senha
- **Login**: Acesse sua conta com email e senha
- **Logout**: Saia da aplicação de forma segura

### 2. Dashboard

- **Estatísticas**: Visualize dados importantes
- **Atividades**: Acompanhe ações recentes
- **Interface Responsiva**: Funciona em todos os dispositivos

### 3. Rotas Protegidas

- Acesso restrito apenas para usuários autenticados
- Redirecionamento automático para login
- Contexto de autenticação global

### Banco de Dados Mock

O projeto utiliza `db.json` para simular uma API REST. Os dados são persistidos localmente durante o desenvolvimento.

## 📦 Build de Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

A build será gerada na pasta `dist/`.

## 👨‍💻 Autor

**Thiago** - Desenvolvido com ❤️
