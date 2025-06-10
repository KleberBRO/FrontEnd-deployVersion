import React from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header/>
        <div className="home-background">
            <h1>PORTAL SIGPS</h1>
            <div className="home-content">
            <button className="registrar-pi" onClick={() => navigate('/Escolher-pi')}
            >Registrar PI</button>
            <button className="Propriedades-registradas" onClick={() => navigate('/Propriedades-registradas')}
            >Propriedades Registradas</button>
            <button className="pedidos-andamento">Pedidos em Andamento</button>
            <button className="gerar-relatorio">Gerar Relatório</button>
            </div>
        </div>
      
    </>
  );
}

export default App;