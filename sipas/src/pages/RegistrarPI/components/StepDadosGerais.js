import React from 'react';

function StepDadosGerais({ formData, handleChange }) {
    return (
        <>
            <h2>Dados Gerais</h2>
            <div className="form-group">
                <label htmlFor="title">Título da Propriedade</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Digite o título ou nome da criação"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Descreva a criação, invenção ou obra"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

             {/* --- BLOCO CORRIGIDO --- */}
            <div className="form-group">
                <label htmlFor="departamento">Departamento</label>
                <select
                    id="departamento" // CORRIGIDO
                    name="departamento" // CORRIGIDO
                    value={formData.departamento} // CORRIGIDO
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecionar Departamento</option>
                    <option value="Computação">Computação</option>
                    <option value="Engenharia florestal">Engenharia florestal</option>
                    <option value="Veterinária">Veterinária</option>
                    <option value="Agropecuária">Agropecuária</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="grantDate">Data de Concessão</label>
                <input
                    type="date"
                    id="grantDate"
                    name="grantDate"
                    value={formData.grantDate}
                    onChange={handleChange}
                    min="1900-01-01"
                    max="2100-12-31"
                />
            </div>

            <div className="form-group">
                <label htmlFor="expirationDate">Data de Expiração</label>
                <input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    min="1900-01-01"
                    max="2100-12-31"
                />
            </div>

            <div className="form-group">
                <label htmlFor="processingStage">Status atual</label>
                <select
                    id="processingStage"
                    name="processingStage"
                    value={formData.processingStage}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o status</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="APROVADO">Aprovado</option>
                    <option value="REJEITADO">Rejeitado</option>
                    <option value="EM_ANALISE">Em Análise</option>
                </select>
            </div>
        </>
    );
}

export default StepDadosGerais;