const API_KEY = "2b2f4c56";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();
    const movies = json.Search;

    //por que se hace un mapeo de datos desde una API? porque de esta manera nos independizamos del contrato de la API, es decir, si usamos por ejemplo:
    // movie.imdbID en varias partes del codigo... y la API un dia cambia: "imdbID" por "ownID", deberemos cambiar en todo nuestro codigo: "imdbID" por "ownID";
    // en cambio, haciendo un mapeo propio, solamente tendremos que cambiar una propiedad en nuestro mapeo y se cambiara en todo nuestro codigo!
    return movies?.map((movie) => {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      };
    });
  } catch (e) {
    throw new Error("error searching movies");
  }
};
