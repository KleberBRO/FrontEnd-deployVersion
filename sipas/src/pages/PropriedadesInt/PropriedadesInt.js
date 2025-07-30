// PropriedadesInt.js

import React, { useEffect, useState, useMemo } from 'react'; // 1. Importar useMemo
import Header from '../../components/Header';
import './PropriedadesInt.css';
import Sidebar from './components/Sidebar.js';
import Tabela from './components/Tabela.js';
import Notification from '../../components/Notification/Notification.js';
import Modal from './components/Modal.js';
import { API_BASE_URL } from '../../config/api.js';

// ... (função traduzirStatus permanece a mesma)
const traduzirStatus = (statusBackend) => {
  if (!statusBackend) return 'desconhecido';
  const mapaStatus = {
    DEPOSIT_REQUESTED: 'depósito solicitado',
    IN_PROGRESS: 'andamento',
    CONCLUDED: 'concluído',
    PENDING: 'pendente',
    APPROVED: 'aprovado',
    REJECTED: 'rejeitado'
  };
  return mapaStatus[statusBackend.toUpperCase()] || statusBackend.toLowerCase();
};


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

  // --- NOVO ESTADO PARA CONTROLE DA ORDENAÇÃO ---
  // key: a chave do objeto para ordenar (ex: 'titulo')
  // direction: 'ascending' ou 'descending'
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // ... (função carregarPropriedades permanece a mesma)
  const carregarPropriedades = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para ver as propriedades.');
      return;
    }

    try {
      setCarregando(true);
      const response = await fetch(`${API_BASE_URL}/intellectual-properties/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao carregar propriedades: ${response.statusText}`);
      }

      const data = await response.json();

      console.log('Dados recebidos:', data);
      
      const propriedadesMapeadas = data.map(pi => ({
        id: pi.id,
        titulo: pi.title,
        descricao: pi.description,
        tipo: pi.type ? pi.type.toLowerCase() : 'desconhecido',
        status: traduzirStatus(pi.status),
        dataCriacao: pi.requestDate,
        dataVencimento: pi.expirationDate,
        nomeInventor: pi.inventorName,
        departamento: pi.departamento || 'N/A',
        cpf: pi.cpf,
        email: pi.email,
        documentos: pi.files ? pi.files.map(file => ({
          nome: file.title || 'Arquivo sem nome',
          url: file.filePath || '#'
        })) : [],
        ...pi 
      }));

      setPropriedades(propriedadesMapeadas);
      setPropriedadesOriginais(propriedadesMapeadas);
      
    } catch (error) {
      console.error('Erro ao carregar propriedades:', error);
      setErro(`Não foi possível carregar os dados: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPropriedades();
  }, []);

  const handleSearch = async (termo, campo) => {
    if (!termo.trim()) {
      setPropriedades(propriedadesOriginais);
      return;
    }
    const resultadosLocal = propriedadesOriginais.filter(item => {
      const itemCampo = String(item[campo] || '').toLowerCase();
      return itemCampo.includes(termo.toLowerCase());
    });
    setPropriedades(resultadosLocal);
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleClearFilters = () => {
    setFiltros({ tipo: '', status: '', departamento: '' });
    setSortConfig({ key: null, direction: 'ascending' }); // Limpa a ordenação também
    setPropriedades(propriedadesOriginais);
  };

  const propriedadesFiltradas = propriedades.filter(item => {
    const filtroTipo = !filtros.tipo || item.tipo === filtros.tipo;
    const filtroStatus = !filtros.status || item.status === filtros.status;
    const filtroDepartamento = !filtros.departamento || item.departamento === filtros.departamento;
    return filtroTipo && filtroStatus && filtroDepartamento;
  });

  // --- NOVA LÓGICA DE ORDENAÇÃO USANDO useMemo ---
  // useMemo garante que a ordenação só será refeita se os dados ou a configuração de ordenação mudarem.
  const propriedadesOrdenadas = useMemo(() => {
    let itensOrdenaveis = [...propriedadesFiltradas]; // Cria uma cópia para não modificar o array original
    if (sortConfig.key !== null) {
      itensOrdenaveis.sort((a, b) => {
        const valA = a[sortConfig.key] || '';
        const valB = b[sortConfig.key] || '';

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return itensOrdenaveis;
  }, [propriedadesFiltradas, sortConfig]);

  // --- NOVA FUNÇÃO PARA LIDAR COM O CLIQUE NO CABEÇALHO ---
  const requestSort = (key) => {
    let direction = 'ascending';
    // Se clicar na mesma coluna, inverte a direção
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  // ... (demais funções: getTipoClass, getStatusClass, atualizarPI, etc. permanecem as mesmas)
  const getTipoClass = (tipo) => {
    if(!tipo) return '';
    switch (tipo) {
      case 'software': return 'tipo-software';
      case 'cultivar': return 'tipo-cultivar';
      case 'marca': return 'tipo-marca';
      case 'desenho_industrial': return 'tipo-desenho-industrial';
      case 'indicacao_geografica': return 'tipo-indicacao-geografica';
      case 'patente': return 'tipo-patente';
      default: return '';
    }
  };
  const getStatusClass = (status) => {
    if(!status) return '';
    switch (status) {
      case 'ACTIVE': return 'status-concluido';
      case 'IN_PROCESSING': return 'status-andamento';
      case 'INACTIVE': return 'status-pendente';
      default: return '';
    }
  }
  const handleCloseNotification = () => setErro('');
  const atualizarPI = async (piEditada) => { /* ...código existente... */ };
  const excluirPI = async (piId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para excluir propriedades.');
      return;
    }
    if (!piId) {
      setErro('ID da propriedade inválido.');
      return;
    }
    try {
      setCarregando(true);
      const response = await fetch(`${API_BASE_URL}/intellectual-properties/${piId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir propriedade.');
      }
      // Remove do estado local
      setPropriedades(prev => prev.filter(pi => pi.id !== piId));
      setPropriedadesOriginais(prev => prev.filter(pi => pi.id !== piId));
      setErro('Propriedade excluída com sucesso!');
      fecharModal();
    } catch (error) {
      setErro(`Não foi possível excluir: ${error.message}`);
    } finally {
      setCarregando(false);
    }
  };
  const handleSavePI = (piEditada) => atualizarPI(piEditada);
  const abrirModal = (pi) => { setPiSelecionada(pi); setModalAberto(true); };
  const fecharModal = () => { setModalAberto(false); setPiSelecionada(null); };


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
        {/* --- ALTERADO: Passando os dados ordenados e as novas props para a Tabela --- */}
        <Tabela 
          propriedades={carregando ? [] : propriedadesOrdenadas} 
          getTipoClass={getTipoClass} 
          getStatusClass={getStatusClass} 
          onLupaClick={abrirModal}
          requestSort={requestSort} // Passa a função de ordenação
          sortConfig={sortConfig} // Passa a configuração atual para feedback visual
        />
        {modalAberto && (
          <Modal 
            piSelecionada={piSelecionada} 
            onClose={fecharModal} 
            onSave={handleSavePI}
            onDelete={excluirPI}
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