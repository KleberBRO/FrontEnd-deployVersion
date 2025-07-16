import React from 'react';

function StepInventor({ formData, handleChange }) {
    return (
        <>
            <h2>Informações do inventor</h2>
            <div className="form-group">
                <label htmlFor="nomeInventor">Nome do Inventor</label>
                <input
                    type="text"
                    id="nomeInventor"
                    name="nomeInventor"
                    placeholder="Digite o nome completo do inventor"
                    value={formData.nomeInventor}
                />
            </div>
            <div className="form-group">
                <label htmlFor="emailInventor">E-mail do Inventor</label>
                <input
                    type="email"
                    id="emailInventor"
                    name="emailInventor"
                    placeholder="Digite o e-mail do inventor"
                    value={formData.emailInventor}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cpfInventor">CPF do Inventor</label>
                <input
                    type="text"
                    id="cpfInventor"
                    name="cpfInventor"
                    placeholder="Digite o CPF do inventor"
                    value={formData.cpfInventor}
                />
            </div>
        </>
    );
}

export default StepInventor;
