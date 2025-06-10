import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EscolherPI from './pages/EscolherPI.js';
import PropriedadesInt from './pages/PropriedadesInt.js';
import RegistrarPI from './pages/RegistrarPI.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/escolher-pi" element={<EscolherPI />} />
        <Route path="/propriedades-registradas" element={<PropriedadesInt/>} />
        <Route path="/registrar-pi" element={<RegistrarPI />} />
      </Routes>
    </Router>
  );
}

export default App;