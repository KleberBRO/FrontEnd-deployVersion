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

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_BASE_URL+'/user/');
            
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
                const response = await fetch(`http://localhost:8080/api/user/${id}`, {
                    method: 'DELETE'
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
                        className="adicionar-usuario" 
                        onClick={() => setIsModalOpen(true)}
                    >
                        Adicionar
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