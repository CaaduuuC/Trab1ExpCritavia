import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../estilos/ListarEditarAlunos.module.css";

const ListarEditarAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9000/alunos")
      .then(res => setAlunos(res.data))
      .catch(err => console.error("Erro ao buscar alunos:", err));
  }, []);

  const editar = (id) => {
    navigate(`/editar/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>LISTAR / EDITAR ALUNOS</h2>
        <div className={styles.lista}>
          {alunos.map((aluno) => (
            <div key={aluno.id} className={styles.item}>
              <div className={styles.info}><span className={styles.rotulo}>NOME:</span> {aluno.nome}</div>
              <div className={styles.info}><span className={styles.rotulo}>MATRÍCULA:</span> {aluno.matricula}</div>
              <div className={styles.info}><span className={styles.rotulo}>CURSO:</span> {aluno.curso}</div>
              <div className={styles.info}><span className={styles.rotulo}>DATA DE NASCIMENTO:</span> {new Date(aluno.data_nascimento).toLocaleDateString()}</div>
              <div className={styles.info}><span className={styles.rotulo}>CPF:</span> {aluno.cpf}</div>
              <button onClick={() => editar(aluno.id)} className={styles.botao}>
                EDITAR
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListarEditarAlunos;
