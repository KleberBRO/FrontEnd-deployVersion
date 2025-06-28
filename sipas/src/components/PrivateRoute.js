import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/authService';

const PrivateRoute = () => {
  // Verifica se o usuário está autenticado
  const isAuthenticated = authService.isAuthenticated();

  // Se estiver autenticado, renderiza a rota filha (usando Outlet).
  // Caso contrário, redireciona para a página de Login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default PrivateRoute;