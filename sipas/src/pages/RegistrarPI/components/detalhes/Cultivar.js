import React from 'react';

function Cultivar({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Cultivar</h2>
            
            <div className="form-group">
                <label htmlFor="cultivarName">Nome do Cultivar *</label>
                <input
                    type="text"
                    id="cultivarName"
                    name="cultivarName"
                    placeholder="Digite o nome do cultivar"
                    value={formData.cultivarName || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="botanicalSpecies">Espécie Botânica *</label>
                <input
                    type="text"
                    id="botanicalSpecies"
                    name="botanicalSpecies"
                    placeholder="Digite a espécie botânica (ex: Solanum lycopersicum)"
                    value={formData.botanicalSpecies || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="commercialDenomination">Denominação Comercial</label>
                <input
                    type="text"
                    id="commercialDenomination"
                    name="commercialDenomination"
                    placeholder="Digite a denominação comercial (opcional)"
                    value={formData.commercialDenomination || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="origin">Origem *</label>
                <input
                    type="text"
                    id="origin"
                    name="origin"
                    placeholder="Digite a origem do cultivar"
                    value={formData.origin || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="distinctiveCharacteristics">Características Distintivas *</label>
                <textarea
                    id="distinctiveCharacteristics"
                    name="distinctiveCharacteristics"
                    placeholder="Descreva as características distintivas do cultivar"
                    value={formData.distinctiveCharacteristics || ''}
                    onChange={handleChange}
                    rows={4}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="purposeOfUse">Finalidade de Uso *</label>
                <select
                    id="purposeOfUse"
                    name="purposeOfUse"
                    value={formData.purposeOfUse || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione a finalidade de uso</option>
                    <option value="ALIMENTACAO_HUMANA">Alimentação Humana</option>
                    <option value="ALIMENTACAO_ANIMAL">Alimentação Animal</option>
                    <option value="ORNAMENTAL">Ornamental</option>
                    <option value="MEDICINAL">Medicinal</option>
                    <option value="INDUSTRIAL">Industrial</option>
                    <option value="FORRAGEIRA">Forrageira</option>
                    <option value="FIBRA">Fibra</option>
                    <option value="OUTRO">Outro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="countryOfOrigin">País de Obtenção *</label>
                <input
                    type="text"
                    id="countryOfOrigin"
                    name="countryOfOrigin"
                    placeholder="Digite o país onde o cultivar foi obtido"
                    value={formData.countryOfOrigin || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="protectionType">Tipo de Proteção *</label>
                <select
                    id="protectionType"
                    name="protectionType"
                    value={formData.protectionType || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o tipo de proteção</option>
                    <option value="CULTIVAR">Cultivar</option>
                    <option value="ESSENCIALMENTE_DERIVADA">Essencialmente Derivada</option>
                    <option value="VARIEDADE_LOCAL">Variedade Local</option>
                    <option value="LINHA_ENDOGAMICA">Linha Endogâmica</option>
                    <option value="HIBRIDO">Híbrido</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="creationDevelopmentDate">Data de Criação/Desenvolvimento *</label>
                <input
                    type="date"
                    id="creationDevelopmentDate"
                    name="creationDevelopmentDate"
                    value={formData.creationDevelopmentDate || ''}
                    onChange={handleChange}
                    required
                    min="1900-01-01"
                    max="2100-12-31"
                />
            </div>

            <div className="form-group">
                <label htmlFor="dheData">Dados DHE</label>
                <textarea
                    id="dheData"
                    name="dheData"
                    placeholder="Digite os dados de Distinguibilidade, Homogeneidade e Estabilidade (DHE)"
                    value={formData.dheData || ''}
                    onChange={handleChange}
                    rows={3}
                />
            </div>
        </>
    );
}

export default Cultivar;