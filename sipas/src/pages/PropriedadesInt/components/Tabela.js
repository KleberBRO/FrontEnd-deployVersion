import React from 'react';

const mapStatusToPtBr = (status) => {
  const statusMap = {
    'approved': 'Aprovado',
    'concluded': 'Concluído',
    'pending': 'Pendente',
    'IN_PROCESSING': 'Em Andamento',
    'INACTIVE': 'Inativo',
    'expired': 'Expirado',
    // Adicione outros status conforme necessário
  };
  
  return statusMap[status] || status; // Retorna o status original se não encontrar mapeamento
};

function Tabela({ propriedades, getTipoClass, getStatusClass, onLupaClick }) {
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
                <button onClick={() => onLupaClick(item)}>
                  <img src={require('../../../assets/lupa.svg').default} alt="Buscar" />
                </button>
              </td>
              <td className={getTipoClass(item.type)}>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.inventorName}</td>
              <td>{item.department}</td>
              <td className={getStatusClass(item.status)}>{mapStatusToPtBr(item.status)}</td>
              <td>{item.expirationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;