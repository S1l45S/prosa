import Tabela from "@/src/components/Tabela";
import GridCategoria from "@/src/components/GridCategoria";
import Header from "@/src/components/Header";
import "./style.css"

export default function Filme() {
    return (
        <>
         <Header/>
        <div className="container">
        <h1>📽 Lista de Filmes</h1>
        <GridCategoria categoria="Filme"/>
        </div>
        {
            // <div className="container">
            //     <h1>📽 Lista de Filmes</h1>
            //     <Tabela categoria="Filme"/>
            //     <div className="botoes-bottom">
            //         <a href="/"><button>Voltar</button></a>
            //         <button id="sortear-indicacao">Sortear Indicação</button>
            //     </div>
            // </div>
        }
        </>
    );
        

}