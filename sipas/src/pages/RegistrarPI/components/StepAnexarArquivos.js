import React from 'react';

function StepAnexarArquivos({ formData, handleChange }) {
    const handleFileChange = (e, fileType) => {
        const files = Array.from(e.target.files);
        handleChange({
            target: {
                name: fileType,
                value: files
            }
        });
    };

    const removeFile = (fileType, indexToRemove) => {
        const currentFiles = formData[fileType] || [];
        const updatedFiles = currentFiles.filter((_, index) => index !== indexToRemove);
        handleChange({
            target: {
                name: fileType,
                value: updatedFiles
            }
        });
    };

    const renderFileList = (files, fileType, title) => {
        if (!files || files.length === 0) {
            return <p>Nenhum arquivo anexado.</p>;
        }

        return (
            <div className="file-list">
                <h4>{title}:</h4>
                {files.map((file, index) => (
                    <div key={index} className="file-item">
                        <span>{file.name}</span>
                        <button 
                            type="button" 
                            onClick={() => removeFile(fileType, index)}
                            className="remove-file-btn"
                        >
                            Remover
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="step-anexar-arquivo">
                <h2>Anexar Arquivos</h2>
                <p>Por favor, anexe os arquivos relevantes para o seu pedido de propriedade intelectual.</p>
                
                {/* Seção para Documentos */}
                <div className="file-upload-section">
                    <h3>Documentos</h3>
                    <input
                        type="file"
                        name="documents"
                        onChange={(e) => handleFileChange(e, 'documents')}
                        accept=".pdf,.doc,.docx"
                        multiple
                    />
                    <p>Formatos aceitos: PDF, DOC, DOCX</p>
                </div>

                {/* Seção para Imagens */}
                <div className="file-upload-section">
                    <h3>Imagens</h3>
                    <input
                        type="file"
                        name="images"
                        onChange={(e) => handleFileChange(e, 'images')}
                        accept=".jpg,.jpeg,.png,.gif"
                        multiple
                    />
                    <p>Formatos aceitos: JPG, JPEG, PNG, GIF</p>
                </div>
            </div>

            <div className="step-anexar-arquivo-preview">
                <h3>Arquivos Anexados</h3>
                
                {/* Preview dos Documentos */}
                {renderFileList(formData.documents, 'documents', 'Documentos')}
                
                {/* Preview das Imagens */}
                {renderFileList(formData.images, 'images', 'Imagens')}
                
                {(!formData.documents || formData.documents.length === 0) && 
                 (!formData.images || formData.images.length === 0) && (
                    <p>Nenhum arquivo anexado.</p>
                )}
            </div>
        </>
    );
}

export default StepAnexarArquivos;