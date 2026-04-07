"use client";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from 'next/navigation';
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function GridCategoria({ categoria }) {

    const [indicacoes, setInd] = useState([]);
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const { getIndicacoes } = useApp();
    const router = useRouter();
    const { user } = useAuth()

    async function adicionarWT(userID, indID) {
        if (isLoading) return
        setIsLoading(true)
        try {
            await api.put(`user/watchlist/add/${userID}/${indID}`);
            setText("Adicionada a Watchlist")
            window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
            setTimeout(() => {
                setText('');
            }, 1000);
        } catch (err) {
            const mensagem =
                err.response?.data?.erro ||
                "Erro ao cadastrar. Tente novamente.";
            setText(mensagem);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(() => {
                setText('');
            }, 1000);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getIndicacoes(categoria).then(setInd);
    }, [categoria]);

    return (
        <>
            <p
                style={{
                    color: "#4caf50",
                    marginBottom: "15px",
                    fontWeight: "500",
                    fontSize: "20px",
                }}
            >
                {text}
            </p>
            <section className="cards-wrapper">
                {indicacoes.map(item => (
                    <div key={item.id} className="item-card">
                        <button className="add-to-watchlist"
                            disabled={isLoading}
                            style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "auto" : "pointer" }}
                            onClick={() => adicionarWT(user.id, item.id)}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                        <div className="card-info" onClick={() => router.push(`/comunidade/${item.id}`)}>
                            <div className="card-image-placeholder">
                                <img src={item.capa} alt={item.titulo} />
                            </div>
                            <span className="title-label">{item.titulo}</span>
                            <span className="title-label">{item.quem}</span>
                            <div className="nota-space">
                                <i className="fas fa-star"></i>
                                <span>{item.nota_comunidade || "0.0"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}