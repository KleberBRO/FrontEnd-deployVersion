import React from 'react';
import StepDadosGerais from './StepDadosGerais';
import StepInventor from './StepInventor';
import StepDetalhesEspecificos from './StepDetalhesEspecificos';

function Form({ onSubmit, onBack, tipo}) {
    const [step, setStep] = React.useState(1);

    const [formData, setFormData] = React.useState({
        titulo: '',
        descricao: '',
        departamento: '',
        dataCriacao: '',
        status: '',
        nomeInventor: '',
        emailInventor: '',
        cpfInventor: '',   
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit(formData);
    };


    return (
        <form onSubmit={step === 4 ? onSubmit : handleNext} >
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

        <button type="submit" className="submit-button">
            {step === 4 ? 'Enviar' : 'Próximo'}
        </button>
        <button
            type="button"
            className="btn-voltar-registrar"
            onClick={handleBack}
        >
        Voltar
        </button>
        </form>
    );
}

export default Form;