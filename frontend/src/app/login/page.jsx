"use client"
import { useState } from "react";
import api from "../../services/api";
import "./style.css"
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [text, setText] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, senha });
            login(res.data.token)
            setTimeout(() => {
                router.push("/");
            }, 500);
        } catch (err) {
            const mensagem =
                err.response?.data?.erro ||
                "Erro ao Logar. Tente novamente.";
            setText(mensagem);
        }
    };
    return (
        <div className="split-container">
            <div className="form-section">
                <div className="glass-form">
                    <div className="text-section">
                        <h1 style={{ fontSize: "3rem", marginBottom: "1px", fontWeight: 800, letterSpacing: "-1px" }}>
                            Prosa
                        </h1>

                        <p style={{ color: "var(--text-dim)", marginBottom: "10px", marginLeft: "20px" }}>
                            "A curadoria do seu grupo, em um só lugar.".
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>
                        {text && (
                            <p style={{ color: "#ff4d4d", marginBottom: "15px", fontWeight: "500" }}>
                                {text}
                            </p>)}
                        <div className="input-group">
                            <label>E-mail</label>
                            <input type="email" onChange={(e) => {
                                setEmail(e.target.value);
                                setText("");
                            }} required placeholder="user@exemplo.com" />
                        </div>
                        <div className="input-group">
                            <label>Senha</label>
                            <input type="password" onChange={(e) => {
                                setSenha(e.target.value);
                                setText("");
                            }} required placeholder="••••••••" />
                        </div>
                        <button type="submit" className="btn-primary">Entrar</button>
                    </form>

                    <p style={{ marginTop: "30px", color: "var(--text-dim)", textAlign: "center" }}>
                        Novo por aqui?
                        <a href="/cadastro" style={{ color: "var(--accent-purple)", textDecoration: "none", fontWeight: 600 }}>
                            Criar conta
                        </a>
                    </p>
                </div>
            </div>
            <div
                className="image-section"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070')"
                }}
            >
                <div style={{ zIndex: 1, padding: "60px", maxWidth: "500px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>
                        Sua próxima história favorita foi indicada por quem te conhece de verdade.
                    </h2>
                </div>
            </div>
        </div>
    );
}