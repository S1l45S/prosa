"use client";

import { useState } from "react";
import api from "../services/api";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Forms() {
  const [tipo, setTipo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [autor, setAutor] = useState("");

  const [openSelect, setOpenSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const { user, loading } = useAuth();
  const router = useRouter();

  const categorias = ["Filme", "Série", "Livro"];

  if (loading) return null;

  const handleCriar = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    // validação básica
    if (!titulo || !tipo) {
      setStatus("erro");
      setText("Preencha título e categoria.");
      return;
    }

    setIsLoading(true);

    try {
      await api.post(`/indicacoes/criar/`, {
        titulo,
        genero,
        autor,
        tipo,
        quem: user.nickName,
        nota_comunidade: 0.0,
        user_id: user.id,
      });

      setStatus("sucesso");
      setText("Indicação cadastrada com sucesso!");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setStatus("erro");
      const mensagem =
        err.response?.data?.erro ||
        "Erro ao cadastrar. Tente novamente.";

      setText(mensagem);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="main-content"
      style={{
        marginLeft: 0,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="glass-form"
        style={{
          background: "rgba(255,255,255,0.02)",
          padding: "40px",
          borderRadius: "30px",
          border: "1px solid var(--glass-border)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <form onSubmit={handleCriar}>
          {/* TÍTULO */}
          <div className="input-group">
            <label>Título</label>
            <input
              type="text"
              placeholder="Título"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          {/* GÊNERO */}
          <div className="input-group">
            <label>Gênero</label>
            <input
              type="text"
              placeholder="Gênero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>

          {/* AUTOR */}
          <div className="input-group">
            <label>Autor</label>
            <input
              type="text"
              placeholder="Autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>

          {/* SELECT CUSTOM */}
          <div className="input-group">
            <label>Categoria</label>

            <div className="custom-select-wrapper">
              <div className={`custom-select ${openSelect ? "open" : ""}`}>
                <div
                  className="custom-select__trigger"
                  onClick={() => setOpenSelect(!openSelect)}
                >
                  <span>{tipo || "Selecionar"}</span>
                </div>

                {openSelect && (
                  <div className="custom-options">
                    {categorias.map((c) => (
                      <div
                        key={c}
                        className="custom-option"
                        onClick={() => {
                          setTipo(c);
                          setOpenSelect(false);
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FEEDBACK */}
          {text && (
            <p
              style={{
                marginTop: "15px",
                color: status === "erro" ? "red" : "lightgreen",
              }}
            >
              {text}
            </p>
          )}

          {/* BOTÕES */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "15px",
            }}
          >
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Criando..." : "Criar"}
            </button>

            <a
              href="/"
              className="btn-primary"
              style={{
                flex: 1,
                background: "var(--glass-bg)",
                textAlign: "center",
                textDecoration: "none",
                lineHeight: "25px",
              }}
            >
              Voltar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}