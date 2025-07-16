import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../RegistrarPI.css';

function FeedbackSucesso({ tipo }) {
    const navigate = useNavigate();

    const handleVoltarInicio = () => {
        navigate('/home');
    };

    const handleAdicionarOutra = () => {
        navigate('/escolher-pi');
    };

    return (
        <div className="feedback-sucesso-container">
            <div className="feedback-card">
                <div className="success-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
                        <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <h1>Sucesso!</h1>
                <p className="success-message">
                    A propriedade intelectual do tipo <strong>{tipo || '???'}</strong> foi registrada com sucesso!
                </p>

                <div className="feedback-buttons">
                    <button 
                        className="btn-voltar-inicio"
                        onClick={handleVoltarInicio}
                    >
                        Voltar ao Início
                    </button>
                    <button 
                        className="btn-adicionar-outra"
                        onClick={handleAdicionarOutra}
                    >
                        Adicionar Outra Propriedade
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedbackSucesso;