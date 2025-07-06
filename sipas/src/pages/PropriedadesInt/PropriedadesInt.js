import React, {useEffect, useState } from 'react';
import Header from '../../components/Header';
import './PropriedadesInt.css';
import Sidebar from './components/Sidebar.js';
import Tabela from './components/Tabela.js';
import Notification from '../../components/Notification/Notification.js';
import Modal from './components/Modal.js';

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

    // Dados mockados para teste
  const dadosMockados = [
    {
      id: 1,
      titulo: "Sistema de Gestão de PI - Mock",
      descricao: "Sistema para gerenciamento de propriedades intelectuais da empresa - dados de teste",
      tipo: "software",
      departamento: "TI",
      status: "andamento",
      dataCriacao: "2024-01-15",
      dataVencimento: "2025-01-15",
      nomeInventor: "João Silva",
      emailInventor: "joao@empresa.com",
      cpfInventor: "123.456.789-00",
      documentos: [
        { nome: "Especificação Técnica.pdf", url: "#" },
        { nome: "Diagrama de Arquitetura.pdf", url: "#" }
      ]
    },
    {
      id: 2,
      titulo: "Patente de Processo Químico - Mock",
      descricao: "Processo inovador para síntese de compostos orgânicos - dados de teste",
      tipo: "patente",
      departamento: "Pesquisa",
      status: "concluído",
      dataCriacao: "2023-06-10",
      dataVencimento: "2043-06-10",
      nomeInventor: "Maria Santos",
      emailInventor: "maria@empresa.com",
      cpfInventor: "987.654.321-00",
      documentos: [
        { nome: "Relatório de Pesquisa.pdf", url: "#" }
      ]
    }
  ];

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

  const handleCloseNotification = () => {
    setErro('');
  };


  useEffect(() => {
    setPropriedades(dadosMockados); // Carrega os dados mockados inicialmente
    const token = localStorage.getItem('token'); // Ou sessionStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para ver as propriedades.');
      return;
    }

    fetch('http://localhost:8080/api/propriedades', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Acesso negado. Você não tem permissão para ver estas propriedades.');
          }
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
        setErro('Não foi possível carregar os dados: ' + e.message); // Exibe a mensagem de erro específica
      });
  }, []);

  const handleSavePI = (piEditada) => {
    // Atualizar a lista de propriedades
    const token = localStorage.getItem('token');
    setPropriedades(prev => 
      prev.map(pi => pi.id === piEditada.id ? piEditada : pi)
    );
    
    // Aqui você pode fazer a chamada para o backend para salvar as alterações
    fetch(`http://localhost:8080/api/propriedades/${piEditada.id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(piEditada)
    });
  };


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
    <Notification 
      message={erro} 
      type="error" 
      onClose={handleCloseNotification}
      duration={5000}
    />
    <div className="conteudo">
      <Sidebar filtros={filtros} onFiltroChange={handleFiltroChange}/>     
      <Tabela 
      propriedades={propriedades} 
      getTipoClass={getTipoClass} 
      getStatusClass={getStatusClass} 
      onLupaClick={abrirModal}
      />
      {modalAberto && (
        <Modal 
          piSelecionada={piSelecionada} 
          onClose={fecharModal} 
        />
      )}
      </div>
    </>
  );
}

export default PropriedadesInt;