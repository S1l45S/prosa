import Header from "@/src/components/Header";
import GridCategoria from "@/src/components/GridCategoria";
export default function Serie() {
    return (
        <>
            <Header />
            <div className="container">
                <h1>🎬 Lista de Séries</h1>
                <GridCategoria categoria="Série" />
            </div>
        </>
    )
}