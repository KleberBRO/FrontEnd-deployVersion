import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import EscolherPI from './pages/EscolherPI/EscolherPI.js';
import PropriedadesInt from './pages/PropriedadesInt/PropriedadesInt.js';
import RegistrarPI from './pages/RegistrarPI/RegistrarPI.js';
import Login from './pages/Login/Login.js';
import CadastroStartup from './pages/CadastroStartup/CadastroStartup.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/escolher-pi" element={<EscolherPI />} />
        <Route path="/cadastro-startup" element={<CadastroStartup />} />
        <Route path="/propriedades-registradas" element={<PropriedadesInt/>} />
        <Route path="/registrar-pi" element={<RegistrarPI />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;