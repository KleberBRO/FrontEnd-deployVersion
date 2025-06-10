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
            {tipoNormalizado === 'indicacao-geografica' && (
                <Indicacao formData={formData.indicacaoGeografica} handleChange={e => handleChange(e, 'indicacaoGeografica')} />
            )}
            {tipoNormalizado === 'desenho-industrial' && (
                <DesenhoInd formData={formData.desenhoIndustrial} handleChange={e => handleChange(e, 'desenhoIndustrial')} />
            )}
            {tipoNormalizado === 'cultivar' && (
                <Cultivar formData={formData.cultivar} handleChange={e => handleChange(e, 'cultivar')} />
            )}
        </>
    );
}

export default StepDetalhesEspecificos;
