import React, { useState, useEffect } from "react";
import "./ListagemStartups.css";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

function ListagemStartups() {
  const navigate = useNavigate();

  const [startups, setStartups] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [startupSelecionada, setStartupSelecionada] = useState(null);
  const [editando, setEditando] = useState(false); // para saber se está editando
  const [formEdit, setFormEdit] = useState(null);   // estado do formulário editável

  // Carrega startups do localStorage quando o componente monta
  useEffect(() => {
    const startupsSalvas = JSON.parse(localStorage.getItem("startups")) || [];
    setStartups(startupsSalvas);
  }, []);

  const abrirModal = (startup) => {
    setStartupSelecionada(startup);
    setEditando(false);
    setFormEdit(null);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setStartupSelecionada(null);
    setEditando(false);
    setFormEdit(null);
  };

  // Excluir startup selecionada
  const excluirStartup = () => {
    if (!startupSelecionada) return;
    if (!window.confirm(`Deseja realmente excluir a startup "${startupSelecionada.nome}"?`)) return;

    const startupsAtualizadas = startups.filter(s => s !== startupSelecionada);
    setStartups(startupsAtualizadas);
    localStorage.setItem("startups", JSON.stringify(startupsAtualizadas));
    fecharModal();
  };

  // Iniciar edição
  const iniciarEdicao = () => {
    setEditando(true);
    // Copia os dados para o formulário de edição
    setFormEdit({ ...startupSelecionada });
  };

  // Atualiza formulário de edição
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormEdit(prev => ({ ...prev, [name]: value }));
  };

  // Salvar edição
  const salvarEdicao = () => {
    // Validação simples (você pode expandir)
    if (!formEdit.nome || formEdit.nome.trim() === "") {
      alert("Nome é obrigatório");
      return;
    }
    if (!formEdit.dataFundacao || formEdit.dataFundacao.trim() === "") {
      alert("Data de fundação é obrigatória");
      return;
    }
    if (!formEdit.setor || formEdit.setor.trim() === "") {
      alert("Setor é obrigatório");
      return;
    }
    if (!formEdit.departamento || formEdit.departamento.trim() === "") {
      alert("Departamento é obrigatório");
      return;
    }
    if (!formEdit.descricao || formEdit.descricao.trim() === "") {
      alert("Descrição é obrigatória");
      return;
    }

    // Atualiza a lista de startups com os dados editados
    const startupsAtualizadas = startups.map(s =>
      s === startupSelecionada ? formEdit : s
    );

    setStartups(startupsAtualizadas);
    localStorage.setItem("startups", JSON.stringify(startupsAtualizadas));
    setStartupSelecionada(formEdit);
    setEditando(false);
    alert("Startup atualizada com sucesso!");
  };

  return (
    <>
      <Header />
      <div className="listagem-container">
        <div className="topo">
          <h2>Startups Cadastradas</h2>
        </div>

        <table className="tabela-startups">
          <thead>
            <tr>
              <th>🔍</th>
              <th>Nome da Startup</th>
              <th>Data de criação</th>
              <th>Status</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {startups.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Nenhuma startup cadastrada.
                </td>
              </tr>
            ) : (
              startups.map((s, idx) => (
                <tr key={idx}>
                  <td>
                    <button className="btn-detalhes" onClick={() => abrirModal(s)}>
                      🔍
                    </button>
                  </td>
                  <td>{s.nome}</td>
                  <td>{s.dataFundacao || "-"}</td>
                  <td>{s.status || "Ativa"}</td>
                  <td>{s.descricao}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          className="btn-flutuante"
          onClick={() => navigate("/cadastro-startup")}
          title="Cadastrar nova startup"
        >
          ＋
        </button>

        {modalAberto && startupSelecionada && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="fechar" onClick={fecharModal}>
                ✕
              </button>

              <h2>
                {editando ? "Editar Startup" : "Informações da Startup"}
              </h2>

              <div className="modal-info">
                {!editando ? (
                  <>
                    <div className="info-coluna">
                      <p><strong>Nome:</strong> {startupSelecionada.nome}</p>
                      <p><strong>CNPJ:</strong> {startupSelecionada.cnpj || "-"}</p>
                      <p><strong>Data de cadastro:</strong> {startupSelecionada.dataFundacao || "-"}</p>
                      <p><strong>Status:</strong> {startupSelecionada.status || "Ativa"}</p>
                      <p><strong>Setor/Área de atuação:</strong> {startupSelecionada.setor || "-"}</p>
                      <p><strong>Descrição:</strong> {startupSelecionada.descricao}</p>
                    </div>
                    <div className="info-coluna">
                      <p><strong>Participantes:</strong></p>
                      <ul>
                        {startupSelecionada.participantes && startupSelecionada.participantes.length > 0 ? (
                          startupSelecionada.participantes.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))
                        ) : (
                          <li>Sem participantes</li>
                        )}
                      </ul>
                    </div>
                  </>
                ) : (
                  // Formulário de edição
                  <div className="form-editar">
                    <label>
                      Nome:
                      <input
                        type="text"
                        name="nome"
                        value={formEdit.nome}
                        onChange={handleEditChange}
                      />
                    </label>

                    <label>
                      CNPJ:
                      <input
                        type="text"
                        name="cnpj"
                        value={formEdit.cnpj || ""}
                        onChange={handleEditChange}
                      />
                    </label>

                    <label>
                      Data de fundação:
                      <input
                        type="date"
                        name="dataFundacao"
                        value={formEdit.dataFundacao || ""}
                        onChange={handleEditChange}
                      />
                    </label>

                    <label>
                      Setor/Área de atuação:
                      <select
                        name="setor"
                        value={formEdit.setor || ""}
                        onChange={handleEditChange}
                      >
                        <option value="">Escolha o setor</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Educação">Educação</option>
                        <option value="Agro">Agro</option>
                      </select>
                    </label>

                    <label>
                      Departamento:
                      <select
                        name="departamento"
                        value={formEdit.departamento || ""}
                        onChange={handleEditChange}
                      >
                        <option value="">Escolha o departamento</option>
                        <option value="DEINFO">DEINFO</option>
                        <option value="DEAGRO">DEAGRO</option>
                      </select>
                    </label>

                    <label>
                      Capital Disponível:
                      <input
                        type="text"
                        name="capital"
                        value={formEdit.capital || ""}
                        onChange={handleEditChange}
                      />
                    </label>

                    <label>
                      Descrição:
                      <textarea
                        name="descricao"
                        value={formEdit.descricao || ""}
                        onChange={handleEditChange}
                      />
                    </label>

                    {/* Participantes: simples edição por string separada por vírgula */}
                    <label>
                      Participantes (separados por vírgula):
                      <input
                        type="text"
                        name="participantes"
                        value={formEdit.participantes ? formEdit.participantes.join(", ") : ""}
                        onChange={(e) =>
                          setFormEdit(prev => ({
                            ...prev,
                            participantes: e.target.value.split(",").map(p => p.trim()).filter(p => p !== "")
                          }))
                        }
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="botoes-modal">
                {!editando ? (
                  <>
                    <button className="btn-excluir" onClick={excluirStartup}>
                      🗑 Excluir
                    </button>
                    <button className="btn-editar" onClick={iniciarEdicao}>
                      ✎ Editar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-cancelar" onClick={() => setEditando(false)}>
                      Cancelar
                    </button>
                    <button className="btn-confirmar" onClick={salvarEdicao}>
                      Salvar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ListagemStartups;
