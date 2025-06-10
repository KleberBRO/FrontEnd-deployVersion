import React from 'react';

function Form({ onSubmit, onBack, tipo}) {
    const [step, setStep] = React.useState(1);

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


    return (
        <form onSubmit={step === 4 ? onSubmit : handleNext} >
        <h1>Registrar {tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('-', ' ')}</h1>
        {step === 1 && (
        <>
        <div className="form-group">
            <label htmlFor="titulo">Título da Propriedade</label>
            <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Digite o título ou nome da criação"
            required
            />
        </div>

        <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
            id="descricao"
            name="descricao"
            placeholder="Descreva a criação, invenção ou obra"
            required
            ></textarea>
        </div>

        <div className="form-group">
            <label htmlFor="areaTecnica">Área Técnica/Setor</label>
            <input
            type="text"
            id="areaTecnica"
            name="areaTecnica"
            placeholder="Ex.: Engenharia, Biomedicina, Artes"
            required
            />
        </div>

        <div className="form-group">
            <select id="departamento" name="departamento" required>
            <option value="">Departamento 1</option>
            <option value="engenharia">Departamento 2</option>
            <option value="biomedicina">Departamento 3</option>
            <option value="artes">Departamento 4</option>
            <option value="tecnologia">Departamento 5</option>
            <option value="outro">Outro</option>
            </select>
        </div>
        </>
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