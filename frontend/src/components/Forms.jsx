export default function Forms() {

    return (
        <div
            className="main-content"
            style={{ marginLeft: 0, display: "flex", justifyContent: "center", width: "100%" }}
        >
            <div
                className="glass-form"
                style={{
                    background: "rgba(255,255,255,0.02)",
                    padding: "40px",
                    borderRadius: "30px",
                    border: "1px solid var(--glass-border)",
                    width: "100%",
                    maxWidth: "600px"
                }}
            >
                <form id="transactionForm">

                    <div className="input-group">
                        <label>Título</label>
                        <input type="text" name="tituloIndicação" placeholder="Título" required />
                    </div>
                    <div className="input-group">
                        <label>Genero</label>
                        <input type="text" name="generoIndicação" placeholder="Genero" required />
                    </div>
                    <div className="input-group">
                        <label>Autor</label>
                        <input type="text" name="autorIndicação" placeholder="Autor" required />
                    </div>
                    <div>
                        <div className="input-group">
                            <label>Categoria</label>
                            <div className="custom-select-wrapper">
                                <div className="custom-select" data-id="categoriaValue">
                                    <div className="custom-select__trigger">
                                        <span>Selecionar</span>
                                    </div>
                                    <div className="custom-options">
                                        <div className="custom-option"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
                        <button type="submit" className="btn-primary" style={{ flex: 2 }}>
                            Criar
                        </button>

                        <a
                            href="/home"
                            className="btn-primary"
                            style={{
                                flex: 1,
                                background: "var(--glass-bg)",
                                textAlign: "center",
                                textDecoration: "none",
                                lineHeight: "25px"
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