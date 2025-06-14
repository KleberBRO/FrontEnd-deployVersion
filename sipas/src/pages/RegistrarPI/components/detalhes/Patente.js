import React from 'react';

function Patente({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Patente</h2>
            <div className="form-group">
                <label htmlFor="tipoPatente">Tipo de Patente</label>
                <input
                    type="text"
                    id="tipoPatente"
                    name="tipoPatente"
                    placeholder="Digite o tipo de patente (ex: invenção, modelo de utilidade)"
                    value={formData.tipoPatente || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="classificacao">Classificação da Patente</label>
                <input
                    type="text"
                    id="classificacao"
                    name="classificacao"
                    placeholder="Digite a classificação da patente"
                    value={formData.classificacao || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default Patente;
