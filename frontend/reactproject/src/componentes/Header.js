import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../estilos/Header.module.css";

const Header = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.nome}>Gerenciador de Alunos Carlos Brandt</div>

        <div className={styles.links}>
          <Link
            to="/alunos"
            className={`${styles.link} ${location.pathname === "/alunos" ? styles.ativo : ""}`}
          >
            LISTAR / EDITAR
          </Link>
          <Link
            to="/cadastrar"
            className={`${styles.link} ${location.pathname === "/cadastrar" ? styles.ativo : ""}`}
          >
            CADASTRAR
          </Link>
          <Link
            to="/remover"
            className={`${styles.link} ${location.pathname === "/remover" ? styles.ativo : ""}`}
          >
            REMOVER
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
