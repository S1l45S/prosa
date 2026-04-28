import GridCategoria from "@/src/components/GridCategoria";
import Header from "@/src/components/Header";

export default function Livro() {
    return (
        <>
            <Header />
            <div className="container">
                <h1>📚 Lista de Livros</h1>
                <GridCategoria categoria="Livro" />
            </div>
        </>

    )
}