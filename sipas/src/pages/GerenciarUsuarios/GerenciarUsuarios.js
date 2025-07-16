import React, { useState, useEffect} from 'react';
import './GerenciarUsuarios.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import TabelaUsuarios from './components/TabelaUsuarios';
import AddUsuario from './components/AddUsuario';
import { API_BASE_URL } from '../../config/api.js';

const GerenciarUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchUsuarios = async () => {
    try {
        setLoading(true);
        
        // Recuperar o token do localStorage ou sessionStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }
        
        const response = await fetch(API_BASE_URL+'/v1/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        
        const data = await response.json();
        setUsuarios(data);
    } catch (err) {
        setError('Falha ao carregar usuários: ' + err.message);
        console.error('Erro ao buscar usuários:', err);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleEdit = (usuario) => {
        // Implementar lógica de edição
        console.log("Editar usuário:", usuario);
    };

    const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }
            
            const response = await fetch(`${API_BASE_URL}/v1/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }

            // Atualizar a lista após exclusão
            fetchUsuarios();
        } catch (err) {
            setError('Falha ao excluir usuário: ' + err.message);
            console.error('Erro ao excluir usuário:', err);
        }
    }
};

    const handleAddUsuario = (newUsuario) => {
        setUsuarios([...usuarios, newUsuario]);
    };

    return (
        <>
            <Header />
            <div className="gerenciar-usuarios-container">
                <div className="gerenciar-usuarios-content">
                    <button 
                        className="btn-adicionar-usuario" 
                        onClick={() => setIsModalOpen(true)}>
                        Adicionar
                    </button>

                    <button 
                        className='btn-voltar-usuario' 
                        onClick={() => navigate('/home')}>
                        voltar
                    </button>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    {loading ? (
                        <p>Carregando usuários...</p>
                    ) : (
                        <TabelaUsuarios 
                            usuarios={usuarios} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                        />
                    )}
                </div>
            </div>
            
            <AddUsuario 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddUsuario={handleAddUsuario}
            />
        </>
    );
};

export default GerenciarUsuarios;