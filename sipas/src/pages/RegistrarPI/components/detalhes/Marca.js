import React from 'react';

function Marca({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Marca</h2>
            <div className="form-group">
                <label htmlFor="tipoMarca">Tipo de Marca</label>
                <input
                    type="text"
                    id="tipoMarca"
                    name="tipoMarca"
                    placeholder="Digite o tipo de marca (ex: nominativa, figurativa)"
                    value={formData.tipoMarca || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="classeMarca">Classe da Marca</label>
                <input
                    type="text"
                    id="classeMarca"
                    name="classeMarca"
                    placeholder="Digite a classe da marca"
                    value={formData.classeMarca || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="naturezaMarca">Natureza da Marca</label>
                <input
                    type="text"
                    id="naturezaMarca"
                    name="naturezaMarca"
                    placeholder="Digite a natureza da marca (ex: coletiva, individual)"
                    value={formData.naturezaMarca || ''}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="UsosMarca">Usos da Marca</label>
                <input
                    type="text"
                    id="UsosMarca"
                    name="UsosMarca"
                    placeholder="Digite os usos da marca"
                    value={formData.UsosMarca || ''}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}

export default Marca;
