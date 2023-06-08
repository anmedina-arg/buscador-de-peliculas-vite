import { useEffect, useState, useRef } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const firstInput = useRef(true);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una pelicula que empiece con un espacio");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }
    if (search.length < 3) {
      setError("Por favor ingrese mas de 3 caracteres");
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error };
}
