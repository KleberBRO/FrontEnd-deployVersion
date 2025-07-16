import React, {useEffect, useState } from 'react';
import Header from '../../components/Header';
import './PropriedadesInt.css';
import Sidebar from './components/Sidebar.js';
import Tabela from './components/Tabela.js';
import Notification from '../../components/Notification/Notification.js';
import Modal from './components/Modal.js';
import { API_BASE_URL } from '../../config/api.js';

function PropriedadesInt() {
  const [propriedades, setPropriedades] = useState([]);
  const [propriedadesOriginais, setPropriedadesOriginais] = useState([]);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [piSelecionada, setPiSelecionada] = useState(null); 
  const [carregando, setCarregando] = useState(false);
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

  // Função para carregar propriedades do backend
  const carregarPropriedades = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para ver as propriedades.');
      return;
    }

    try {
      setCarregando(true);
      const response = await fetch(API_BASE_URL+'/intellectual-properties', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Acesso negado. Você não tem permissão para ver estas propriedades.');
        }
        throw new Error('Erro ao carregar propriedades: ' + response.statusText);
      }

      const data = await response.json();
      let propriedadesData = [];
      
      if (Array.isArray(data)) {
        propriedadesData = data;
      } else if (data && Array.isArray(data.propriedades)) {
        propriedadesData = data.propriedades;
      } else if (data && Array.isArray(data.data)) {
        propriedadesData = data.data;
      } else {
        // Se não é array mas é um objeto válido, considera como array vazio
        propriedadesData = [];
      }

      setPropriedades(propriedadesData);
      setPropriedadesOriginais(propriedadesData);
      
    } catch (error) {
      console.error('Erro ao carregar propriedades:', error);
      setErro('Não foi possível carregar os dados: ' + error.message);
      // Fallback para dados mockados
      setPropriedades(dadosMockados);
      setPropriedadesOriginais(dadosMockados);
    } finally {
      setCarregando(false);
    }
  };

  // Função para pesquisar no backend
  const handleSearch = async (termo, campo) => {
    if (!termo.trim()) {
      // Se o termo está vazio, recarrega todas as propriedades
      setPropriedades(propriedadesOriginais);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para pesquisar.');
      return;
    }

    try {
      setCarregando(true);
      
      // Construir URL com parâmetros de pesquisa
      const params = new URLSearchParams({
        termo: termo,
        campo: campo
      });

      const response = await fetch(API_BASE_URL+`/propriedades/pesquisar?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao pesquisar propriedades');
      }

      const data = await response.json();
      let resultados = [];
      
      if (Array.isArray(data)) {
        resultados = data;
      } else if (Array.isArray(data.propriedades)) {
        resultados = data.propriedades;
      }

      setPropriedades(resultados);
      
      if (resultados.length === 0) {
        setErro(`Nenhum resultado encontrado para "${termo}" no campo "${campo}"`);
      }
    } catch (error) {
      console.error('Erro ao pesquisar:', error);
      setErro('Erro ao realizar pesquisa: ' + error.message);
      
      // Fallback para pesquisa local nos dados mockados
      const resultadosLocal = dadosMockados.filter(item => {
        switch (campo) {
          case 'titulo':
            return item.titulo.toLowerCase().includes(termo.toLowerCase());
          case 'inventor':
            return item.nomeInventor.toLowerCase().includes(termo.toLowerCase());
          case 'data':
            return item.dataCriacao.includes(termo) || item.dataVencimento.includes(termo);
          default:
            return false;
        }
      });
      
      setPropriedades(resultadosLocal);
    } finally {
      setCarregando(false);
    }
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleClearFilters = () => {
    setFiltros({
      tipo: '',
      status: '',
      departamento: '',
    });
  };

  const propriedadesFiltradas = propriedades.filter(item => {
    // Verificar se todos os filtros passam
    const filtroTipo = !filtros.tipo || item.tipo === filtros.tipo;
    const filtroStatus = !filtros.status || item.status === filtros.status;
    const filtroDepartamento = !filtros.departamento || item.departamento === filtros.departamento;
    
    return filtroTipo && filtroStatus && filtroDepartamento;
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
    carregarPropriedades();
  }, []);

  const handleSavePI = (piEditada) => {
    const token = localStorage.getItem('token');
    setPropriedades(prev => 
      prev.map(pi => pi.id === piEditada.id ? piEditada : pi)
    );
    
    // Chamada para o backend para salvar as alterações
    fetch(API_BASE_URL+`/propriedades/${piEditada.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(piEditada)
    }).catch(error => {
      console.error('Erro ao salvar propriedade:', error);
      setErro('Erro ao salvar alterações');
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
        <Sidebar 
          filtros={filtros} 
          onFiltroChange={handleFiltroChange}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
        />     
        <Tabela 
          propriedades={carregando ? [] : propriedadesFiltradas} 
          getTipoClass={getTipoClass} 
          getStatusClass={getStatusClass} 
          onLupaClick={abrirModal}
        />
        {modalAberto && (
          <Modal 
            piSelecionada={piSelecionada} 
            onClose={fecharModal} 
            onSave={handleSavePI}
          />
        )}
        {carregando && (
          <div className="loading-overlay">
            <p>Carregando...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default PropriedadesInt;