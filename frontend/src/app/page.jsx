
export const metadata = {
  title: 'Indicações',
  description: 'Indiçaões de Filmes, Livros e Séries',
};

export default function Home() {
  return (
      <div className="container">
        <h1>📽 Lista de Indicações</h1>
        <div className="botoes-home">
          <a href="/filme"><button>Filmes</button></a>
          <a href="/serie"><button>Séries</button></a>
          <a href="/livro"><button>Livros</button></a>
          <a href="/login"><button>Teste</button></a>
        </div>
      </div>
  );
}
