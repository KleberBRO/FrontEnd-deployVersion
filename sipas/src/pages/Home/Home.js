import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

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
            <button className="gerar-relatorio">Gerar Relatório</button>
            <button className="sair" onClick={() => navigate('/Login')}>Sair</button>
            </div>
        </div>
      
    </>
  );
}

export default App;