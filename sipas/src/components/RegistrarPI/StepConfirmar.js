import React from 'react';

function renderObject(obj) {
    if (!obj || typeof obj !== 'object') return null;
    return (
        <ul>
            {Object.entries(obj).map(([key, value]) => (
                <li key={key}>
                    <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                </li>
            ))}
        </ul>
    );
}

function StepConfirmar({ formData }) {
    // Campos gerais
    const camposGerais = [
        { label: 'Título', value: formData.titulo },
        { label: 'Descrição', value: formData.descricao },
        { label: 'Departamento', value: formData.departamento },
        { label: 'Data de Criação', value: formData.dataCriacao },
        { label: 'Status', value: formData.status },
        { label: 'Nome do Inventor', value: formData.nomeInventor },
        { label: 'Email do Inventor', value: formData.emailInventor },
        { label: 'CPF do Inventor', value: formData.cpfInventor },
        { label: 'Tipo', value: formData.tipo },
    ];

    // Campos específicos do tipo
    const tiposEspecificos = [
        'patente',
        'marca',
        'software',
        'indicacaoGeografica',
        'desenhoIndustrial',
        'cultivar'
    ];

    const tipoSelecionado = tiposEspecificos.find(tipo => Object.keys(formData[tipo] || {}).length > 0);

    return (
        <div>
            <h2>Confirme os dados antes de enviar</h2>
            <h3>Dados Gerais</h3>
            <ul>
                {camposGerais.map((campo, idx) => (
                    <li key={idx}>
                        <strong>{campo.label}:</strong> {campo.value}
                    </li>
                ))}
            </ul>
            {tipoSelecionado && (
                <>
                    <h3>Detalhes Específicos ({tipoSelecionado.charAt(0).toUpperCase() + tipoSelecionado.slice(1)})</h3>
                    {renderObject(formData[tipoSelecionado])}
                </>
            )}
        </div>
    );
}

export default StepConfirmar;