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
    <div className="conteudo">
      <Sidebar />
      {erro && <div style={{color: 'red'}}>{erro}</div>}
      <Tabela propriedades={propriedades} getTipoClass={getTipoClass} />
      </div>
    </>
  );
}

export default PropriedadesInt;