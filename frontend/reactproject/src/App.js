import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./componentes/Header";
import ListarEditarAlunos from "./componentes/ListarEditarAlunos";
import CadastrarAluno from "./componentes/CadastrarAluno";
import RemoverAluno from "./componentes/RemoverAluno";
import FormAluno from "./componentes/FormAluno"; // necessário para edição

function App() {
  return (
    <Router>
      <Header />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/alunos" />} />
          <Route path="/alunos" element={<ListarEditarAlunos />} />
          <Route path="/cadastrar" element={<CadastrarAluno />} />
          <Route path="/remover" element={<RemoverAluno />} />
          <Route path="/editar/:id" element={<FormAluno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
