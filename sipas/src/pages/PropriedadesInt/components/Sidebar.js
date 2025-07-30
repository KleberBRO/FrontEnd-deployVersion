import React, { useState } from 'react';
import '../PropriedadesInt.css';
import { useNavigate } from 'react-router-dom';

function Sidebar({ filtros, onFiltroChange, onSearch, onClearFilters }) {
  const navigate = useNavigate();
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [campoPesquisa, setCampoPesquisa] = useState('titulo');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(termoPesquisa, campoPesquisa);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setTermoPesquisa('');
    if (onSearch) {
      onSearch('', campoPesquisa);
    }
  };

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const hasActiveFilters = filtros.tipo || filtros.status || filtros.departamento;

  return (
    <div className="barra-lateral">
      <h1>Buscar</h1>
      <div className="busca">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Digite para buscar..." 
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          <img src={require('../../../assets/lupa.svg').default} alt="Buscar" />
        </button>
        {termoPesquisa && (
          <button className="clear-search-button" onClick={handleClearSearch} title="Limpar pesquisa">
            ×
          </button>
        )}
      </div>
      <div className="busca-por">
        <p>por:</p>
        <select value={campoPesquisa} onChange={(e) => setCampoPesquisa(e.target.value)}>
          <option value="titulo">Título</option>
          <option value="inventor">Inventor</option>
          <option value="data de Vencimento">Data de Vencimento</option>
        </select>
      </div>
      <div className='filtros'>
        <div className="filtros-header">
          <h1>Filtros</h1>
          {hasActiveFilters && (
            <button className="clear-filters-button" onClick={handleClearFilters}>
              Limpar filtros
            </button>
          )}
        </div>
        <div className='filtro-item'>
          <input 
            type='checkbox' 
            id='ativo-tipo' 
            checked={!!filtros.tipo} 
            onChange={() => {}} 
            readOnly 
          />
          <select value={filtros.tipo} onChange={(e) => onFiltroChange('tipo', e.target.value)}>
            <option value="">Tipo</option>
            <option value="software">Software</option>
            <option value="cultivar">Cultivar</option>
            <option value="marca">Marca</option>
            <option value="patente">Patente</option>
            <option value="desenho-industrial">Desenho Industrial</option>
            <option value="indicacao-geografica">Indicação Geográfica</option>
          </select>
        </div>

        {/* --- BLOCO DE STATUS CORRIGIDO --- */}
        <div className='filtro-item'>
          <input 
            type='checkbox' 
            id='ativo-status' 
            checked={!!filtros.status} 
            onChange={() => {}} 
            readOnly 
          />
          <select value={filtros.status} onChange={(e) => onFiltroChange('status', e.target.value)}>
            <option value="">Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="IN_PROCESSING">In Processing</option>
          </select>
        </div>
        
        <div className='filtro-item'>
          <input 
            type='checkbox' 
            id='ativo-departamento' 
            checked={!!filtros.departamento} 
            onChange={() => {}} 
            readOnly 
          />
          <select value={filtros.departamento} onChange={(e) => onFiltroChange('departamento', e.target.value)}>
            <option value="">Departamento</option>
            <option value="Computação">Computação</option>
            <option value="Engenharia florestal">Engenharia florestal</option>
            <option value="Veterinária">Veterinária</option>
            <option value="Agropecuária">Agropecuária</option>
          </select>
        </div>
      </div>
      <button className="btn-voltar-sidebar" onClick={() => navigate('/home')}>Voltar</button>
    </div>
  );
}

export default Sidebar;