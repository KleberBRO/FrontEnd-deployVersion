import React from 'react';

function StepDadosGerais({ formData, handleChange }) {
    return (
        <>
            <h2>Dados Gerais</h2>
            <div className="form-group">
                <label htmlFor="titulo">Título da Propriedade</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    placeholder="Digite o título ou nome da criação"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva a criação, invenção ou obra"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="departamento">Departamento</label>
                <select
                    id="departamento"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecionar Departamento</option>
                    <option value="Computação">Computação"</option>
                    <option value="Engenharia florestal">Engenharia florestal</option>
                    <option value="veterinária">veterinária</option>
                    <option value="agropecuaria">agropecuaria</option>
                    <option value="outro">Outro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="dataCriacao">Data de Criação</label>
                <input
                    type="date"
                    id="dataCriacao"
                    name="dataCriacao"
                    value={formData.dataCriacao}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="status">Status atual</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o status</option>
                    <option value="pendente">Pendente</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="rejeitado">Rejeitado</option>
                    <option value="em-analise">Em Análise</option>
                </select>
            </div>
        </>
    );
}

export default StepDadosGerais;
