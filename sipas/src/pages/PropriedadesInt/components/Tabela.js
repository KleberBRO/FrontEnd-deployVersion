import React from 'react';

function Tabela({ propriedades, getTipoClass, getStatusClass, onLupaClick }) {
  return (
    <div className="tabela-container">
      <table className="tabela-propriedades">
        <thead>
          <tr>
            <th> </th> {/* Ações */}
            <th>Tipo</th>
            <th>Título</th>
            <th>Inventor</th>
            <th>Departamento</th>
            {/* --- NOVOS CABEÇALHOS --- */}
            <th>CPF</th>
            <th>Email</th>
            <th>Status</th>
            <th>Data de vencimento</th>
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

              {/* --- NOVAS CÉLULAS DE DADOS --- */}
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