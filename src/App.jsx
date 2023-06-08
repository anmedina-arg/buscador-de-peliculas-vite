import { useCallback, useState } from "react";
import "./App.css";
import debounce from "just-debounce-it";

import { Movies } from "./components/movies";
import { useMovie } from "./hooks/useMovie";
//import { useEffect, useRef, useState } from "react"; <-- esta linea queda porque estaba realizando la validacion del formulario en este componente, al crear un custom hook, ya no la necesito!
import { useSearch } from "./hooks/useSearch";
//EXPLICACIONES DEL USE REF
//EXPLICACION MALA: Te permite crear una referencia a un elemento del DOM <-- INCOMPLETA! MALA DEFINICION!
//EXPLICACION BUENA: es un hook que te permite crear una refernecia mutable que persiste (que su valor no es reiniciado) durante todo el ciclo de vida de un componente... y lo que es mejor! Es util para guardar cualquier valor que puedas mutar, como un identificador, como un elemento del DOM, como un contador, etc... y que cada vez que cambia no vuelve a renderizar el componente! esta es la principal diferencia con el useState, es decir, el useRef no dispara un nuevo renderizado

function App() {
  const [sort, setSort] = useState(false);

  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovie({ search, sort });

  /*Para usar el dabunce hemos utilizado una libreria, para porder ver su sintaxis es necesario ver su documentacion*/
  //esta parte del debounced no me queda del todo claro porque me sugiere que se pierden las dependencias en el useCallback
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  // const inputRef = useRef();

  /* ESTA ES UNA FORMA de obtener el valor del input UTILIZANDO EL HOOK USEREF... a continuacion veremos otra forma sin usarlo y en particular, muy novedosa para mi...
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    console.log(value);
  };
  */

  /*CONTROL DE FORMULARIO DE FORMA NO CONTROLADA */
  //  const handleSubmit = (event) => {
  //  event.preventDefault();
  //  const fields = new FormData(event.target);
  //  const query = fields.get("query");
  //  // o puedes usar la lonea comentada de abajo
  //  //const { query } = Object.fromEntries(new FormData(event.target));
  //  console.log(query);
  //  //como recuperar todos los campos de un form. Descomentar en el return los inputs comentados...
  //  // const fields = Object.fromEntries(new FormData(event.target));
  //  // console.log(fields);
  //  };

  /*CONTROL DE FORMULARIOS DE FORMA CONTROLADA (es decir que React controla lo que escribimos en el formulario, y lo hace a traves de un estado)*/

  //  console.log("render"); <-- una DESVENTAJA que tiene la FORMA CONTROLADA es que el componente se renderiza cada vez que agrego una letra en el imput
  //                              podemos ver esto si descomentamos este console log

  // una VENTAJA que tiene la FORMA CONTROLADA es que nos permite realizar las validaciones de manera mas facil (aunque de la manera no controlada tambien se puede realizar, solo que es mas trabajosa, lleva mas codigo)

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
    // // *PODEMOS REALIZAR LA VALIDACION DEL FORMULARIO AQUI O EN EL useEfect de mas abajo, es lo mismo... Midu recomienda aqui...

    // // OJO! el estado es asincrono! por lo que para asegurarnos que estamos trabajando con el valor mas actualizado del input, deberiamos hacer lo siguiente:
    // const newSearch = event.target.value; // y de esta manera nos aseguramos que estamos validando el input mas actual que estamos ingresando
    // // otra VENTAJA que nos permite la forma controlada es hacer una PREVALIDACION:
    // //console.log(typeof newSearch);
    // if (newSearch[0] === " ") return; //<-- esta linea es una PREVALIDACION, no me deja iniciar a buscar con un espacio vacio!

    // setSearch(event.target.value);

    // //if (search === "") {
    // if (newSearch === "") {
    //   setError("No se puede buscar una pelicula que empiece con un espacio");
    //   return;
    // }
    // //if (search.match(/^\d+$/)) {
    // if (newSearch.match(/^\d+$/)) {
    //   // <-- usamos regex para veirifcar si el estado matchea con un numero
    //   setError("No se puede buscar una pelicula con un numero");
    //   return;
    // }
    // //if (search.length < 3) {
    // if (newSearch.length < 3) {
    //   setError("Por favor ingrese mas de 3 caracteres");
    //   return;
    // }
    // setError(null);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="container">
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit}>
          {/* quito el ref={inputRef} del input de abajo */}
          {/* el name del input se utiliza para la funcion handleSubmit sin useRef */}
          <input
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
          />
          {/* para ver como obtener todos los campos de un formulario puedes descomentar los inputs siguientes y descomentar en la funcion handle submit y ver el console.log */}
          {/* <input name="name" type="text" />
          <input name="lastname" type="text" />
          <input name="adres" type="text" /> */}
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? "Cargando" : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
