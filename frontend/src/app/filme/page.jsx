import Tabela from "@/src/components/Tabela";
import GridCategoria from "@/src/components/GridCategoria";
import Header from "@/src/components/Header";


export default function Filme() {
    return (
        <>
         <Header/>
        <div className="container">
        <h1>📽 Lista de Filmes</h1>
        <GridCategoria categoria="Filme"/>
        </div>
        </>
    );
        

}