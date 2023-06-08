import { searchMovies } from "../services/movies";
import { useState, useRef, useMemo, useCallback } from "react";

/* El hoock useMemo es para poder memorizar computaciones, calculos que hemos hecho, que queremos evitar que se hagan A NO SER que se cambien las dependencias que hemos establecido*/

/* El useCallback es lo mismo que el useMemo SOLAMENTE QUE ES ESPECIFICO PARA FUNCIONES, es una especie de azucar sintactico, de hecho el useCallback utiliza un useMemo de fondo
la diferencia entre el useMemo vs el useCallback es que el callback se usa para funciones y el memo para cualquier cosa 
*/

export function useMovie({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const previusSearch = useRef(search);

  /* FUNCION getMovies CON useMemo en donde memorizamos una funcion
  const getMovies = useMemo(() => {
    return async ({ search }) => {
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
        //esto se va a ejecutar tanto si se cumple el try como si se cumple el catch
        setLoading(false);
      }
    };
  }, []);
*/

  //FUNCION getMovies CON useCallback
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
      //esto se va a ejecutar tanto si se cumple el try como si se cumple el catch
      setLoading(false);
    }
  }, []);

  //cutilizando el useMemo en la funcion sortedMovies, hemos optimizado el codigo porque estamos evitando renderizados extras que se hacen, por ejemplo, al cambiar el search... por que se renderizaria de nuevo si cambiamos el search? Porque el search es un parametro de nuestra funcion! entonces, cada vez que cambie ese parametro se vuelve a renderizar el componente, porque el cuerpo del componente "tambien es un render"

  //esto es un ejemplo de useMemo en donde memorizamos un valor
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}

/*
UN CUSTOMHOOK SIEMPRE DEBE DEVOLVER UN OBJETO???
No, un custom hook en React no está limitado a devolver únicamente un objeto. Un custom hook puede devolver cualquier valor, incluyendo primitivas (como números, cadenas de texto, booleanos) y también otros tipos de datos más complejos, como arrays, funciones o incluso otro hook.

La CONVENCION COMUNMENTE UTILIZADA es que un custom hook devuelva un objeto, ya que esto permite estructurar los datos de manera más clara y flexible. Al devolver un objeto, puedes incluir múltiples propiedades y acceder a ellas de forma desestructurada en el componente que utiliza el hook.

Sin embargo, en casos donde solo se necesita un valor específico, un custom hook puede devolver directamente ese valor sin necesidad de envolverlo en un objeto.

*/
