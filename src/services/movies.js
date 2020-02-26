// Dado un id busca en la api la pelicula

export const findMovie = async id => {
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US"
  );

  let dato = await response.json();

  return dato;
};

export const getGenre = async () =>{
  let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US')
  let genres = await response.json()
  return genres
}
