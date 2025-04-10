import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../estilos/ListarEditarAlunos.module.css";

const ListarEditarAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [mostrarDetalhes, setMostrarDetalhes] = useState({}); // controla quais cards estão expandidos
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9000/alunos")
      .then(res => setAlunos(res.data))
      .catch(err => console.error("Erro ao buscar alunos:", err));
  }, []);

  const toggleDetalhes = (id) => {
    setMostrarDetalhes(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

              {mostrarDetalhes[aluno.id] && (
                <>
                  <div className={styles.info}><span className={styles.rotulo}>CURSO:</span> {aluno.curso}</div>
                  <div className={styles.info}><span className={styles.rotulo}>DATA DE NASCIMENTO:</span> {new Date(aluno.data_nascimento).toLocaleDateString()}</div>
                  <div className={styles.info}><span className={styles.rotulo}>CPF:</span> {aluno.cpf}</div>
                </>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button onClick={() => toggleDetalhes(aluno.id)} className={styles.botao}>
                  {mostrarDetalhes[aluno.id] ? "ESCONDER" : "DETALHAR"}
                </button>
                <button onClick={() => editar(aluno.id)} className={styles.botao}>
                  EDITAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListarEditarAlunos;
