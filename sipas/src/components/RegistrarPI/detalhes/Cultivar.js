import React from 'react';

function Cultivar({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Cultivar</h2>
            <div className="form-group">
                <label htmlFor="especieCultivar">Espécie da Cultivar</label>
                <input
                    type="text"
                    id="especieCultivar"
                    name="especieCultivar"
                    placeholder="Digite a espécie da cultivar"
                    value={formData.especieCultivar || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="denominacaoCultivar">Denominação da Cultivar</label>
                <input
                    type="text"
                    id="denominacaoCultivar"
                    name="denominacaoCultivar"
                    placeholder="Digite a denominação da cultivar"
                    value={formData.denominacaoCultivar || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="origemCultivar">Origem da Cultivar</label>
                <input
                    type="text"
                    id="origemCultivar"
                    name="origemCultivar"
                    placeholder="Digite a origem da cultivar"
                    value={formData.origemCultivar || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="caracteristicasCultivar">Características da Cultivar</label>
                <textarea
                    id="caracteristicasCultivar"
                    name="caracteristicasCultivar"
                    placeholder="Descreva as características da cultivar"
                    value={formData.caracteristicasCultivar || ''}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="finalidadeCultivar">Finalidade da Cultivar</label>
                <input
                    type="text"
                    id="finalidadeCultivar"
                    name="finalidadeCultivar"
                    placeholder="Digite a finalidade da cultivar"
                    value={formData.finalidadeCultivar || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="paisCultivar">País de Origem</label>
                <input
                    type="text"
                    id="paisCultivar"
                    name="paisCultivar"
                    placeholder="Digite o país de origem da cultivar"
                    value={formData.paisCultivar || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="tipoProtecao">Tipo de Proteção</label>
                <select
                    id="tipoProtecao"
                    name="tipoProtecao"
                    value={formData.tipoProtecao || ''}
                    onChange={handleChange}
                >
                    <option value="">Selecione o tipo de proteção</option>
                    <option value="cultivar">Cultivar</option>
                    <option value="semente">Semente</option>
                    <option value="outro">Outro</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="dataRegistro">Data de Registro</label>
                <input
                    type="date"
                    id="dataRegistro"
                    name="dataRegistro"
                    value={formData.dataRegistro || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="descricaoCultivar">Descrição da Cultivar</label>
                <textarea
                    id="descricaoCultivar"
                    name="descricaoCultivar"
                    placeholder="Descreva a cultivar"
                    value={formData.descricaoCultivar || ''}
                    onChange={handleChange}
                ></textarea>
            </div>
        </>
    );
}

export default Cultivar;
