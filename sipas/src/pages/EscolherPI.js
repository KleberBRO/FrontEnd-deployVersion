import React from 'react';
import '../styles/EscolherPI.css';
import Header from '../components/Header';

function App() {
  return (
    <>
      <Header/>
        <div className="container">
            <h1>PORTAL SIGPS</h1>
            <div className="escolher-content">
            <button className="registrar-patente">Registrar Patente</button>
            <button className="registrar-marca">Registrar Marca</button>
            <button className="registrar-software">Registrar Software</button>
            <button className="registrar-desenho-industrial">Registrar Desenho Industrial</button>
            <button className="registrar-indicacao-geografica">Registrar Indicação Geográfica</button>
            <button className="registrar-cultivar">Registrar Cultivar</button>
            </div>
        </div>
    </>
  );
}

export default App;
