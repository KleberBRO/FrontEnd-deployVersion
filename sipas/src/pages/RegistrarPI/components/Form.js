import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepDadosGerais from './StepDadosGerais';
import StepInventor from './StepInventor';
import StepDetalhesEspecificos from './StepDetalhesEspecificos';
import StepAnexarArquivos from './StepAnexarArquivos';
import StepConfirmar from './StepConfirmar';
import Notification from '../../../components/Notification/Notification.js'
import { API_BASE_URL } from '../../../config/api.js';

function Form({ onSubmit, onBack, tipo}) {
    const [step, setStep] = React.useState(1);
    const navigate = useNavigate();

    const [notification, setNotification] = React.useState({
        message: '',
        type: '',
        show: false
    });


    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        startupName: '',
        requestDate: '',
        grantDate: '',
        expirationDate: '',
        processingStage: '',
        inventorName: '',
        inventorId: 0,
        startupId: 0,
        type: tipo || '',
        documents: [],
        images: [],
        patente: {},
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
            const formDataToSend = new FormData();
    

            const mapStatusToEnum = (status) => {
                const statusMap = {
                    'APROVADO': 'ACTIVE',
                    'EM_PROCESSAMENTO': 'IN_PROCESSING',
                    'REJEITADO': 'INACTIVE',
                    'PENDENTE': 'IN_PROCESSING',
                };
                return statusMap[status] || 'IN_PROCESSING'; 
            };
    
            // Function to validate and format dates
            const validateAndFormatDate = (dateString) => {
                if (!dateString) return null;
                
                // Check if the date string is valid
                const date = new Date(dateString);
                const isValidDate = date instanceof Date && !isNaN(date.getTime());
                
                if (!isValidDate) {
                    console.warn(`Invalid date: ${dateString}`);
                    return null;
                }
                
                // Check if the year is reasonable (between 1900 and 2100)
                const year = date.getFullYear();
                if (year < 1900 || year > 2100) {
                    console.warn(`Date year out of range: ${year}`);
                    return null;
                }
                
                // Format as YYYY-MM-DD for backend
                return date.toISOString().split('T')[0];
            };
    
            // Validate specific type data and clean up invalid dates
            const cleanTypeSpecificData = (typeData) => {
                if (!typeData || typeof typeData !== 'object') return {};
                
                const cleaned = { ...typeData };
                
                // List of potential date fields that might exist in different types
                const dateFields = ['filingDate', 'publicationDate', 'grantDate', 'priorityDate', 'applicationDate'];
                
                dateFields.forEach(field => {
                    if (cleaned[field]) {
                        const validatedDate = validateAndFormatDate(cleaned[field]);
                        if (validatedDate) {
                            cleaned[field] = validatedDate;
                        } else {
                            delete cleaned[field]; // Remove invalid dates
                        }
                    }
                });
                
                return cleaned;
            };
    
            // Preparar o objeto piData (sem os arquivos)
            const piData = {
                title: formData.title,
                description: formData.description,
                type: formData.type.toUpperCase(),
                status: mapStatusToEnum(formData.processingStage),
                requestDate: validateAndFormatDate(formData.requestDate),
                grantDate: validateAndFormatDate(formData.grantDate),
                expirationDate: validateAndFormatDate(formData.expirationDate),
                inventorName: formData.inventorName,
                startupName: formData.startupName,
                processingStage: formData.processingStage,
                ...cleanTypeSpecificData(formData[formData.type.toLowerCase()])
            };

            if (formData.inventorId && formData.inventorId > 0) {
                piData.inventorId = formData.inventorId;
            }

            // Only add startupId if it exists and is not null/undefined/0
            if (formData.startupId && formData.startupId > 0) {
                piData.startupId = formData.startupId;
            }

            // Remove null date fields
            Object.keys(piData).forEach(key => {
                if (piData[key] === null && ['requestDate', 'grantDate', 'expirationDate'].includes(key)) {
                    delete piData[key];
                }
            });
                
            // Remove null date fields
            Object.keys(piData).forEach(key => {
                if (piData[key] === null && ['requestDate', 'grantDate', 'expirationDate'].includes(key)) {
                    delete piData[key];
                }
            });
    
            console.log('Sending piData:', piData); // Debug log
    
            formDataToSend.append('piData', JSON.stringify(piData));
            
            // Adicionar arquivos de documentos
            if (formData.documents && formData.documents.length > 0) {
                formData.documents.forEach((file) => {
                    formDataToSend.append('documents', file);
                });
            }
            
            // Adicionar arquivos de imagens
            if (formData.images && formData.images.length > 0) {
                formData.images.forEach((file) => {
                    formDataToSend.append('images', file);
                });
            }
    
            // Validate and get auth token
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token); // Debug log
            
            if (!token) {
                throw new Error('Token de autenticação não encontrado. Faça login novamente.');
            }
    
            // Validate JWT format (should have 2 dots)
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                console.error('Invalid JWT format:', token);
                throw new Error('Token de autenticação inválido. Faça login novamente.');
            }
            
            const response = await fetch(API_BASE_URL+'/intellectual-properties', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Note: Don't add Content-Type for FormData, let browser set it
                },
                body: formDataToSend,
            });
    
            if (!response.ok) {
                // Handle different error types more specifically
                if (response.status === 401) {
                    throw new Error('Sessão expirada. Faça login novamente.');
                } else if (response.status === 403) {
                    // 403 is permission denied, not expired session
                    throw new Error('Você não tem permissão para realizar esta ação. Verifique suas credenciais.');
                } else if (response.status === 400) {
                    // Try to get specific error message from server
                    let errorMessage = 'Dados inválidos enviados.';
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        // If can't parse response, use default message
                    }
                    throw new Error(errorMessage);
                } else if (response.status >= 500) {
                    throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
                } else {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
            }
            
            // Navega para a página de sucesso
            navigate('/registrar-pi/sucesso', { 
                state: { 
                    tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('-', ' ')
                }
            });
            
            onSubmit && onSubmit(formData);
        } catch (error) {
            console.error('Erro ao registrar propriedade:', error);
            
            setNotification({
                message: error.message,
                type: "error",
                show: true
            });
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const handleChange = (e, tipoCampo) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            if (tipoCampo) {
                // Só atualiza se houver arquivo selecionado
                if (files && files[0]) {
                    setFormData((prev) => ({
                        ...prev,
                        [tipoCampo]: {
                            ...(typeof prev[tipoCampo] === 'object' && prev[tipoCampo] !== null ? prev[tipoCampo] : {}),
                            [name]: files[0],
                        },
                    }));
                }
            } else {
                if (files && files[0]) {
                    setFormData((prev) => ({
                        ...prev,
                        [name]: files[0],
                    }));
                }
            }
        } else {
            if (tipoCampo) {
                setFormData((prev) => ({
                    ...prev,
                    [tipoCampo]: {
                        ...(typeof prev[tipoCampo] === 'object' && prev[tipoCampo] !== null ? prev[tipoCampo] : {}),
                        [name]: value,
                    },
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
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
        <h1>Registrar {tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('_', ' ')}</h1>
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