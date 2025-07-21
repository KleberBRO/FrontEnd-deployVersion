import React, { useState } from 'react';

function Modal({ piSelecionada, onClose, onSave }) {
  const [editando, setEditando] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({
    title: piSelecionada?.title || '',
    description: piSelecionada?.description || '',
    type: piSelecionada?.type || '',
    department: piSelecionada?.department || '',
    status: piSelecionada?.status || '',
    creationDate: piSelecionada?.creationDate || '',
    expirationDate: piSelecionada?.expirationDate || '',
    inventorName: piSelecionada?.inventorName || '',
    inventorEmail: piSelecionada?.inventorEmail || '',
    cpfInventor: piSelecionada?.cpfInventor || ''
  });

  if (!piSelecionada) return null;

  const handleInputChange = (campo, valor) => {
    setDadosEditados(prev => ({ ...prev, [campo]: valor }));
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleCancelar = () => {
    setEditando(false);
    setDadosEditados({
      titulo: piSelecionada.titulo,
      descricao: piSelecionada.descricao,
      tipo: piSelecionada.tipo,
      departamento: piSelecionada.departamento,
      status: piSelecionada.status,
      dataCriacao: piSelecionada.dataCriacao,
      dataVencimento: piSelecionada.dataVencimento,
      nomeInventor: piSelecionada.nomeInventor,
      emailInventor: piSelecionada.emailInventor,
      cpfInventor: piSelecionada.cpfInventor
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
              <p>Nenhum documento relacionado encontrado.</p>
            )}
          </div>
        </div>
        
        <div className="dados-gerais">
          <h3>Dados Gerais:</h3>
          
          <p><strong>Tipo:</strong> 
            {editando ? (
              <select 
                value={dadosEditados.tipo}
                onChange={(e) => handleInputChange('tipo', e.target.value)}
              >
                <option value="software">Software</option>
                <option value="patente">Patente</option>
                <option value="marca">Marca</option>
                <option value="cultivar">Cultivar</option>
                <option value="desenho industrial">Desenho Industrial</option>
                <option value="indicação geográfica">Indicação Geográfica</option>
              </select>
            ) : (
              ` ${piSelecionada.tipo}`
            )}
          </p>
          
          <p><strong>Departamento:</strong> 
            {editando ? (
              <input 
                type="text" 
                value={dadosEditados.departamento}
                onChange={(e) => handleInputChange('departamento', e.target.value)}
              />
            ) : (
              ` ${piSelecionada.departamento}`
            )}
          </p>
          
          <p><strong>Status:</strong> 
            {editando ? (
              <select 
                value={dadosEditados.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="pendente">Pendente</option>
                <option value="andamento">Em Andamento</option>
                <option value="aprovado">Aprovado</option>
                <option value="concluído">Concluído</option>
              </select>
            ) : (
              ` ${piSelecionada.status}`
            )}
          </p>
          
          <p><strong>Data de Criação:</strong> 
            {editando ? (
              <input 
                type="date" 
                value={dadosEditados.dataCriacao}
                onChange={(e) => handleInputChange('dataCriacao', e.target.value)}
              />
            ) : (
              ` ${piSelecionada.dataCriacao}`
            )}
          </p>
          
          <p><strong>Data de Vencimento:</strong> 
            {editando ? (
              <input 
                type="date" 
                value={dadosEditados.dataVencimento}
                onChange={(e) => handleInputChange('dataVencimento', e.target.value)}
              />
            ) : (
              ` ${piSelecionada.dataVencimento}`
            )}
          </p>
          
          <p><strong>Inventor:</strong> 
            {editando ? (
              <input 
                type="text" 
                value={dadosEditados.nomeInventor}
                onChange={(e) => handleInputChange('nomeInventor', e.target.value)}
              />
            ) : (
              ` ${piSelecionada.nomeInventor}`
            )}
          </p>
          
          <p><strong>Email Inventor:</strong> 
            {editando ? (
              <input 
                type="email" 
                value={dadosEditados.emailInventor}
                onChange={(e) => handleInputChange('emailInventor', e.target.value)}
              />
            ) : (
              ` ${piSelecionada.emailInventor}`
            )}
          </p>
          
          <p><strong>CPF Inventor:</strong> 
            {editando ? (
              <input 
                type="text" 
                value={dadosEditados.cpfInventor}
                onChange={(e) => handleInputChange('cpfInventor', e.target.value)}
              />
            ) : (
              ` ${piSelecionada.cpfInventor}`
            )}
          </p>
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