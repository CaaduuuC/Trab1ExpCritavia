# 🎓 Gerenciador de Alunos — CRUD Web

Este é um sistema web completo de gerenciamento de alunos, desenvolvido com:

- ✅ **React** no frontend
- ✅ **Node.js com Express** no backend
- ✅ **MySQL** como banco de dados relacional

O sistema permite cadastrar, listar, editar, remover e visualizar detalhes dos alunos. Também conta com validações de dados como CPF, campos obrigatórios e datas válidas.

---

## 🗂 Estrutura do Projeto

```
/frontend         → Aplicação React (interface)
/backend          → API Node.js com Express
/database         → Dump SQL do banco de dados
```

---

## ⚙️ Pré-requisitos

Para rodar o sistema, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- Um cliente como o [MySQL Workbench](https://www.mysql.com/products/workbench/) (opcional, mas recomendado)

---

## 🔧 Passo a passo para rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

---

### 2️⃣ Importar o banco de dados

1. Abra o **MySQL Workbench** (ou outro cliente MySQL)
2. Vá em **Server > Data Import**
3. Selecione: `Import from Self-Contained File`
4. Escolha o arquivo:  
   `./database/escola.sql`
5. Escolha o nome do schema como **escola**
6. Clique em **Start Import**

---

### 3️⃣ Rodar o backend (Node.js)

```bash
cd backend
npm install
npm start
```

- O servidor backend iniciará em `http://localhost:9000`
- Ele se conecta ao banco `escola` com:
  - **Usuário:** root
  - **Senha:** root  
  (altere no `backend/app.js` se seus dados forem diferentes)

---

### 4️⃣ Rodar o frontend (React)

```bash
cd frontend
npm install
npm start
```

- O React abrirá em `http://localhost:3000`
- Ele faz requisições para o backend na porta `9000`

---

## 👤 Desenvolvedor
**Carlos Brandt**  
Projeto acadêmico — PUCPR  
Período: 5º período de Ciência da Computação

---

## 📝 Observações

- Certifique-se de que o **MySQL está rodando** antes de iniciar o backend
- Se sua senha ou usuário do banco forem diferentes de `root`, altere no `backend/app.js`
- O projeto **não inclui node_modules** — use `npm install` nas pastas `/frontend` e `/backend`

---

