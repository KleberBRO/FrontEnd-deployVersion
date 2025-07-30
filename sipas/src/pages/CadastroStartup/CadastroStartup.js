import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./CadastroStartup.css";

function CadastroStartup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    dataFundacao: "",
    setor: "",
    departamento: "",
    capital: "",
    descricao: ""
  });

  const [participantes, setParticipantes] = useState([]);
  const [novoParticipante, setNovoParticipante] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const adicionarParticipante = () => {
    if (novoParticipante.trim() !== "") {
      setParticipantes([...participantes, novoParticipante.trim()]);
      setNovoParticipante("");
    }
  };

  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposObrigatorios = [
      "nome",
      "dataFundacao",
      "setor",
      "departamento",
      "descricao",
    ];

    for (let campo of camposObrigatorios) {
      if (!form[campo] || form[campo].trim() === "") {
        alert(`Por favor, preencha o campo "${campo}".`);
        return;
      }
    }

    if (participantes.length === 0) {
      alert("Por favor, adicione pelo menos um participante.");
      return;
    }

    // Valida o CNPJ apenas se for preenchido
    if (form.cnpj.trim() !== "" && !validarCNPJ(form.cnpj)) {
      alert("CNPJ inválido. Verifique o valor digitado.");
      return;
    }

    // Monta objeto da nova startup
    const novaStartup = { ...form, participantes };

    // Pega lista atual do localStorage ou cria nova lista vazia
    const startupsSalvas = JSON.parse(localStorage.getItem("startups")) || [];

    // Adiciona nova startup à lista
    startupsSalvas.push(novaStartup);

    // Salva a lista atualizada no localStorage
    localStorage.setItem("startups", JSON.stringify(startupsSalvas));

    alert("Startup cadastrada com sucesso!");
    navigate("/startups");
  };

  return (
    <>
      <Header />
      <div className="startup-container">
        <form className="startup-form" onSubmit={handleSubmit}>
          <h2>Cadastrar dados da Startup</h2>
          <div className="form-content">
            <div className="form-left">
              <label>Nome da Startup:
                <input type="text" name="nome" value={form.nome} onChange={handleChange} />
              </label>

              <label>CNPJ:
                <input type="text" name="cnpj" value={form.cnpj} onChange={handleChange} />
              </label>

              <label>Data de fundação:
                <input type="date" name="dataFundacao" value={form.dataFundacao} onChange={handleChange} />
              </label>

              <label>Setor/Área de atuação:
                <select name="setor" value={form.setor} onChange={handleChange}>
                  <option value="">Escolha o setor</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Educação">Educação</option>
                  <option value="Agro">Agro</option>
                </select>
              </label>

              <label>Departamento:
                <select name="departamento" value={form.departamento} onChange={handleChange}>
                  <option value="">Escolha o departamento</option>
                  <option value="DEINFO">DEINFO</option>
                  <option value="DEAGRO">DEAGRO</option>
                </select>
              </label>

              <label>Capital Disponível:
                <input type="text" name="capital" value={form.capital} onChange={handleChange} />
              </label>

              <label>Descrição:
                <textarea name="descricao" value={form.descricao} onChange={handleChange}></textarea>
              </label>
            </div>

            <div className="form-right">
              <h3>Participantes</h3>
              {participantes.length === 0 ? (
                <p>Nenhum participante adicionado.</p>
              ) : (
                <ul>
                  {participantes.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
              <input
                type="text"
                placeholder="Novo participante"
                value={novoParticipante}
                onChange={(e) => setNovoParticipante(e.target.value)}
              />
              <button type="button" onClick={adicionarParticipante} className="btn-participante">
                Adicionar participante
              </button>
            </div>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/listagem-startups")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-confirmar">Confirmar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CadastroStartup;
