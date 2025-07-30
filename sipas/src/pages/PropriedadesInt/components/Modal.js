import React, { useState, useEffect } from 'react';

function Modal({ piSelecionada, onClose, onSave }) {
    const [editando, setEditando] = useState(false);
    // O estado inicial agora está mais simples e será preenchido pelo useEffect
    const [dadosEditados, setDadosEditados] = useState({});

    // MELHORIA: Usa useEffect para sincronizar o estado de edição com a PI selecionada.
    // Isso evita bugs se o usuário abrir um novo modal sem recarregar a página.
    useEffect(() => {
        // Se uma PI for selecionada, atualiza o estado de edição.
        if (piSelecionada) {
            setDadosEditados({
                titulo: piSelecionada.titulo || '',
                descricao: piSelecionada.descricao || '',
                tipo: piSelecionada.tipo || '',
                departamento: piSelecionada.departamento || '',
                status: piSelecionada.status || '',
                dataCriacao: piSelecionada.dataCriacao || '',
                dataVencimento: piSelecionada.dataVencimento || '',
                nomeInventor: piSelecionada.nomeInventor || '',
                email: piSelecionada.email || '', // CORRIGIDO: de 'emailInventor' para 'email'
                cpf: piSelecionada.cpf || ''      // CORRIGIDO: de 'cpfInventor' para 'cpf'
            });
        }
    }, [piSelecionada]); // Este efeito roda sempre que 'piSelecionada' mudar

    if (!piSelecionada) return null;

    const renderDadosEspecificos = () => {
        // Lista dos tipos possíveis
        const tipos = [
            'software',
            'patent',
            'marca',
            'cultivar',
            'desenho_industrial',
            'indicacao_geografica'
        ];
        // Encontra o tipo específico presente
        const tipoEncontrado = tipos.find(type => piSelecionada[type] && Object.keys(piSelecionada[type]).length > 0);
        console.log(`Tipo encontrado: ${tipoEncontrado}`);
        if (!tipoEncontrado) return null;

        const dados = piSelecionada[tipoEncontrado];
        console.log(`Dados específicos para o tipo ${tipoEncontrado}:`, dados);
        return (
            <div className="dados-especificos">
                <h3>Dados Específicos ({tipoEncontrado.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}):</h3>
                <ul>
                    {Object.entries(dados).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {String(value)}</li>
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
        // Reseta os dados para os originais da 'piSelecionada'
        // A lógica de reset já está no useEffect, mas podemos forçar aqui para resposta imediata
        setDadosEditados({
            titulo: piSelecionada.titulo,
            descricao: piSelecionada.descricao,
            tipo: piSelecionada.tipo,
            departamento: piSelecionada.departamento,
            status: piSelecionada.status,
            dataCriacao: piSelecionada.dataCriacao,
            dataVencimento: piSelecionada.dataVencimento,
            nomeInventor: piSelecionada.nomeInventor,
            email: piSelecionada.email, // CORRIGIDO
            cpf: piSelecionada.cpf,     // CORRIGIDO
        });
    };

    const handleSalvar = () => {
        if (onSave) {
            onSave({ ...piSelecionada, ...dadosEditados });
        }
        setEditando(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-conteudo">
                <button className="modal-fechar" onClick={onClose}>Fechar</button>
                
                {editando ? (
                    <input 
                        type="text" 
                        value={dadosEditados.titulo}
                        onChange={(e) => handleInputChange('titulo', e.target.value)}
                        className="input-titulo"
                    />
                ) : (
                    <h2>{piSelecionada.titulo}</h2>
                )}
                
                <div className="modal-flex-row">
                    <div className="descricao">
                        <h3>Descrição:</h3>
                        {editando ? (
                            <textarea 
                                value={dadosEditados.descricao}
                                onChange={(e) => handleInputChange('descricao', e.target.value)}
                                className="input-descricao"
                                rows="4"
                            />
                        ) : (
                            <p>{piSelecionada.descricao}</p>
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
                
                <div className="dados-gerais">
                    <h3>Dados Gerais:</h3>
                    
                    <p><strong>Tipo:</strong> 
                        {editando ? (
                            <select value={dadosEditados.tipo} onChange={(e) => handleInputChange('tipo', e.target.value)}>
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
                            <input type="date" value={dadosEditados.dataCriacao} onChange={(e) => handleInputChange('dataCriacao', e.target.value)} />
                        ) : ` ${piSelecionada.dataCriacao}`}
                    </p>
                    
                    <p><strong>Data de Vencimento:</strong> 
                        {editando ? (
                            <input type="date" value={dadosEditados.dataVencimento} onChange={(e) => handleInputChange('dataVencimento', e.target.value)} />
                        ) : ` ${piSelecionada.dataVencimento}`}
                    </p>
                    
                    <p><strong>Inventor:</strong> 
                        {editando ? (
                            <input type="text" value={dadosEditados.nomeInventor} onChange={(e) => handleInputChange('nomeInventor', e.target.value)} />
                        ) : ` ${piSelecionada.nomeInventor}`}
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
                
                <div className="modal-botoes">
                    {editando ? (
                        <>
                            <button className="btn-salvar" onClick={handleSalvar}>Salvar</button>
                            <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button className="btn-editar" onClick={handleEditar}>Editar</button>
                            <button className="btn-excluir">Excluir</button>
                            <button className="btn-download">Download</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;