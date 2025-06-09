import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EscolherPI from './pages/EscolherPI.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/escolher-pi" element={<EscolherPI />} />
      </Routes>
    </Router>
  );
}

export default App;