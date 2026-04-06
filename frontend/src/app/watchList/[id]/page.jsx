"use client"
import Tabela from "@/src/components/Tabela";
import { useEffect, useState } from "react";

export default function WatchList() {
    const categorias = ["Filme", "Série", "Livro"];
    const [index, setIndex] = useState(0);

    const anterior = () => {
        setIndex((prev) => (prev === 0 ? categorias.length - 1 : prev - 1));
    };

    const proximo = () => {
        setIndex((prev) => (prev === categorias.length - 1 ? 0 : prev + 1));
    };

    const categoriaAtual = categorias[index];
    return (
        <div className="container-wt">
            <div className="shift-container">
                <button onClick={anterior} className="shift-btn">
                    ❮
                </button>

                <div style={{ textAlign: "center" }}>
                    <span
                        style={{
                            display: "block",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                        }}
                    >
                        {categoriaAtual}
                    </span>
                </div>

                <button onClick={proximo} className="shift-btn">
                    ❯
                </button>
            </div>
            <Tabela categoria={categoriaAtual} />
        </div>
    )
}