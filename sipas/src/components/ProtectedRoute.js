import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = authService.getCurrentUser();

    // Debug logs
    console.log('ProtectedRoute - User:', user);
    console.log('ProtectedRoute - Required Role:', requiredRole);
    console.log('ProtectedRoute - User Roles:', user?.roles);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && !user.roles.includes(requiredRole)) {
        alert('Acesso negado. Você não tem permissão para acessar esta página.');
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;