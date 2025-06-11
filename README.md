# 🚀 Sistema de Cantina Escolar (Dockerizado)

Sistema completo de gerenciamento de cantina escolar, desenvolvido com Spring Boot e Angular, utilizando Docker para containerização. O sistema oferece funcionalidades para gerenciamento de usuários, alimentos, pedidos e saldo, com uma interface moderna e intuitiva.

## 📋 Funcionalidades

### 👥 Gestão de Usuários
- Cadastro e autenticação de usuários
- Perfis diferentes (Administrador e Usuário comum)
- Gerenciamento de saldo
- Histórico de transações

### 🍽️ Gestão de Alimentos
- Cadastro e edição de alimentos
- Controle de preços
- Categorização de produtos

### 💰 Gestão de Pedidos
- Realização de pedidos
- Consulta de histórico
- Status de pedidos em tempo real

### 💳 Gestão Financeira
- Controle de saldo dos usuários
- Histórico de transações
- Relatórios de vendas

## 🛠️ Tecnologias Utilizadas

### Backend (Spring Boot)
- Java 17+
- Spring Boot 3.1.3
- Spring Security com JWT
- Spring Data JPA
- PostgreSQL
- Lombok

### Frontend (Angular)
- Angular 16+
- Angular Material UI
- TypeScript
- RxJS
- NgRx (Gerenciamento de Estado)

### Infraestrutura
- Docker
- Docker Compose
- PostgreSQL 15+

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Execute o Docker Compose:
```bash
docker-compose up -d
```

3. Acesse a aplicação:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Banco de dados: localhost:5432

## 🔐 Credenciais Padrão

### Administrador
- Email: admin@email.com
- Senha: senha123

### Usuário Comum
- Email: usuario@email.com
- Senha: senha123

## 🔧 Configuração do Ambiente de Desenvolvimento

### Requisitos
- Docker e Docker Compose
- Node.js 16+ (para desenvolvimento frontend)
- Java 17+ (para desenvolvimento backend)
- Maven 3.8+ (para build do backend)

## 📚 Documentação da API

O backend expõe as seguintes APIs principais:

### Autenticação
- POST /api/auth/login - Login de usuário
- POST /api/auth/registro - Registro de novo usuário

### Usuários
- GET /api/usuarios - Lista todos os usuários
- POST /api/usuarios - Cria novo usuário
- PUT /api/usuarios/{id} - Atualiza usuário
- DELETE /api/usuarios/{id} - Remove usuário
- GET /api/usuarios/saldo/{id} - Consulta saldo

### Alimentos
- GET /api/alimentos - Lista todos os alimentos
- POST /api/alimentos - Cadastra novo alimento
- PUT /api/alimentos/{id} - Atualiza alimento
- DELETE /api/alimentos/{id} - Remove alimento

### Pedidos
- GET /api/pedidos - Lista todos os pedidos
- POST /api/pedidos - Cria novo pedido
- GET /api/pedidos/usuario/{id} - Lista pedidos do usuário
- PUT /api/pedidos/{id}/status - Atualiza status do pedido

## 🔒 Segurança

O sistema utiliza JWT (JSON Web Tokens) para autenticação e autorização, com as seguintes características:

- Tokens com expiração de 24 horas
- Refresh tokens para renovação automática
- Rotas protegidas por perfil de usuário
- Senhas criptografadas com BCrypt

## 📱 Interface do Usuário

A interface foi desenvolvida com Angular Material, oferecendo:

- Design responsivo
- Temas claro e escuro
- Componentes reutilizáveis
- Feedback visual para ações
- Validações em tempo real
