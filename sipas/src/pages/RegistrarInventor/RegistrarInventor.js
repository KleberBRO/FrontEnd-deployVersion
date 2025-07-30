import React, { useState } from 'react';
import './RegistrarInventor.css';
import { API_BASE_URL } from '../../config/api';
import Header from '../../components/Header';
import Notification from '../../components/Notification/Notification';
import { useNavigate } from 'react-router-dom';

const RegistrarInventor = () => {
  const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
    name: '',
    dateBirth: '',
    email: '',
    cpf: '',
    nationality: '',
    address: '',
    password: '',
    course: '',
    department: '',
    });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setNotification({
          message: `Erro ao registrar usuário: ${errorData}`,
          type: 'error'
        });
        return;
      }

      setNotification({
        message: 'Usuário registrado com sucesso!',
        type: 'success'
      });
      
      // Limpar o formulário após sucesso
      setFormData({
        name: '',
        dateBirth: '',
        email: '',
        cpf: '',
        nationality: '',
        address: '',
        password: '',
        course: '',
        department: '',
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setNotification({
        message: `Erro ao registrar usuário: ${error.message}`,
        type: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <>
      <Header showHomeButton={false} />
      <div className="registrar-inventor-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateBirth">Data de Nascimento</label>
              <input
                type="date"
                id="dateBirth"
                name="dateBirth"
                value={formData.dateBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nacionalidade</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Endereço</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
                        <div className="form-group">
              <label htmlFor="course">Curso</label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Departamento</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="form-button back-button" onClick={handleBackToLogin}>
                Voltar
              </button>
              <button type="submit" className="form-button submit-button-registrar">Registrar</button>
            </div>
          </form>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={handleCloseNotification}
        duration={5000}
      />
    </>
  );
};

export default RegistrarInventor;