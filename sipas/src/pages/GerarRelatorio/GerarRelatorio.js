import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './GerarRelatorio.css';

const GerarRelatorio = () => {
    const navigate = useNavigate();
    

    return (
        <>
            <Header />
            <div className="gerar-relatorio-container">
                <div className="content-container">
                        <div className="informacoes-container">
                            <h2>Informações a serem impressas:</h2>
                            <div className="checkbox-grid">
                                <label>
                                    <input type="checkbox" />
                                    Tipo de PI
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Estado
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Departamento
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Curso
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Inventor
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Data de Depósito
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Data de Publicação
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Data de Vencimento
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Número do Processo
                                </label>
                            </div>
                        </div>

                    <div className="main-content">
                        <div className="filtros-container">
                            <h2>Filtros</h2>

                            <label htmlFor="tipo">Tipo de PI:</label>
                            <select id="tipo">
                                <option value="todos">Todos</option>
                                <option value="patente">Patente</option>
                                <option value="marca">Marca</option>
                                <option value="software">Software</option>
                                <option value="desenho-industrial">Desenho Industrial</option>
                                <option value="indicacao-geografica">Indicação Geográfica</option>
                                <option value="cultivar">Cultivar</option>
                            </select>
                            <label htmlFor="estado">Estado:</label>
                            <select id="estado">
                                <option value="todos">Todos</option>
                                <option value="pendente">Pendente</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="rejeitado">Rejeitado</option>
                            </select>

                            <label htmlFor="departamento">Departamento:</label>
                            <input type="text" placeholder="Digite o nome do departamento" />

                            <label htmlFor="curso">Curso:</label>
                            <input type="text" placeholder="Digite o nome do curso" />

                            <label htmlFor="inventor">Inventor:</label>
                            <input type="text" placeholder="Digite o nome do inventor" />

                            <h2>Data</h2>

                            <label htmlFor="deposito-inicial">Data de depósito inicial:</label>
                            <input type="date" id="deposito-inicial" />

                            <label htmlFor="deposito-final">Data de depósito final:</label>
                            <input type="date" id="deposito-final" />

                            <label htmlFor="publicacao-inicial">Data de publicação inicial:</label>
                            <input type="date" id="publicacao-inicial" />

                            <label htmlFor="publicacao-final">Data de publicação final:</label>
                            <input type="date" id="publicacao-final" />

                            <label htmlFor="vencimento-inicial">Data de vencimento inicial:</label>
                            <input type="date" id="vencimento-inicial" />

                            <label htmlFor="vencimento-final">Data de vencimento final:</label>
                            <input type="date" id="vencimento-final" />

                        </div>

                        <div className="relatorio-container">
                            <h2>Relatório apenas teste Work in progress</h2>
                        </div>
                    </div>
                </div>

                <div className="botoes-container">
                    <button className="btn-gerar-relatorio">Gerar</button>
                    <button className="btn-voltar-relatorio" onClick={() => navigate('/home')} >Voltar</button>
                </div>
            </div>
        </>
    );
};

export default GerarRelatorio;