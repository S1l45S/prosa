"use client"
import { useState } from "react";
import api from "../../services/api";
import "./style.css"

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setnome] = useState('');
    const [nickname, setnickname] = useState('');
    const [text, setText] = useState("");
    const [tipo, setTipo] = useState("");

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/cadastro', { nome, nickname, email, senha, "watchlist": [] });
            localStorage.setItem('token', res.data.token);
            setTipo("sucesso");
            setText("Cadastro realizado com sucesso!");
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        } catch (err) {
            setTipo("erro");
            const mensagem =
                err.response?.data?.erro ||
                "Erro ao cadastrar. Tente novamente.";

            setText(mensagem);
        }
    };

    return (
        <div className="split-container" style={{ flexDirection: "row-reverse" }}>
            <div className="form-section">
                <div className="glass-form">
                    <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Prosa Boa</h2>
                    <p style={{ color: "var(--text-dim)", marginBottom: "10px" }}>
                        Conectando amigos através de grandes histórias.
                    </p>

                    <form onSubmit={handleCadastro}>
                        {text && (
                            <p
                                style={{
                                    color: tipo === "erro" ? "#ff4d4d" : "#4caf50",
                                    marginBottom: "15px",
                                    fontWeight: "500"
                                }}
                            >
                                {text}
                            </p>
                        )}
                        <div className="input-group">
                            <label>Nome Completo</label>
                            <input type="text" name="nome" onChange={(e) => setnome(e.target.value)} placeholder="Seu nome" required />
                        </div>
                        <div className="input-group">
                            <label>NickName</label>
                            <input type="text" name="nickname" onChange={(e) => setnickname(e.target.value)} placeholder="nickname" required />
                        </div>
                        <div className="input-group">
                            <label>E-mail</label>
                            <input type="email" name="email" onChange={(e) => {
                                setEmail(e.target.value);
                                setText("");
                            }} placeholder="email@exemplo.com" required />
                        </div>
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" name="senha" onChange={(e) => setSenha(e.target.value)} placeholder="Crie uma senha forte" required />
                        </div>
                        <button type="submit" className="btn-primary">Criar minha conta</button>
                    </form>

                    <p style={{ marginTop: "30px", color: "var(--text-dim)", textAlign: "center" }}>
                        Já tem conta? <a href="/login" style={{ color: "var(--accent-purple)", textDecoration: "none", fontWeight: 600 }}>Fazer login</a>
                    </p>
                </div>
            </div>

            <div
                className="image-section"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611974717483-5828fb77e2ec?q=80&w=2070')" }}
            >
                <div style={{ zIndex: 1, padding: "60px", maxWidth: "500px", textAlign: "right" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
                        Entre para a roda. O que seus amigos andam vendo, lendo e maratonando?.
                    </h2>
                </div>
            </div>
        </div>
    );
}