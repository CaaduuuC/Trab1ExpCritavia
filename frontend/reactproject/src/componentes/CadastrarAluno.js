import React from "react";
import FormAluno from "./FormAluno";
import styles from "../estilos/CadastrarAluno.module.css";

const CadastrarAluno = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.titulo}>CADASTRAR NOVO ALUNO</h2>
        <FormAluno />
      </div>
    </div>
  );
};

export default CadastrarAluno;
