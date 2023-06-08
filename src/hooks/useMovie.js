import { searchMovies } from "../services/movies";
import { useState, useRef, useMemo, useCallback } from "react";

export function useMovie({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const previusSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (previusSearch.current === search) return;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
