import React from 'react';

function Marca({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes da Marca</h2>
            
            <div className="form-group">
                <label htmlFor="brandType">Tipo de Marca</label>
                <select
                    id="brandType"
                    name="brandType"
                    value={formData.brandType || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                    required
                >
                    <option value="">Selecione o tipo de marca</option>
                    <option value="NOMINATIVE">Nominativa</option>
                    <option value="FIGURATIVE">Figurativa</option>
                    <option value="MIXED">Mista</option>
                    <option value="TRIDIMENSIONAL">Tridimensional</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="brandName">Nome da Marca</label>
                <input
                    type="text"
                    id="brandName"
                    name="brandName"
                    placeholder="Digite o nome da marca"
                    value={formData.brandName || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="imageUrl">URL da Imagem</label>
                <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Digite a URL da imagem da marca (opcional)"
                    value={formData.imageUrl || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="niceClassificationCode">Código de Classificação de Nice</label>
                <input
                    type="text"
                    id="niceClassificationCode"
                    name="niceClassificationCode"
                    placeholder="Digite o código de classificação de Nice (ex: 09, 35, 42)"
                    value={formData.niceClassificationCode || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="activityDescription">Descrição da Atividade</label>
                <textarea
                    id="activityDescription"
                    name="activityDescription"
                    placeholder="Descreva as atividades relacionadas à marca"
                    value={formData.activityDescription || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="requestNature">Natureza da Solicitação</label>
                <input
                    type="text"
                    id="requestNature"
                    name="requestNature"
                    placeholder="Digite a natureza da solicitação (ex: registro, renovação)"
                    value={formData.requestNature || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="usageStatus">Status de Uso da Marca</label>
                <select
                    id="usageStatus"
                    name="usageStatus"
                    value={formData.usageStatus || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                    required
                >
                    <option value="">Selecione o status de uso</option>
                    <option value="EM_USO">Em Uso</option>
                    <option value="NAO_EM_USO">Não em Uso</option>
                    <option value="PRETENDE_USAR">Pretende Usar</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="startUsageDate">Data de Início do Uso</label>
                <input
                    type="date"
                    id="startUsageDate"
                    name="startUsageDate"
                    value={formData.startUsageDate || ''}
                    onChange={(e) => handleChange(e, 'marca')}
                    min="1900-01-01"
                    max="2100-12-31"
                />
                <small>Obrigatório apenas se a marca já estiver em uso</small>
            </div>
        </>
    );
}

export default Marca;
