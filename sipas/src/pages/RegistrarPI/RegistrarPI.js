import React from 'react';
import './RegistrarPI.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Form from './components/Form';

function RegistrarPI() {
    const navigate = useNavigate();
    const location = useLocation();
    const tipo = location.state?.tipo || 'patente';

    const handleBack = () => {
        navigate('/escolher-pi');
    };

  return (
    <>
      <Header/>
        <div className="background-registrar-pi">
            <div className="form-container">
                <Form tipo={tipo} onBack={handleBack}/>
            </div>
        </div>
    </>
  );
}

export default RegistrarPI;
