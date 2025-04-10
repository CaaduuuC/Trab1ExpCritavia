import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "escola"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL!");
  }
});

// Rota para listar todos os alunos
app.get("/alunos", (req, res) => {
  db.query("SELECT * FROM alunos", (err, data) => {
    if (err) return res.status(500).json({ erro: err });
    return res.status(200).json(data);
  });
});

// Rota para buscar um aluno por ID
app.get("/alunos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM alunos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro interno no servidor" });
    if (result.length === 0) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }
    return res.status(200).json(result[0]);
  });
});

// Rota para adicionar um novo aluno
app.post("/alunos", (req, res) => {
  const { nome, matricula, curso, data_nascimento, cpf } = req.body;

  // Validação básica
  if (!nome || !matricula || !cpf) {
    return res.status(400).json({ erro: "Nome, matrícula e CPF são obrigatórios." });
  }

  const query = `
    INSERT INTO alunos (nome, matricula, curso, data_nascimento, cpf)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [nome, matricula, curso, data_nascimento, cpf], (err) => {
    if (err) return res.status(500).json({ erro: err });
    return res.status(201).json({ msg: "Aluno adicionado com sucesso!" });
  });
});

// Rota para atualizar um aluno existente
app.put("/alunos/:id", (req, res) => {
  const { nome, matricula, curso, data_nascimento, cpf } = req.body;
  const id = req.params.id;

  // Validação básica
  if (!nome || !matricula || !cpf) {
    return res.status(400).json({ erro: "Nome, matrícula e CPF são obrigatórios." });
  }

  const query = `
    UPDATE alunos SET nome = ?, matricula = ?, curso = ?, data_nascimento = ?, cpf = ?
    WHERE id = ?
  `;

  db.query(query, [nome, matricula, curso, data_nascimento, cpf, id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    return res.status(200).json({ msg: "Aluno atualizado com sucesso!" });
  });
});

// Rota para deletar um aluno
app.delete("/alunos/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM alunos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    return res.status(200).json({ msg: "Aluno deletado com sucesso!" });
  });
});

app.listen(9000, () => {
  console.log("Servidor rodando na porta 9000 🔥");
});
