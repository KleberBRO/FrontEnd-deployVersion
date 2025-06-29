import React, { useState } from 'react';

const TabelaUsuarios = ({ usuarios = [], onEdit, onDelete }) => {

    return (
        <div className="tabela-container">
            
            <table className="tabela-usuarios">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>função</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.role}</td>
                            <td>
                                <button onClick={() => onEdit(usuario)}>Editar</button>
                                <button onClick={() => onDelete(usuario.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaUsuarios;