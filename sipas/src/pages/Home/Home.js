import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { authService } from '../../services/authService';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/Login');
  };

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
            <button className="Cadastro-startup" onClick={() => navigate('/cadastro-startup')}
            >Cadastrar Startup</button>
            <button className="gerar-relatorio" onClick={() => navigate('/gerar-relatorio')}>Gerar Relatório</button>
            <button className='gerenciar-usuarios' onClick={() => navigate('/Gerenciar-usuarios')}
            >Usuários</button>
            <button className="sair" onClick={handleLogout}>Sair</button>
            </div>
        </div>
      
    </>
  );
}

export default App;