/* eslint-disable react/prop-types */
function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => {
        return (
          <li key={movie.id} className="movie-item">
            <h3>{movie.title}</h3>
            <span>{movie.year}</span>
            <img src={movie.poster} alt={movie.title} />
          </li>
        );
      })}
    </ul>
  );
}

function NoMoviesResult() {
  return <p>No se encontraron peliculas para esta busqueda</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
}
