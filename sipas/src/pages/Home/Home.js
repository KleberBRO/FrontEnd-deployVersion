import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { authService } from '../../services/authService';

function App() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.roles.includes('ROLE_ADMIN');

  const handleLogout = () => {
    authService.logout();
    navigate('/');
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
            {isAdmin && (
              <>
                <button className="listagem-startups" onClick={() => navigate('/listagem-startups')}
                >Listagem de Startups</button>
                <button className="gerenciar-usuarios" onClick={() => navigate('/gerenciar-usuarios')}
                >Gerenciar Usuários</button>
              </>
            )}
            </div>
            <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
      
    </>
  );
}

export default App;