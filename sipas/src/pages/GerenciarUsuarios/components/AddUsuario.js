import React, { useState } from 'react';
import '../GerenciarUsuarios.css';
import { API_BASE_URL } from '../../../config/api';
import Notification from '../../../components/Notification/Notification';

const AddUsuario = ({ isOpen, onClose, onAddUsuario }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    role: '',
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
      const token = localStorage.getItem('token');

      if (!token) {
        setNotification({
          message: 'Token de autenticação não encontrado',
          type: 'error'
        });
        return;
      }

      const registerData = {
        username: formData.nome,
        email: formData.email,
        password: formData.senha,   
        cpf: formData.cpf,
        role: formData.role
      };

      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setNotification({
          message: `Erro ao adicionar usuário: ${errorData}`,
          type: 'error'
        });
        return;
      }

      setNotification({
        message: 'Usuário criado com sucesso!',
        type: 'success'
      });
      
      // Limpar o formulário após sucesso
      setFormData({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        role: '',
      });

      onAddUsuario({ 
        username: registerData.username, 
        email: registerData.email, 
        cpf: registerData.cpf, 
        role: registerData.role 
      });
      
      setTimeout(() => {
        onClose();
        setNotification({ message: '', type: '' });
      }, 2000);

    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      setNotification({
        message: `Erro ao adicionar usuário: ${error.message}`,
        type: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', type: '' });
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Adicionar Novo Usuário</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
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
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
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
            <label htmlFor="role">Função</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma função</option>
              <option value="ADMIN">Administrador</option>
              <option value="INVENTOR">Servidor</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
            <button type="submit" className="submit-button">Salvar</button>
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

export default AddUsuario;