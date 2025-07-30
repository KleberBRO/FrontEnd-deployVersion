import React, { useState, useEffect } from 'react';
import '../styles/Modal.css'; 

function Modal({ piSelecionada, onClose, onSave, onDelete }) {
    const [editando, setEditando] = useState(false);
    // O estado inicial agora está mais simples e será preenchido pelo useEffect
    const [dadosEditados, setDadosEditados] = useState({});

    // MELHORIA: Usa useEffect para sincronizar o estado de edição com a PI selecionada.
    // Isso evita bugs se o usuário abrir um novo modal sem recarregar a página.
    useEffect(() => {
        if (piSelecionada) {
            // Campos gerais
        const novosDados = {
            title: piSelecionada.title || '',
            description: piSelecionada.description || '',
            type: piSelecionada.type || '',
            departamento: piSelecionada.departamento || '',
            status: piSelecionada.status || '',
            requestDate: piSelecionada.requestDate || '',
            expirationDate: piSelecionada.expirationDate || '',
            inventorName: piSelecionada.inventorName || '',
            email: piSelecionada.email || '',
            cpf: piSelecionada.cpf || ''
        };

            // Campos específicos
            const camposEspecificos = {
                patente: [
                    'patentType',
                    'internationalClassification',
                    'technicalApplicationField',
                    'filingDate',
                    'priorityDate',
                    'priorityCountry',
                    'priorityNumber',
                    'previousRequestRelated'
                ],
                // Adicione outros tipos aqui...
            };
            const tipo = piSelecionada.tipo;
            const campos = camposEspecificos[tipo] || [];
            campos.forEach((campo) => {
                novosDados[campo] = piSelecionada[campo] || '';
            });

            setDadosEditados(novosDados);
        }
    }, [piSelecionada]);

    if (!piSelecionada) return null;

    const renderDadosEspecificos = () => {
        const camposEspecificos = {
            patente: [
                'patentType',
                'internationalClassification',
                'technicalApplicationField',
                'filingDate',
                'priorityDate',
                'priorityCountry',
                'priorityNumber',
                'previousRequestRelated'
            ],
            // Adicione os campos dos outros tipos aqui...
        };

        
        const tipo = piSelecionada.tipo;
        const campos = camposEspecificos[tipo] || [];
        const dadosEspecificos = Object.entries(piSelecionada)
            .filter(([key]) => campos.includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        
        if (!Object.keys(dadosEspecificos).length) return null;

        return (
            <div className="dados-especificos">
                <h3>Dados Específicos ({tipo.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}):</h3>
                <ul>
                    {campos.map((key) => (
                        <li key={key}>
                            <strong>{key}:</strong>
                            {editando ? (
                                <input
                                    type="text"
                                    value={dadosEditados[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                            ) : (
                                ` ${piSelecionada[key]}`
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const handleInputChange = (campo, valor) => {
        setDadosEditados(prev => ({ ...prev, [campo]: valor }));
    };

    const handleEditar = () => {
        setEditando(true);
    };

    const handleCancelar = () => {
        setEditando(false);

        // Campos gerais
        const novosDados = {
            title: piSelecionada.title || '',
            description: piSelecionada.description || '',
            type: piSelecionada.type || '',
            departamento: piSelecionada.departamento || '',
            status: piSelecionada.status || '',
            requestDate: piSelecionada.requestDate || '',
            expirationDate: piSelecionada.expirationDate || '',
            inventorName: piSelecionada.inventorName || '',
            email: piSelecionada.email || '',
            cpf: piSelecionada.cpf || ''
        };

        // Campos específicos
        const camposEspecificos = {
            patente: [
                'patentType',
                'internationalClassification',
                'technicalApplicationField',
                'filingDate',
                'priorityDate',
                'priorityCountry',
                'priorityNumber',
                'previousRequestRelated'
            ],
            // Adicione outros tipos aqui...
        };
        const tipo = piSelecionada.tipo;
        const campos = camposEspecificos[tipo] || [];
        campos.forEach((campo) => {
            novosDados[campo] = piSelecionada[campo] || '';
        });

        setDadosEditados(novosDados);
    };

    const handleSalvar = () => {
        console.log('Dados enviados:', { ...piSelecionada, ...dadosEditados }); // Debug
        if (onSave) {
            onSave({ ...piSelecionada, ...dadosEditados });
        }
        setEditando(false);
    };

    const handleExcluir = () => {
        if (window.confirm('Tem certeza que deseja excluir esta propriedade intelectual?')) {
            if (onDelete) {
                onDelete(piSelecionada.id);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-conteudo">
                <button className="modal-fechar" onClick={onClose}>Fechar</button>
                
                {editando ? (
                    <input 
                        type="text" 
                        value={dadosEditados.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="input-titulo"
                    />
                ) : (
                    <h2>{piSelecionada.title}</h2>
                )}
                
                <div className="modal-flex-row">
                    
                    <div className="descricao">
                        <h3>Descrição:</h3>
                        {editando ? (
                            <textarea 
                                value={dadosEditados.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="input-descricao"
                                rows="4"
                            />
                        ) : (
                            <p>{piSelecionada.description}</p>
                        )}
                    </div>
                    <div className="lista-documentos">
                        <h3>Documentos Relacionados:</h3>
                        {piSelecionada.documentos && piSelecionada.documentos.length > 0 ? (
                            <ul>
                                {piSelecionada.documentos.map((doc, index) => (
                                    <li key={index}>
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.nome}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhum documento relacionado.</p>
                        )}
                    </div>
                </div>
                
                <div className="modal-flex-row">
                    <div className="dados-gerais">
                        <h3>Dados Gerais:</h3>
                        
                        <p><strong>Tipo:</strong> 
                            {editando ? (
                                <select value={dadosEditados.type} onChange={(e) => handleInputChange('type', e.target.value)}>
                                    <option value="software">Software</option>
                                    <option value="patente">Patente</option>
                                    <option value="marca">Marca</option>
                                    <option value="cultivar">Cultivar</option>
                                    <option value="desenho industrial">Desenho Industrial</option>
                                    <option value="indicação geográfica">Indicação Geográfica</option>
                                </select>
                            ) : ` ${piSelecionada.tipo}`}
                        </p>
                        
                        <p><strong>Departamento:</strong> 
                            {editando ? (
                                <input type="text" value={dadosEditados.departamento} onChange={(e) => handleInputChange('departamento', e.target.value)} />
                            ) : ` ${piSelecionada.departamento}`}
                        </p>
                        
                        <p><strong>Status:</strong> 
                            {editando ? (
                                <select value={dadosEditados.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                                    <option value="pendente">Pendente</option>
                                    <option value="andamento">Em Andamento</option>
                                    <option value="aprovado">Aprovado</option>
                                    <option value="concluído">Concluído</option>
                                </select>
                            ) : ` ${piSelecionada.status}`}
                        </p>
                        
                        <p><strong>Data de Criação:</strong> 
                            {editando ? (
                                <input type="date" value={dadosEditados.requestDate} onChange={(e) => handleInputChange('requestDate', e.target.value)} />
                            ) : ` ${piSelecionada.requestDate}`}
                        </p>
                        
                        <p><strong>Data de Vencimento:</strong> 
                            {editando ? (
                                <input type="date" value={dadosEditados.expirationDate} onChange={(e) => handleInputChange('expirationDate', e.target.value)} />
                            ) : ` ${piSelecionada.expirationDate}`}
                        </p>
                        
                        <p><strong>Inventor:</strong> 
                            {editando ? (
                                <input type="text" value={dadosEditados.inventorName} onChange={(e) => handleInputChange('inventorName', e.target.value)} />
                            ) : ` ${piSelecionada.inventorName}`}
                        </p>
                        
                        {/* --- SEÇÃO CORRIGIDA --- */}
                        <p><strong>Email do Inventor:</strong> 
                            {editando ? (
                                <input type="email" value={dadosEditados.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                            ) : ` ${piSelecionada.email}`}
                        </p>
                        
                        <p><strong>CPF do Inventor:</strong> 
                            {editando ? (
                                <input type="text" value={dadosEditados.cpf} onChange={(e) => handleInputChange('cpf', e.target.value)} />
                            ) : ` ${piSelecionada.cpf}`}
                        </p>
                    </div>

                    {renderDadosEspecificos()}

              </div>
             
                <div className="modal-botoes">
                    {editando ? (
                        <>
                            <button className="btn-salvar" onClick={handleSalvar}>Salvar</button>
                            <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button className="btn-editar" onClick={handleEditar}>Editar</button>
                            <button className="btn-excluir" onClick ={handleExcluir}>Excluir</button>
                            <button className="btn-download">Download</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;