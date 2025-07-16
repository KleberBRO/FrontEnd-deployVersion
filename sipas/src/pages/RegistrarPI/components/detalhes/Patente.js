import React from 'react';

function Patente({ formData, handleChange }) {

    return (
        <>
            <h2>Detalhes da Patente</h2>
            
            <div className="form-group">
                <label htmlFor="patentType">Tipo de Patente</label>
                <select
                    id="patentType"
                    name="patentType"
                    value={formData?.patentType || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o tipo de patente</option>
                    <option value="INVENTION">Invenção</option>
                    <option value="UTILITY_MODEL">Modelo de Utilidade</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="internationalClassification">Classificação Internacional (IPC)</label>
                <input
                    type="text"
                    id="internationalClassification"
                    name="internationalClassification"
                    placeholder="Digite a classificação internacional (ex: A61K 31/00)"
                    value={formData?.internationalClassification || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="technicalApplicationField">Campo Técnico de Aplicação</label>
                <textarea
                    id="technicalApplicationField"
                    name="technicalApplicationField"
                    placeholder="Descreva o campo técnico de aplicação da patente"
                    value={formData?.technicalApplicationField || ''}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="filingDate">Data de Depósito</label>
                <input
                    type="date"
                    id="filingDate"
                    name="filingDate"
                    value={formData?.filingDate || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="priorityDate">Data de Prioridade</label>
                <input
                    type="date"
                    id="priorityDate"
                    name="priorityDate"
                    value={formData?.priorityDate || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="priorityCountry">País de Prioridade</label>
                <input
                    type="text"
                    id="priorityCountry"
                    name="priorityCountry"
                    placeholder="Digite o país de prioridade (ex: Brasil, Estados Unidos)"
                    value={formData?.priorityCountry || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="priorityNumber">Número de Prioridade</label>
                <input
                    type="text"
                    id="priorityNumber"
                    name="priorityNumber"
                    placeholder="Digite o número de prioridade"
                    value={formData?.priorityNumber || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="previousRequestRelated">Relacionado a Pedido Anterior?</label>
                <select
                    id="previousRequestRelated"
                    name="previousRequestRelated"
                    value={formData?.previousRequestRelated || ''}
                    onChange={handleChange}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
            </div>
        </>
    );
}

export default Patente;