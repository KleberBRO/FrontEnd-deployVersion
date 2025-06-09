import React, {useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/PropriedadesInt.css';
import Sidebar from '../components/propriedadesInt.js/Sidebar.js';
import Tabela from '../components/propriedadesInt.js/Tabela.js';

function PropriedadesInt() {
  const [propriedades, setPropriedades] = useState([]);
  const [erro, setErro] = useState('');

  const getTipoClass = (tipo) => {
  switch (tipo.toLowerCase()) {
    case 'software':
      return 'tipo-software';
    case 'cultivar':
      return 'tipo-cultivar';
    case 'marca':
      return 'tipo-marca';
    default:
      return '';
    }
  };

  useEffect(() => {
      fetch('/mocks/propriedades.json') // Caminho corrigido
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao carregar propriedades');
          }
          return response.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            setPropriedades(data);
          } else {
            setErro('Dados inválidos no arquivo JSON');
          }
        })
        .catch(() => setErro('Não foi possível carregar os dados.'));
  }, []);

  return (
    <>
    <Header />
    <div className="conteudo">
      <Sidebar />
      <Tabela propriedades={propriedades} getTipoClass={getTipoClass} />
      </div>
    </>
  );
}

export default PropriedadesInt;