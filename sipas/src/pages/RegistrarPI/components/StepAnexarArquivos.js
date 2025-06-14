import React from 'react';

function StepAnexarArquivo({ formData, handleChange }) {
    return (
        <>
            <div className="step-anexar-arquivo">
                <h2>Anexar Arquivos</h2>
                <p>Por favor, anexe os arquivos relevantes para o seu pedido de propriedade intelectual.</p>
                <input
                    type="file"
                    name="arquivo"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <p>Formato aceito: PDF, DOC, DOCX, JPG, PNG</p>
            </div>
            <div className="step-anexar-arquivo-preview">
                {formData.arquivo && (
                    <div>
                        <h3>Arquivo Anexado:</h3>
                        <p>{formData.arquivo.name}</p>
                    </div>
                )}
                {!formData.arquivo && (
                    <p>Nenhum arquivo anexado.</p>
                )}
            </div>
        </>
    );
}

export default StepAnexarArquivo;