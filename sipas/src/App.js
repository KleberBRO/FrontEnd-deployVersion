import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Home from './pages/Home/Home.js';
import EscolherPI from './pages/EscolherPI/EscolherPI.js';
import PropriedadesInt from './pages/PropriedadesInt/PropriedadesInt.js';
import RegistrarPI from './pages/RegistrarPI/RegistrarPI.js';
import Login from './pages/Login/Login.js';
import CadastroStartup from './pages/CadastroStartup/CadastroStartup.js';
import GerenciarUsuarios from './pages/GerenciarUsuarios/GerenciarUsuarios.js';
import FeedbackSucesso from './pages/RegistrarPI/components/FeedbackSucesso';
import GerarRelatorio from './pages/GerarRelatorio/GerarRelatorio.js';
import ListagemStartups from "./pages/ListagemStartups/ListagemStartups";
import RegistrarInventor from './pages/RegistrarInventor/RegistrarInventor.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Login />} />
        <Route path="/registrar-inventor" element={<RegistrarInventor />} />

        {/* Rota Privada */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/escolher-pi" element={<EscolherPI />} />
          <Route path="/cadastro-startup" element={<CadastroStartup />} />
          <Route path="/propriedades-registradas" element={<PropriedadesInt/>} />
          <Route path="/registrar-pi" element={<RegistrarPI />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar-pi/sucesso" element={<FeedbackSucesso />} />
          <Route path="/gerar-relatorio" element={<GerarRelatorio />} />
          <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
            <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} />
            <Route path="/listagem-startups" element={<ListagemStartups />} />
          </Route>
        </Route>

        {/* Rota padrão para redirecionar para o login */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;