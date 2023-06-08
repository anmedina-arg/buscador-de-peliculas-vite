import { useEffect, useState, useRef } from "react";

export function useSearch() {
  //este es un custom Hook
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const firstInput = useRef(true); // <// banderita

  //PODEMOS REALIZAR LA VALIDACION DEL FORMULARIO EN UN useEffect...
  useEffect(() => {
    if (firstInput.current) {
      //< este if, con el useRef, lo usamos para veirificar que en el primer render, no pase la validacion de input vacio
      firstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una pelicula que empiece con un espacio");
      return;
    }
    if (search.match(/^\d+$/)) {
      // <-- usamos regex para veirifcar si el estado matchea con un numero
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
