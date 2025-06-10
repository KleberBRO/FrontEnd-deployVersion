import React from 'react';
import Patente from './detalhes/Patente';
import Marca from './detalhes/Marca';
import Software from './detalhes/Software';
import Indicacao from './detalhes/Indicacao';
import DesenhoInd from './detalhes/DesenhoInd';
import Cultivar from './detalhes/Cultivar';

function StepDetalhesEspecificos({ tipo, formData, handleChange }) {
    return (
        <>
            {/* ============================ patente ===========================*/}
            {tipo === 'patente' && (
                <Patente formData={formData} handleChange={handleChange} />
            )}

            {/* ============================ marca ===========================*/}
            {tipo === 'marca' && (
                <Marca formData={formData} handleChange={handleChange} />
            )}

            {/* ============================ software ===========================*/}
            {tipo === 'software' && (
                <Software formData={formData} handleChange={handleChange} />
            )}

            {/* ============================ indicação geográfica ===========================*/}
            {tipo === 'indicacao-geografica' && (
                <Indicacao formData={formData} handleChange={handleChange} />
            )}

            {/* ============================ desenho industrial ===========================*/}
            {tipo === 'desenho-industrial' && (
                <DesenhoInd formData={formData} handleChange={handleChange} />
            )}

            {/* ============================ Cultivar ===========================*/}
            {tipo === 'cultivar' && (
                <Cultivar formData={formData} handleChange={handleChange} />
            )}
        </>
    );
}

export default StepDetalhesEspecificos;
