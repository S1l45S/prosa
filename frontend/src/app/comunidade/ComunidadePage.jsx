"use client";
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
export default function ComunidadePage({ id }) {
    const { getDetalhesComunidade } = useApp();
    const [dados, setDados] = useState(null);

    useEffect(() => {
        getDetalhesComunidade(id).then(setDados);
    }, [id]);

    if (!dados) return (
        <div className="loader">
            <span className="text">Carregando</span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>);

    const { item, reviews } = dados;

    return (
        <div className="comunidade-layout">
            <div className="main-content-split">
                <aside className="obra-sidebar">
                    <div className="poster-big">
                        <img src={item.capa} alt={item.nome} />
                    </div>
                    <div className="obra-meta">
                        <h2>{item.nome}</h2>
                        <p>{item.autor || 'Autor Desconhecido'}</p>
                        <p>{item.tipo}</p>
                        <div className="global-rating">
                            <i className="fas fa-star"></i>
                            {item.media_nota}
                        </div>
                    </div>
                </aside>
                <section className="obra-details">
                    <div className="sinopse-box">
                        <h3>SINOPSE</h3>
                        <hr />
                        <p>{item.sinopse}</p>
                    </div>
                    <div className="interacoes-container">
                        <h3>INTERAÇÕES</h3>
                        <div className="reviews-list">
                            {reviews.map(rev => (<div key={rev.id} className="review-card">
                                <div className="user-avatar">
                                    <i className="fas fa-user"></i>
                                    <strong>{rev.nickname}</strong>
                                </div>
                                <p className="comment-text">{rev.conteudo}</p>
                            </div>))}
                        </div>
                    </div>
                </section>
            </div>
        </div>);
}