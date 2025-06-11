import React, {useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/PropriedadesInt.css';
import Sidebar from '../components/propriedadesInt.js/Sidebar.js';
import Tabela from '../components/propriedadesInt.js/Tabela.js';

function PropriedadesInt() {
  const [propriedades, setPropriedades] = useState([]);
  const [erro, setErro] = useState('');
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

  return (
    <>
    <Header />
    {erro && <div style={{color: 'red'}}>{erro}</div>}
    <div className="conteudo">
      <Sidebar filtros={filtros} onFiltroChange={handleFiltroChange}/>     
      <Tabela propriedades={propriedades} getTipoClass={getTipoClass} getStatusClass={getStatusClass} />
      </div>
    </>
  );
}

export default PropriedadesInt;