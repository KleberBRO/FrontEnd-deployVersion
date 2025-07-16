import React from 'react';

function DesenhoInd({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes do Desenho Industrial</h2>
            
            <div className="form-group">
                <label htmlFor="locarnoClassification">Classificação de Locarno *</label>
                <input
                    type="text"
                    id="locarnoClassification"
                    name="locarnoClassification"
                    placeholder="Digite a classificação de Locarno (ex: 01-01)"
                    value={formData.locarnoClassification || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="numberOfVariations">Número de Variações *</label>
                <input
                    type="number"
                    id="numberOfVariations"
                    name="numberOfVariations"
                    placeholder="Digite o número de variações do desenho"
                    value={formData.numberOfVariations || ''}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="designCreationDate">Data de Criação do Desenho *</label>
                <input
                    type="date"
                    id="designCreationDate"
                    name="designCreationDate"
                    value={formData.designCreationDate || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="applicationField">Campo de Aplicação *</label>
                <textarea
                    id="applicationField"
                    name="applicationField"
                    placeholder="Descreva o campo de aplicação do desenho industrial (ex: móveis, utensílios domésticos, eletrônicos)"
                    value={formData.applicationField || ''}
                    onChange={handleChange}
                    rows={3}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="unionistPriority">Prioridade Unionista</label>
                <select
                    id="unionistPriority"
                    name="unionistPriority"
                    value={formData.unionistPriority || ''}
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

export default DesenhoInd;