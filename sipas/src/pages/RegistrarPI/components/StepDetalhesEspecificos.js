import React from 'react';
import Patente from './detalhes/Patente';
import Marca from './detalhes/Marca';
import Software from './detalhes/Software';
import Indicacao from './detalhes/Indicacao';
import DesenhoInd from './detalhes/DesenhoInd';
import Cultivar from './detalhes/Cultivar';

function StepDetalhesEspecificos({ tipo, formData, handleChange }) {
    const tipoNormalizado = (tipo || '').toLowerCase();

    return (
        <>
            {tipoNormalizado === 'patente' && (
                <Patente formData={formData.patente} handleChange={e => handleChange(e, 'patente')} />
            )}

            {tipoNormalizado === 'marca' && (
                <Marca formData={formData.marca} handleChange={e => handleChange(e, 'marca')} />
            )}
            {tipoNormalizado === 'software' && (
                <Software formData={formData.software} handleChange={e => handleChange(e, 'software')} />
            )}
            {tipoNormalizado === 'indicacao_geografica' && (
                <Indicacao formData={formData.indicacao_geografica} handleChange={e => handleChange(e, 'indicacao_geografica')} />
            )}
            {tipoNormalizado === 'desenho_industrial' && (
                <DesenhoInd formData={formData.desenho_industrial} handleChange={e => handleChange(e, 'desenho_industrial')} />
            )}
            {tipoNormalizado === 'cultivar' && (
                <Cultivar formData={formData.cultivar} handleChange={e => handleChange(e, 'cultivar')} />
            )}
        </>
    );
}

export default StepDetalhesEspecificos;
