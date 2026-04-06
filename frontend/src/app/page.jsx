"use client"
import Header from "@/src/components/Header";
import { useApp } from "@/src/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
    const { getTop } = useApp();
    const [indicacoes,setInd] = useState([]);
    const router = useRouter()
        useEffect(() => {
            getTop("Top").then(setInd);
        }, []);
    return (
        <>
        
        <div className="home-layout">
            <Header />
            <section className="hero-section">
                <div className="hero-text">
                    <h2>TEXTO CHAMANDO PARA USAR A PLATAFORMA ALGUMA FRASE MARCANTE</h2>
                </div>
                <div className="hero-image">
                    <img src="/hero_image.png"></img>
                </div>
            </section>
            <section className="top-prosas">
                <h3>TOP PROSAS</h3>
                <div className="prosas-grid">
                    {indicacoes.map(item=>(<div key={item.id} className="prosa-card" onClick={() => router.push(`/comunidade/${item.id}`)}>
                        <div className="prosa-info">
                            <div className="prosa-image-placeholder">
                                <img src={item.capa} alt={item.titulo} />
                            </div>
                            <div className="nota-space">
                                <i className="fas fa-star"></i>
                                <span>{item.nota_comunidade || "0.0"}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </div>
        </>
    );
}