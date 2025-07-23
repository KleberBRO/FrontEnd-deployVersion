import React from 'react';

function Software({ formData, handleChange }) {
    return (
        <>
            <h2>Detalhes do Software</h2>
            
            <div className="form-group">
                <label htmlFor="holderName">Nome do Titular *</label>
                <input
                    type="text"
                    id="holderName"
                    name="holderName"
                    placeholder="Digite o nome do titular do software"
                    value={formData.holderName || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="holderAddress">Endereço do Titular *</label>
                <input
                    type="text"
                    id="holderAddress"
                    name="holderAddress"
                    placeholder="Digite o endereço completo do titular"
                    value={formData.holderAddress || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="holderCpfCnpj">CPF/CNPJ do Titular *</label>
                <input
                    type="text"
                    id="holderCpfCnpj"
                    name="holderCpfCnpj"
                    placeholder="Digite o CPF ou CNPJ do titular"
                    value={formData.holderCpfCnpj || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="authorsData">Dados dos Autores *</label>
                <textarea
                    id="authorsData"
                    name="authorsData"
                    placeholder="Digite os dados completos dos autores do software"
                    value={formData.authorsData || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="creationDate">Data de Criação *</label>
                <input
                    type="date"
                    id="creationDate"
                    name="creationDate"
                    value={formData.creationDate || ''}
                    onChange={handleChange}
                    required
                    min="1900-01-01"
                    max="2100-12-31"
                />
            </div>

            <div className="form-group">
                <label htmlFor="publicationDate">Data de Publicação</label>
                <input
                    type="date"
                    id="publicationDate"
                    name="publicationDate"
                    value={formData.publicationDate || ''}
                    onChange={handleChange}
                    min="1900-01-01"
                    max="2100-12-31"
                />
            </div>

            <div className="form-group">
                <label htmlFor="programmingLanguage">Linguagem de Programação *</label>
                <input
                    type="text"
                    id="programmingLanguage"
                    name="programmingLanguage"
                    placeholder="Digite a linguagem de programação utilizada (ex: Java, Python, JavaScript)"
                    value={formData.programmingLanguage || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="applicationField">Campo de Aplicação *</label>
                <input
                    type="text"
                    id="applicationField"
                    name="applicationField"
                    placeholder="Digite o campo de aplicação do software (ex: educação, saúde, finanças)"
                    value={formData.applicationField || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="programType">Tipo de Programa *</label>
                <select
                    id="programType"
                    name="programType"
                    value={formData.programType || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o tipo de programa</option>
                    <option value="APLICATIVO_DESKTOP">Aplicativo Desktop</option>
                    <option value="APLICATIVO_WEB">Aplicativo Web</option>
                    <option value="APLICATIVO_MOBILE">Aplicativo Mobile</option>
                    <option value="SISTEMA_OPERACIONAL">Sistema Operacional</option>
                    <option value="BIBLIOTECA">Biblioteca</option>
                    <option value="FRAMEWORK">Framework</option>
                    <option value="PLUGIN">Plugin</option>
                    <option value="SCRIPT">Script</option>
                    <option value="OUTRO">Outro</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="algorithm">Algoritmo</label>
                <textarea
                    id="algorithm"
                    name="algorithm"
                    placeholder="Descreva o algoritmo principal utilizado no software"
                    value={formData.algorithm || ''}
                    onChange={handleChange}
                    rows={4}
                />
            </div>

            <div className="form-group">
                <label htmlFor="hashDescription">Descrição do Hash</label>
                <textarea
                    id="hashDescription"
                    name="hashDescription"
                    placeholder="Digite a descrição do hash de verificação do software"
                    value={formData.hashDescription || ''}
                    onChange={handleChange}
                    rows={3}
                />
            </div>

            <div className="form-group">
                <label htmlFor="authorizedDerivation">Derivação Autorizada *</label>
                <select
                    id="authorizedDerivation"
                    name="authorizedDerivation"
                    value={formData.authorizedDerivation || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione uma opção</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="sourceCodePath">Caminho do Código-fonte *</label>
                <input
                    type="text"
                    id="sourceCodePath"
                    name="sourceCodePath"
                    placeholder="Digite o caminho ou localização do código-fonte"
                    value={formData.sourceCodePath || ''}
                    onChange={handleChange}
                    required
                />
            </div>
        </>
    );
}

export default Software;