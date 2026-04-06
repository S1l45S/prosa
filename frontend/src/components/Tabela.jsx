"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Tabela({ categoria }) {
  const [indicacoes, setInd] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);
  const [carregandoExtra, setCarregandoExtra] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!categoria || !user) return;

    async function fetchIndicacoes() {
      try {
        const response = await api.get(`/user/watchlist/${user.id}`);
        const dados = response.data;
        const filtrados = dados.filter(
          (ind) => ind.tipo?.toLowerCase() === categoria.toLowerCase()
        );
        setInd(filtrados);
      } catch (error) {
        console.error("Erro ao buscar indicações:", error);
      }
    }

    fetchIndicacoes();
  }, [categoria, user]);

  async function checkAssistido(indicacao) {
    const statusOriginal = indicacao.assistido;
    const novoStatus = !statusOriginal;

    // UI otimista
    setInd((prev) =>
      prev.map((item) =>
        item.id === indicacao.id
          ? { ...item, assistido: novoStatus }
          : item
      )
    );

    try {
      await api.put(`/indicacoes/${indicacao.id}`, {
        assistido: novoStatus,
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);

      // rollback
      setInd((prev) =>
        prev.map((item) =>
          item.id === indicacao.id
            ? { ...item, assistido: statusOriginal }
            : item
        )
      );

      alert("Não foi possível salvar a alteração.");
    }
  }

  function abrirDetalhes(nome) {
    console.log("Buscar detalhes de:", nome);
  }

  return (
    <>
      {indicacoes.length > 0 ? (
        <table>
          <tbody>
            {indicacoes.map((indicacao) => (
              <tr
                key={indicacao.id}
                className={indicacao.assistido ? "riscado" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={indicacao.assistido}
                    onChange={() => checkAssistido(indicacao)}
                  />
                </td>

                <td className="nome-cell">
                  <span>{indicacao.titulo}</span>

                  <button
                    className="info-btn-inline"
                    onClick={() => abrirDetalhes(indicacao.titulo)}
                    disabled={carregandoExtra}
                    title="Ver detalhes"
                  >
                    <i className="fas fa-info-circle"></i>
                  </button>
                </td>

                <td>{indicacao.quem}</td>

                <td>
                  <button className="delete-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>WatchList VAZIA...</h2>
      )}
    </>
  );
}