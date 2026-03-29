const axios = require("axios");

exports.buscarDetalhes = async (categoria, nome) => {
    let url;

    if (categoria === "Livro") {
        url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(nome)}&maxResults=1&key=${process.env.BOOK_API_KEY}`;
        const res = await axios.get(url);

        if (res.data.totalItems > 0) {
            const livro = res.data.items[0].volumeInfo;
            return {
                sinopse: livro.description || "Sinopse não disponível.",
                capa: livro.imageLinks?.thumbnail || null,
                nota: livro.averageRating || "N/A"
            };
        }
    } else if (categoria === "Filme" || categoria === "Série") {
        const tipo = categoria === "Filme" ? "movie" : "tv";

        url = `https://api.themoviedb.org/3/search/${tipo}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(nome)}&language=pt-BR`;

        const res = await axios.get(url);

        if (res.data.results.length > 0) {
            const c = res.data.results[0];
            return {
                sinopse: c.overview,
                capa: c.poster_path ? `https://image.tmdb.org/t/p/w500${c.poster_path}` : null,
                nota: c.vote_average
            };
        }
    }

    throw new Error("Não encontrado");
};
