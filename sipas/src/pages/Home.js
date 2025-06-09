import React from 'react';
import '../styles/Home.css';
import Header from '../components/Header';

function App() {
  return (
    <>
      <Header/>
        <div className="home-background">
            <h1>PORTAL SIGPS</h1>
            <div className="home-content">
            <button className="registrar-pi">Registrar PI</button>
            <button className="consultar-pi">Propriedades Registradas</button>
            <button className="pedidos-andamento">Pedidos em Andamento</button>
            <button className="gerar-relatorio">Gerar Relatório</button>
            </div>
        </div>
      
    </>
  );
}

export default App;
