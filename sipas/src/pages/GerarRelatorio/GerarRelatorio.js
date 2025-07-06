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
                <h1>Gerar Relatório</h1>
                <p>Esta funcionalidade ainda não está implementada.</p>
                <p>Em breve, você poderá gerar relatórios personalizados com base nas propriedades intelectuais registradas.</p>
                <button className="btn-voltar" onClick={() => navigate('/home')} >Voltar</button>
            </div>
        </>
    );
};

export default GerarRelatorio;