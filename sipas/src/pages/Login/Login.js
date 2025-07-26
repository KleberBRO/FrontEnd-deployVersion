import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../../components/Header';
import Notification from '../../components/Notification/Notification.js';
import { authService } from '../../services/authService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [erro, setErro] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário digitar
    if (erro) setErro('');
    if (notification.message) setNotification({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setCarregando(true);
  setErro('');
  setNotification({ message: '', type: '' });

  try {
    const response = await authService.login(formData.email, formData.password);

    // Armazenar e logar o token
    localStorage.setItem('token', response.token);
    const payload = JSON.parse(atob(response.token.split('.')[1]));

    navigate('/home');

  } catch (error) {
    setNotification({
      message: error.message || 'Erro inesperado',
      type: error.type || 'server'
    });
  } finally {
    setCarregando(false);
  }
};


  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };
  
  return (
    <>
      <Header/>
      <Notification 
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
      <div className="login-background">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <label htmlFor="email">usuário:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={carregando}
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange}
              required 
              disabled={carregando}
            />
          </div>
          <button type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
          {erro && (
            <p className='error-message'>
              *{erro}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default Login;