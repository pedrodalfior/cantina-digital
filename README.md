🚀 Sistema de Cantina Escolar (Dockerizado) 🚀
Projeto de desenvolvimento próprio voltado para estudar novos métodos de desenvolvimento e para integração de novas habilidades na faculdade.
Este projeto visa gerar o código inicial de um sistema de cantina escolar completo, com backend em Spring Boot e frontend em Angular, ambos preparados para serem executados em Docker e com classes/métodos nomeados em português (PT-BR).

✨ Estrutura do Projeto ✨
O projeto será dividido em três componentes principais, orquestrados via Docker Compose:

Backend (Spring Boot): ☕ Lógica de negócio, API RESTful e persistência de dados.
Frontend (Angular): 🅰️ Interface do usuário e comunicação com o backend.
Banco de Dados (PostgreSQL): 🐘 Armazenamento das informações do sistema.
Backend (Spring Boot)
O backend será desenvolvido com Spring Boot, utilizando Java 17+ e as seguintes dependências:

Spring Web: 🌐 Para a criação de APIs RESTful.
Spring Data JPA: 💾 Para interação com o banco de dados.
PostgreSQL Driver: 🔗 Driver de conexão com o PostgreSQL.
Spring Security (com JWT): 🔒 Para autenticação e autorização de usuários.
Lombok: 🛠️ Para reduzir o boilerplate code (getters, setters, construtores, etc.).