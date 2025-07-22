import React from 'react';

function StepInventor({ formData, handleChange }) {
    return (
        <>
            <h2>Informações do Inventor</h2>
            {/* Campo Nome do Inventor */}
            <div className="form-group">
                <label htmlFor="inventorName">Nome do Inventor</label>
                <input
                    type="text"
                    id="inventorName"
                    name="inventorName" // CORRIGIDO
                    placeholder="Digite o nome completo do inventor"
                    value={formData.inventorName} // CORRIGIDO
                    onChange={handleChange} // Adicionado para garantir a atualização
                />
            </div>

            {/* Campo E-mail do Inventor */}
            <div className="form-group">
                <label htmlFor="email">E-mail do Inventor</label>
                <input
                    type="email"
                    id="email"
                    name="email" // CORRIGIDO
                    placeholder="Digite o e-mail do inventor"
                    value={formData.email} // CORRIGIDO
                    onChange={handleChange} // Adicionado
                />
            </div>

            {/* Campo CPF do Inventor */}
            <div className="form-group">
                <label htmlFor="cpf">CPF do Inventor</label>
                <input
                    type="text"
                    id="cpf"
                    name="cpf" // CORRIGIDO
                    placeholder="Digite o CPF do inventor"
                    value={formData.cpf} // CORRIGIDO
                    onChange={handleChange} // Adicionado
                />
            </div>

            
        </>
    );
}

export default StepInventor;