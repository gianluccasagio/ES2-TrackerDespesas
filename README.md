# 💰 Controle de Despesas Pessoais (Projeto ES2)

Sistema de gerenciamento financeiro desenvolvido para a disciplina de Engenharia de Software 2.
O projeto utiliza uma arquitetura **Client-Server** com **React** no frontend e **Node.js** no backend.

## 👥 Equipe
- **Pessoa 1:** Infraestrutura, CI e API Base.
- **Pessoa 2:** Interface (Frontend) e Integração.
- **Pessoa 3:** Lógica de Negócios (Observer Pattern) e Testes Unitários.
- **Pessoa 4:** Testes de Integração e Stubs.

## 🚀 Tecnologias
- **Backend:** Node.js, Express, SQLite, Knex.js.
- **Frontend:** React, Vite, Axios.
- **Qualidade:** Jest, Supertest, GitHub Actions.

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** (v18+) instalado.

### 1. Iniciar o Backend (API)
Abra um terminal:
```bash
cd backend
npm install
npx knex migrate:latest  # Cria o banco de dados
node src/server.js