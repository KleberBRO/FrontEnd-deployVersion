// Tabela.js

import React from 'react';

// 1. Receber as novas props: requestSort e sortConfig
function Tabela({ propriedades, getTipoClass, getStatusClass, onLupaClick, requestSort, sortConfig }) {

  // 2. (Opcional) Função auxiliar para obter o indicador visual (seta para cima/baixo)
  const getSortIndicator = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null; // Nenhuma ordenação ou não é esta coluna
    }
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };
  
  return (
    <div className="tabela-container">
      <table className="tabela-propriedades">
        <thead>
          <tr>
            <th> </th>{/* Ações */}
            
            {/* 3. Adicionar onClick e o indicador a cada th que deve ser ordenável */}
            {/* O argumento em requestSort DEVE ser a chave exata do objeto (ex: 'tipo', 'titulo') */}
            <th onClick={() => requestSort('tipo')} className="th-sortable">
              Tipo{getSortIndicator('tipo')}
            </th>
            <th onClick={() => requestSort('titulo')} className="th-sortable">
              Título{getSortIndicator('titulo')}
            </th>
            <th onClick={() => requestSort('nomeInventor')} className="th-sortable">
              Inventor{getSortIndicator('nomeInventor')}
            </th>
            <th onClick={() => requestSort('departamento')} className="th-sortable">
              Departamento{getSortIndicator('departamento')}
            </th>
            <th onClick={() => requestSort('cpf')} className="th-sortable">
              CPF{getSortIndicator('cpf')}
            </th>
            <th onClick={() => requestSort('email')} className="th-sortable">
              Email{getSortIndicator('email')}
            </th>
            <th onClick={() => requestSort('status')} className="th-sortable">
              Status{getSortIndicator('status')}
            </th>
            <th onClick={() => requestSort('dataVencimento')} className="th-sortable">
              Data de vencimento{getSortIndicator('dataVencimento')}
            </th>
          </tr>
        </thead>
        <tbody>
          {propriedades.map((item) => (
            <tr key={item.id}>
              <td>
                <button onClick={() => onLupaClick(item)}>
                  <img src={require('../../../assets/lupa.svg').default} alt="Buscar" />
                </button>
              </td>
              <td className={getTipoClass(item.tipo)}>{item.tipo}</td>
              <td>{item.titulo}</td>
              <td>{item.nomeInventor}</td>
              <td>{item.departamento}</td>
              <td>{item.cpf || 'N/A'}</td>
              <td>{item.email || 'N/A'}</td>
              <td className={getStatusClass(item.status)}>{item.status}</td>
              <td>{item.dataVencimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;