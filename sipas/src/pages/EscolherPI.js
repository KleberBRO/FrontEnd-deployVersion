import React from 'react';
import '../styles/EscolherPI.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function EscolherPI() {
  const navigate = useNavigate();

  return (
    <>
      <Header/>
        <div className="container">
            <h1>PORTAL SIGPS</h1>

            <div className="escolher-content">

              <div className="registrar-patente">
                  <h1>Registrar PI</h1>
                  <p>Protege invenções que oferecem soluções novas e úteis para problemas técnicos, garantindo exclusividade ao inventor por um período.</p>
              </div>
              <div className="registrar-marca">
                <h1>Registrar Marca</h1>
                <p>Identifica produtos ou serviços e os distingue de concorrentes. Pode ser um nome, símbolo ou logotipo.</p>
              </div>

              <div className="registrar-software"> 
                <h1>Registrar Software</h1>
                <p>Protege programas de computador, garantindo direitos autorais sobre o código-fonte e a interface do usuário.</p>
              </div>

              <div className="registrar-desenho-industrial">
                <h1>Registrar Desenho Industrial</h1>
                <p>Protege a forma estética de um produto, como seu design, cor e textura, garantindo exclusividade ao criador.</p>
              </div>

              <div className="registrar-indicacao-geografica">
                <h1>Registrar Indicação Geográfica</h1>
                <p>Identifica produtos originários de uma localidade específica, conferindo características únicas devido ao ambiente geográfico.</p>
                </div>
              <div className="registrar-cultivar">
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
