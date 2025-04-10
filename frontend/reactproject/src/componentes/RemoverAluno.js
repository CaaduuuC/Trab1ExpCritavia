import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../estilos/RemoverAluno.module.css";

const RemoverAluno = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    buscarAlunos();
  }, []);

  const buscarAlunos = () => {
    axios.get("http://localhost:9000/alunos")
      .then(res => setAlunos(res.data))
      .catch(err => console.error("Erro ao buscar alunos:", err));
  };

  const deletar = (id) => {
    if (window.confirm("Tem certeza que deseja remover este aluno?")) {
      axios.delete(`http://localhost:9000/alunos/${id}`)
        .then(() => {
          alert("Aluno removido!");
          buscarAlunos();
        })
        .catch(err => alert("Erro ao remover: " + err.message));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>REMOVER ALUNO</h2>
        <div className={styles.lista}>
          {alunos.map((aluno) => (
            <div key={aluno.id} className={styles.item}>
              <div>
                <div className={styles.nome}>{aluno.nome}</div>
                <div className={styles.matricula}>Matrícula: {aluno.matricula}</div>
              </div>
              <button onClick={() => deletar(aluno.id)} className={styles.botao}>
                REMOVER
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RemoverAluno;
