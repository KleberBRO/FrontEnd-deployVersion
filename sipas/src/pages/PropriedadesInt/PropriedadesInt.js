import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './PropriedadesInt.css';
import Sidebar from './components/Sidebar.js';
import Tabela from './components/Tabela.js';
import Notification from '../../components/Notification/Notification.js';
import Modal from './components/Modal.js';
import { API_BASE_URL } from '../../config/api.js';

// --- NOVA FUNÇÃO AUXILIAR ---
// Para traduzir os status do backend (ex: "IN_PROGRESS") para o que o frontend espera (ex: "andamento")
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
    departamento: '', // Este campo não vem do DTO base, pode precisar de ajuste
  });
  
  // Função para carregar propriedades do backend
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
      
      // --- MAPEAMENTO DOS DADOS DA API ---
      // Converte o formato do backend para o formato que o frontend espera
      const propriedadesMapeadas = data.map(pi => ({
        // Lado esquerdo: como o frontend usa (ex: titulo)
        // Lado direito: como vem do DTO (ex: pi.title)
        id: pi.id,
        titulo: pi.title,
        descricao: pi.description,
        tipo: pi.type ? pi.type.toLowerCase() : 'desconhecido', // Converte "PATENTE" para "patente"
        status: traduzirStatus(pi.status), // Usa a função auxiliar para traduzir o status
        dataCriacao: pi.requestDate,
        dataVencimento: pi.expirationDate,
        nomeInventor: pi.inventorName,
        departamento: pi.departamento || 'N/A', // Ajuste se o departamento não existir no DTO
        cpf: pi.cpf,
        email: pi.email,
        // Mapeia os arquivos para o formato esperado pelo modal
        documentos: pi.files ? pi.files.map(file => ({
          nome: file.title || 'Arquivo sem nome',
          url: file.filePath || '#'
        })) : [],
        // Incluindo outros campos que podem ser úteis no modal/tabela
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

  // Carrega os dados quando o componente é montado
  useEffect(() => {
    carregarPropriedades();
  }, []);

  
  const handleSearch = async (termo, campo) => {
    // ATENÇÃO: A URL de pesquisa está incorreta. Precisa ser ajustada para o endpoint correto do backend.
    console.warn("A função de busca está usando um endpoint ('/propriedades/pesquisar') que pode estar incorreto.");
    if (!termo.trim()) {
      setPropriedades(propriedadesOriginais);
      return;
    }
    // Lógica de pesquisa local para demonstração, já que o endpoint pode não existir
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
  };

  const propriedadesFiltradas = propriedades.filter(item => {
    const filtroTipo = !filtros.tipo || item.tipo === filtros.tipo;
    const filtroStatus = !filtros.status || item.status === filtros.status;
    const filtroDepartamento = !filtros.departamento || item.departamento === filtros.departamento;
    return filtroTipo && filtroStatus && filtroDepartamento;
  });

  const getTipoClass = (tipo) => {
    if(!tipo) return '';
    // A lógica aqui já funciona porque o tipo foi convertido para minúsculas no mapeamento
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
    // A lógica aqui deve ser ajustada para os status traduzidos
    switch (status) {
      case 'ACTIVE': return 'status-concluido';
      case 'IN_PROCESSING': return 'status-andamento';
      case 'INACTIVE': return 'status-pendente';
      default: return '';
    }
  }

  const handleCloseNotification = () => {
    setErro('');
  };

  const atualizarPI = async (piEditada) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para editar.');
      return;
    }

    try {
      setCarregando(true);

      
      const dto = {
        id: piEditada.id,
        title: piEditada.titulo,
        description: piEditada.descricao,
        type: piEditada.tipo.toUpperCase(),
        status: piEditada.status.toUpperCase(),
        requestDate: piEditada.dataCriacao,
        expirationDate: piEditada.dataVencimento,
        inventorName: piEditada.nomeInventor,
        departamento: piEditada.departamento,
        cpf: piEditada.cpf,
        email: piEditada.email,
        // Adicione outros campos conforme necessário
      };

      const response = await fetch(`${API_BASE_URL}/intellectual-properties/${piEditada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar propriedade.');
      }

      // Atualiza o estado local
      setPropriedades(prev => prev.map(pi => pi.id === piEditada.id ? piEditada : pi));
      setModalAberto(false);
      setPiSelecionada(null);

    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const excluirPI = async (piId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para excluir.');
      return;
    }
    try {
      setCarregando(true);
      const response = await fetch(`${API_BASE_URL}/intellectual-properties/${piId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir propriedade.');
      }
      setPropriedades(prev => prev.filter(pi => pi.id !== piId));
      setModalAberto(false);
      setPiSelecionada(null);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleSavePI = (piEditada) => {
    atualizarPI(piEditada);
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