import React, {useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/PropriedadesInt.css';
import Sidebar from '../components/propriedadesInt.js/Sidebar.js';
import Tabela from '../components/propriedadesInt.js/Tabela.js';

function PropriedadesInt() {
  const [propriedades, setPropriedades] = useState([]);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [piSelecionada, setPiSelecionada] = useState(null); 
  const [filtros, setFiltros] = useState({
  tipo: '',
  status: '',
  departamento: '',
  });

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };
  const propriedadesFiltradas = propriedades.filter(item => {
  return (
    (!filtros.tipo || item.tipo === filtros.tipo) &&
    (!filtros.status || item.status === filtros.status) &&
    (!filtros.departamento || item.departamento === filtros.departamento)
  );
  });

  const getTipoClass = (tipo) => {
  switch (tipo.toLowerCase()) {
    case 'software':
      return 'tipo-software';
    case 'cultivar':
      return 'tipo-cultivar';
    case 'marca':
      return 'tipo-marca';
    case 'desenho industrial':
      return 'tipo-desenho-industrial';
    case 'indicação geográfica':
      return 'tipo-indicacao-geografica';
    case 'patente':
      return 'tipo-patente';
    default:
      return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'concluído':
        return 'status-concluido';
      case 'aprovado':
        return 'status-aprovado';
      case 'andamento':
        return 'status-andamento';
      case 'pendente':
        return 'status-pendente';
      default:
        return '';
    }
  }


  useEffect(() => {
      fetch('http://localhost:3001/propriedades')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar propriedades');
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            setPropriedades(data);
          } else if (Array.isArray(data.propriedades)) {
            setPropriedades(data.propriedades);
          } else {
            setErro('Dados inválidos no endpoint');
          }
        })
        .catch((e) => {
          setErro('Não foi possível carregar os dados.');
        });
  }, []);

  const abrirModal = (pi) => {
    setPiSelecionada(pi);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPiSelecionada(null);
  };

  return (
    <>
    <Header />
    {erro && <div style={{color: 'red'}}>{erro}</div>}
    <div className="conteudo">
      <Sidebar filtros={filtros} onFiltroChange={handleFiltroChange}/>     
      <Tabela 
      propriedades={propriedades} 
      getTipoClass={getTipoClass} 
      getStatusClass={getStatusClass} 
      onLupaClick={abrirModal}
      />
      {modalAberto && piSelecionada && (
        <div className="modal-overlay">
          <div className="modal-conteudo">
            <button className="modal-fechar" onClick={fecharModal}>Fechar</button>
            <h2>{piSelecionada.titulo}</h2>
            <div className="modal-flex-row">
              <div className="descricao">
                <h3>Descrição:</h3>
                <p>{piSelecionada.descricao}</p>
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
              <p><strong>Tipo:</strong> {piSelecionada.tipo}</p>
              <p><strong>Departamento:</strong> {piSelecionada.departamento}</p>
              <p><strong>Status:</strong> {piSelecionada.status}</p>
              <p><strong>Data de Criação:</strong> {piSelecionada.dataCriacao}</p>
              <p><strong>Data de Vencimento:</strong> {piSelecionada.dataVencimento}</p>
              <p><strong>Inventor:</strong> {piSelecionada.nomeInventor}</p>
              <p><strong>email Inventor: </strong> {piSelecionada.emailInventor}</p>
              <p><strong>Cpf Inventor: </strong> {piSelecionada.cpfInventor}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default PropriedadesInt;