import React from 'react';

function DesenhoInd({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes do Desenho Industrial</h2>
            <div className="form-group">
                <label htmlFor="tipoDesenho">Tipo de Desenho Industrial</label>
                <input
                    type="text"
                    id="tipoDesenho"
                    name="tipoDesenho"
                    placeholder="Digite o tipo de desenho industrial"
                    value={formData.tipoDesenho || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="classificacaoDesenho">Classificação do Desenho</label>
                <input
                    type="text"
                    id="classificacaoDesenho"
                    name="classificacaoDesenho"
                    placeholder="Digite a classificação do desenho industrial"
                    value={formData.classificacaoDesenho || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="numeroVariacao">Número de Variação</label>
                <input
                    type="text"
                    id="numeroVariacao"
                    name="numeroVariacao"
                    placeholder="Digite o número de variação do desenho industrial"
                    value={formData.numeroVariacao || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="prioridade">Prioridade</label>
                <input
                    type="text"
                    id="prioridade"
                    name="prioridade"
                    placeholder="Digite a prioridade do desenho industrial"
                    value={formData.prioridade || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="camposAplicacao">Campos de Aplicação</label>
                <input
                    type="text"
                    id="camposAplicacao"
                    name="camposAplicacao"
                    placeholder="Digite os campos de aplicação do desenho industrial"
                    value={formData.camposAplicacao || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default DesenhoInd;
