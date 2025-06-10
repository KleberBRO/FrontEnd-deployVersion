import React from 'react';

function Software({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes do Software</h2>
            <div className="form-group">
                <label htmlFor="tipoSoftware">Tipo de Software</label>
                <input
                    type="text"
                    id="tipoSoftware"
                    name="tipoSoftware"
                    placeholder="Digite o tipo de software (ex: aplicativo, sistema)"
                    value={formData.tipoSoftware || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="linguagem">detalhes</label>
                <input
                    type="text"
                    id="linguagem"
                    name="linguagem"
                    placeholder="Digite a linguagem de programação utilizada"
                    value={formData.linguagem || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="algoritmo">
                <label htmlFor="algoritmo">Algoritmo</label>
                <textarea
                    id="algoritmo"
                    name="algoritmo"
                    placeholder="Descreva o algoritmo utilizado no software"
                    value={formData.algoritmo || ''}
                    onChange={handleChange}
                ></textarea>
            </div>
        </>
    );
}

export default Software;
