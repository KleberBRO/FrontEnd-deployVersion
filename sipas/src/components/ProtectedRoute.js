import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, requiredRole }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = authService.getCurrentUser();

            // Se o usuário existe mas não tem role, tentar buscar
            if (currentUser && !currentUser.role && currentUser.token) {
                const role = await authService.fetchUserRole(currentUser.token);
                if (role) {
                    currentUser.role = role;
                }
            }

            setUser(currentUser);
            setLoading(false);
        };

        checkUser();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        alert('Acesso negado. Você não tem permissão para acessar esta página.');
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;