import React from 'react';

function Tabela({ propriedades, getTipoClass }) {
  return (
    <div className="tabela-container">
      <table className="tabela-propriedades">
        <thead>
          <tr>
            <th> </th>
            <th>Tipo</th>
            <th>Título</th>
            <th>Inventor</th>
            <th>Departamento</th>
            <th>Status</th>
            <th>Data de vencimento</th>
          </tr>
        </thead>
        <tbody>
          {propriedades.map((item) => (
            <tr key={item.id}>
              <td>
                <button>
                  <img src={require('../../assets/lupa.svg').default} alt="Buscar" />
                </button>
              </td>
              <td className={getTipoClass(item.tipo)}>{item.tipo}</td>
              <td>{item.titulo}</td>
              <td>{item.inventor}</td>
              <td>{item.departamento}</td>
              <td>{item.status}</td>
              <td>{item.dataVencimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;