import React, { useState } from 'react';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

// 1. (Opcional) Mover a função de formatação para fora do componente para que não seja recriada a cada renderização.
const formatCPF = (cpf) => {
    // Remove qualquer caractere que não seja dígito
    const rawCpf = cpf.replace(/[^\d]/g, '');

    // Aplica a máscara de CPF
    return rawCpf
        .slice(0, 11) // Garante que não teremos mais de 11 dígitos
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

function StepInventor({ formData, handleChange }) {
    const [cpfError, setCpfError] = useState('');

    // 2. O valor do input do CPF será controlado por um estado local para a máscara
    const [maskedCpf, setMaskedCpf] = useState(formatCPF(formData.cpf || ''));

    const handleCpfChange = (event) => {
        // 3. Pega o valor digitado e formata-o imediatamente para exibição
        const formatted = formatCPF(event.target.value);
        setMaskedCpf(formatted);

        // 4. Remove a máscara para obter apenas os números para validação e para salvar no estado global
        const rawCpf = event.target.value.replace(/[^\d]/g, '');

        // Atualiza o estado do formulário principal com o CPF sem máscara
        handleChange({
            target: {
                name: 'cpf',
                value: rawCpf,
            },
        });

        // Valida o CPF quando o campo tem 11 dígitos
        if (rawCpf.length === 11) {
            if (!cpfValidator.isValid(rawCpf)) {
                setCpfError('CPF inválido.');
            } else {
                setCpfError(''); // Limpa o erro se o CPF for válido
            }
        } else if (rawCpf.length > 0) {
            setCpfError(''); // Limpa o erro enquanto o usuário está digitando
        }
    };

    return (
        <>
            <h2>Informações do Inventor</h2>
            {/* Campo Nome do Inventor */}
            <div className="form-group">
                <label htmlFor="inventorName">Nome do Inventor</label>
                <input
                    type="text"
                    id="inventorName"
                    name="inventorName"
                    placeholder="Digite o nome completo do inventor"
                    value={formData.inventorName}
                    onChange={handleChange}
                />
            </div>

            {/* Campo E-mail do Inventor */}
            <div className="form-group">
                <label htmlFor="email">E-mail do Inventor</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite o e-mail do inventor"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            {/* Campo CPF do Inventor com máscara manual */}
            <div className="form-group">
                <label htmlFor="cpf">CPF do Inventor</label>
                {/* 5. Usamos um <input> normal */}
                <input
                    type="text" // Usar "text" permite a inserção dos pontos e traço
                    id="cpf"
                    name="cpf"
                    placeholder="Digite o CPF do inventor"
                    value={maskedCpf} // O valor exibido é o CPF com a máscara
                    onChange={handleCpfChange}
                    maxLength="14" // 11 números + 2 pontos + 1 traço
                />
                {/* Exibe a mensagem de erro, se houver */}
                {cpfError && <span style={{ color: 'red' }}>{cpfError}</span>}
            </div>
        </>
    );
}

export default StepInventor;