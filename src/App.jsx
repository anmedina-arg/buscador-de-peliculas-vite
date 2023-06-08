import "./App.css";
import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

import { Movies } from "./components/movies";
import { useMovie } from "./hooks/useMovie";

import { useSearch } from "./hooks/useSearch";

import searchImage from "./assets/search-svgrepo-com.svg";
import Loader from "./components/loader/loader";

function App() {
  const [sort, setSort] = useState(false);

  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovie({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="container">
      <header>
        <h1 className="title">Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="input-text"
              onChange={handleChange}
              value={search}
              name="query"
              type="text"
              placeholder="Matrix, Avengers, Panther..."
            />
            <button type="submit">
              <img src={searchImage} alt="lupa para buscar peliculas" />
            </button>
          </div>
          <label htmlFor="sorted" className="alphabetic-order">
            <input
              className="checkbox"
              id="sorted"
              type="checkbox"
              onChange={handleSort}
              checked={sort}
            />
            <span>ordenar películas en orden alfabético</span>
          </label>
        </form>
        {error && <p className="error">{error}</p>}
      </header>

      <main>{loading ? <Loader /> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
