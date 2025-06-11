import React from 'react';
import '../../styles/PropriedadesInt.css';
import { useNavigate } from 'react-router-dom';

function Sidebar({ filtros, onFiltroChange }) {
  const navigate = useNavigate();

  return (
    <div className="barra-lateral">
      <h1>Buscar</h1>
      <div className="busca">
        <input type="text" className="search-bar" placeholder="Digite para buscar..." />
        <button className="search-button">
          <img src={require('../../assets/lupa.svg').default} alt="Buscar" />
        </button>
      </div>
      <div className="busca-por">
        <p>por:</p>
          <select>
            <option value="titulo">titulo</option>
            <option value="inventor">Inventor</option>
            <option value="data">data</option>
          </select>
      </div>
        <div className='filtros'>
          <h1>Filtros</h1>
          <div className='filtro-item'>
            <input type='checkbox' id='ativo-tipo' checked={!!filtros.tipo} readOnly />
            <select value={filtros.tipo} onChange={(e) => onFiltroChange('tipo', e.target.value)}>
              <option value="">Tipo</option>
              <option value="software">Software</option>
              <option value="Cultivar">Cultivar</option>
              <option value="Marca">Marca</option>
            </select>
          </div>
          <div className='filtro-item'>
            <input type='checkbox' id='ativo-status' checked={!!filtros.status} readOnly />
            <select value={filtros.status} onChange={(e) => onFiltroChange('status', e.target.value)}>
              <option value="">Status</option>
              <option value="concluido">Concluído</option>
              <option value="andamento">andamento</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
          <div className='filtro-item'>
            <input type='checkbox' id='ativo-departamento' checked={!!filtros.departamento} readOnly />
            <select value={filtros.departamento} onChange={(e) => onFiltroChange('departamento', e.target.value)}>
              <option value="">Departamento</option>
              <option value="computacao">computação</option>
              <option value="engenharia-florestal">Engenharia florestal</option>
              <option value="veterinaria">veterinária</option>
            </select>
          </div>
        </div>
        <button className="btn-voltar-sidebar" onClick={() => navigate('/home')}>Voltar</button>
    </div>
  );
}

export default Sidebar;