import React from 'react';
import './EscolherPI.css';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

function EscolherPI() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
        <div className="container">
            <h1>PORTAL SIGPS</h1>

            <div className="escolher-content">

              <div className="registrar-patente" onClick={() => navigate('/registrar-pi', { state: { tipo: 'Patente' } })}>
                  <h1>Registrar Patente</h1>
                  <p>Protege invenções que oferecem soluções novas e úteis para problemas técnicos, garantindo exclusividade ao inventor por um período.</p>
              </div>
              <div className="registrar-marca" onClick={() => navigate('/registrar-pi', { state: { tipo: 'marca' } })}>
                <h1>Registrar Marca</h1>
                <p>Identifica produtos ou serviços e os distingue de concorrentes. Pode ser um nome, símbolo ou logotipo.</p>
              </div>

              <div className="registrar-software" onClick={() => navigate('/registrar-pi', { state: { tipo: 'software' } })}> 
                <h1>Registrar Software</h1>
                <p>Protege programas de computador, garantindo direitos autorais sobre o código-fonte e a interface do usuário.</p>
              </div>

              <div className="registrar-desenho-industrial" onClick={() => navigate('/registrar-pi', { state: { tipo: 'desenho_industrial' } })}>
                <h1>Registrar Desenho Industrial</h1>
                <p>Protege a forma estética de um produto, como seu design, cor e textura, garantindo exclusividade ao criador.</p>
              </div>

              <div className="registrar-indicacao-geografica" onClick={() => navigate('/registrar-pi', { state: { tipo: 'indicacao_geografica' } })}>
                <h1>Registrar Indicação Geográfica</h1>
                <p>Identifica produtos originários de uma localidade específica, conferindo características únicas devido ao ambiente geográfico.</p>
                </div>
              <div className="registrar-cultivar" onClick={() => navigate('/registrar-pi', { state: { tipo: 'Cultivar' } })}>
                <h1>Registrar Cultivar</h1>
                <p>Protege variedades de plantas, garantindo direitos sobre novas cultivares desenvolvidas por melhoristas.</p>
              </div>
              </div>

              <button className="btn-voltar" onClick={() => navigate('/home')} >Voltar</button>
        </div>
    </>
  );
}

export default EscolherPI;
