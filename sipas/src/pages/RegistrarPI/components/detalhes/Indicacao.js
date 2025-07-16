import React from 'react';

function Indicacao({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Indicação Geográfica</h2>
            
            <div className="form-group">
                <label htmlFor="geographicName">Nome Geográfico *</label>
                <input
                    type="text"
                    id="geographicName"
                    name="geographicName"
                    placeholder="Digite o nome geográfico da indicação"
                    value={formData.geographicName || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="product">Produto ou Serviço Atrelado *</label>
                <input
                    type="text"
                    id="product"
                    name="product"
                    placeholder="Digite o produto ou serviço relacionado à indicação geográfica"
                    value={formData.product || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="areaDelimitation">Delimitação da Área *</label>
                <textarea
                    id="areaDelimitation"
                    name="areaDelimitation"
                    placeholder="Descreva detalhadamente a delimitação geográfica da área"
                    value={formData.areaDelimitation || ''}
                    onChange={handleChange}
                    rows={4}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="igNature">Natureza da IG *</label>
                <select
                    id="igNature"
                    name="igNature"
                    value={formData.igNature || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione a natureza da Indicação Geográfica</option>
                    <option value="INDICACAO_DE_PROCEDENCIA">Indicação de Procedência</option>
                    <option value="DENOMINACAO_DE_ORIGEM">Denominação de Origem</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="visualRepresentationUrl">URL da Representação Visual</label>
                <input
                    type="url"
                    id="visualRepresentationUrl"
                    name="visualRepresentationUrl"
                    placeholder="Digite a URL da representação visual da IG (opcional)"
                    value={formData.visualRepresentationUrl || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default Indicacao;