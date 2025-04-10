import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../estilos/FormAluno.module.css";
import cardStyles from "../estilos/CadastrarAluno.module.css";

const FormAluno = () => {
  const [form, setForm] = useState({
    nome: "",
    matricula: "",
    curso: "",
    data_nascimento: "",
    cpf: ""
  });

  const [alunoNome, setAlunoNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erroBusca, setErroBusca] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const editando = !!id;

  useEffect(() => {
    if (editando) {
      setCarregando(true);
      axios.get(`http://localhost:9000/alunos/${id}`)
        .then((res) => {
          const aluno = res.data;
          setForm({
            nome: aluno.nome,
            matricula: aluno.matricula,
            curso: aluno.curso,
            data_nascimento: aluno.data_nascimento?.split("T")[0],
            cpf: aluno.cpf
          });
          setAlunoNome(aluno.nome);
          setErroBusca(false);
        })
        .catch(() => {
          setErroBusca(true);
        })
        .finally(() => {
          setCarregando(false);
        });
    }
  }, [editando, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!form.nome.trim()) {
      return alert("O campo NOME é obrigatório.");
    }

    if (!form.matricula.trim()) {
      return alert("O campo MATRÍCULA é obrigatório.");
    }

    if (!form.curso.trim()) {
      return alert("O campo CURSO é obrigatório.");
    }

    if (!form.data_nascimento) {
      return alert("O campo DATA DE NASCIMENTO é obrigatório.");
    }

    const dataValida = !isNaN(new Date(form.data_nascimento).getTime());
    if (!dataValida) {
      return alert("A DATA DE NASCIMENTO é inválida.");
    }

    const cpfLimpo = form.cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      return alert("O CPF deve conter exatamente 11 dígitos.");
    }


    if (editando) {
      axios.put(`http://localhost:9000/alunos/${id}`, form)
        .then(() => {
          alert("ALUNO ATUALIZADO!");
          navigate("/alunos");
        })
        .catch((err) => {
          alert("ERRO AO ATUALIZAR: " + (err.response?.data?.erro || err.message));
        });
    } else {
      axios.post("http://localhost:9000/alunos", form)
        .then(() => {
          alert("ALUNO CADASTRADO!");
          setForm({ nome: "", matricula: "", curso: "", data_nascimento: "", cpf: "" });
        })
        .catch((err) => {
          alert("ERRO AO CADASTRAR: " + (err.response?.data?.erro || err.message));
        });
    }
  };

  if (carregando) {
    return (
      <div className={cardStyles.container}>
        <div className={cardStyles.card}>
          <p>Carregando aluno...</p>
        </div>
      </div>
    );
  }

  if (erroBusca) {
    return (
      <div className={cardStyles.container}>
        <div className={cardStyles.card}>
          <p style={{ color: "red" }}>Aluno não encontrado. Verifique o ID na URL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.card}>
        {editando && alunoNome && (
          <h2 className={cardStyles.titulo}>EDITANDO ALUNO: {alunoNome.toUpperCase()}</h2>
        )}
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input
            name="nome"
            placeholder="NOME"
            value={form.nome}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="matricula"
            placeholder="MATRÍCULA"
            value={form.matricula}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="curso"
            placeholder="CURSO"
            value={form.curso}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="data_nascimento"
            type="date"
            value={form.data_nascimento}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            className={styles.input}
            disabled={editando}
          />
          <button type="submit" className={styles.botao}>
            {editando ? "SALVAR ALTERAÇÕES" : "CADASTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAluno;
