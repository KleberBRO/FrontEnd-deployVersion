import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepDadosGerais from './StepDadosGerais';
import StepInventor from './StepInventor';
import StepDetalhesEspecificos from './StepDetalhesEspecificos';
import StepAnexarArquivos from './StepAnexarArquivos';
import StepConfirmar from './StepConfirmar';
import Notification from '../../../components/Notification/Notification.js'

function Form({ onSubmit, onBack, tipo}) {
    const [step, setStep] = React.useState(1);
    const navigate = useNavigate();

    const [notification, setNotification] = React.useState({
        message: '',
        type: '',
        show: false
    });


    const [formData, setFormData] = React.useState({
        titulo: '',
        descricao: '',
        departamento: '',
        dataCriacao: '',
        status: '',
        nomeInventor: '',
        emailInventor: '',
        cpfInventor: '',   
        tipo: tipo || '',
        patente : {},
        marca: {},
        software: {},
        indicacaoGeografica: {},
        desenhoIndustrial: {},
        cultivar: {},
    });

    const handleNext = (e) => {
      e.preventDefault();
      setStep(step + 1);
    };

    const handleBack = () => {
      if (step === 1) {
        onBack && onBack();
      } else {
        setStep(step - 1);
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3001/propriedades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            // Navega para a página de sucesso
            navigate('/registrar-pi/sucesso', { 
                state: { 
                    tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('-', ' ')
                }
            });
            
            onSubmit && onSubmit(formData);
        } catch (error) {
            console.error('Erro ao registrar propriedade:', error);
            
            // Mostra a notificação de erro
            setNotification({
                message: "Erro ao registrar a propriedade intelectual. Por favor, tente novamente.",
                type: "error",
                show: true
            });
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const handleChange = (e, tipoCampo) => {
    const { name, value } = e.target;
    if (tipoCampo) {
        // Atualiza dentro do objeto específico (ex: patente, cultivar)
        setFormData((prev) => ({
            ...prev,
            [tipoCampo]: {
                ...prev[tipoCampo],
                [name]: value,
            },
        }));
    } else {
        // Atualiza campos gerais
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    };


    return (
        <>
            {notification.show && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={handleCloseNotification}
                />
            )}
        <form onSubmit={step === 5 ? handleSubmit : handleNext} >
        <h1>Registrar {tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('-', ' ')}</h1>
        {step === 1 && (
            <StepDadosGerais formData={formData} handleChange={handleChange} />
        )}

        {step === 2 && (
            <StepInventor formData={formData} handleChange={handleChange} />
        )}

        {step === 3 && (
            <StepDetalhesEspecificos tipo={tipo} formData={formData} handleChange={handleChange} />
        )}

        {step === 4 && (
            <StepAnexarArquivos formData={formData} handleChange={handleChange} />
        )}

        {step === 5 && (
            <StepConfirmar formData={formData} />
        )}

        <button type="submit" className="submit-button">
            {step === 5 ? 'Enviar' : 'Próximo'}
        </button>
        <button
            type="button"
            className="btn-voltar-registrar"
            onClick={handleBack}
        > Voltar
        </button>
        </form>
        </>
    );
}

export default Form;