import React from 'react';

function Indicacao({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Indicação Geográfica</h2>
            <div className="form-group">
                <label htmlFor="nomeIndicacao">Nome da Indicação Geográfica</label>
                <input
                    type="text"
                    id="nomeIndicacao"
                    name="nomeIndicacao"
                    placeholder="Digite o nome da indicação geográfica"
                    value={formData.nomeIndicacao || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="produtoServico">Produto ou Serviço</label>
                <input
                    type="text"
                    id="produtoServico"
                    name="produtoServico"
                    placeholder="Digite o produto ou serviço relacionado à indicação geográfica"
                    value={formData.produtoServico || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="delimitacao">Delimitação Geográfica</label>
                <input
                    type="text"
                    id="delimitacao"
                    name="delimitacao"
                    placeholder="Digite a delimitação geográfica da indicação"
                    value={formData.delimitacao || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="pais">País de Origem</label>
                <input
                    type="text"
                    id="pais"
                    name="pais"
                    placeholder="Digite o país de origem da indicação geográfica"
                    value={formData.pais || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default Indicacao;
