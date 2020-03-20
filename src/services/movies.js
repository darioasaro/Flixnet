// Dado un id busca en la api la pelicula

export const addMovieAuto = async (id_movie,token) => {
 
  let response = await fetch(`http://localhost:3000/api/movies/list/${id_movie}`,{
    method: "POST",
    headers:{
      "Content-Type":"aplication/json",
      "authorization" : token
    }
  })

  let dato = await response.json();
  console.log('dato',dato);
  
  return dato;
};

export const findMovieFav = async (id_movie) => {
 
  let response = await fetch(`http://localhost:3000/api/movies/find/${id_movie}`);

  let dato = await response.json();
  return dato;
};

export const getGenre = async () => {
  let response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US"
  );
  let genres = await response.json();
  return genres;
};

export const isDuplicated = async (where, duplied) => {
  let ret = await localStorage.getItem(where);
  let movies = await JSON.parse(ret);
  let conditional;
  movies.forEach(movie => {
    if (duplied.id === movie.id) {
      conditional = true;
    } else {
      conditional = false;
    }
    return conditional;
  });
  return conditional;
};

export const searchMovies=async (movie,token) =>{
    let results = await fetch('http://localhost:3000/api/movies/'+movie
    ,{
        headers:{
          'Content-Type':'application/json',
          'authorization' : token

        }
    }
    )
    let data = await results.json()
   return data
}


export const movieAdd = async (movie,token)=>{
  console.log(movie);
  
  return fetch('http://localhost:3000/api/movies/', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
        'Content-Type': 'application/json',
        'authorization' : token

    }
  }).then(res => {
      return res;
  }).catch(err => err);
}
export const findAllMovies = async () => {
  const url = "http://localhost:3000/api/movies/";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
export const favouriteList = async (idUser)=>{
  let results = await fetch(`http://localhost:3000/api/user/${idUser}/favoritos`
  ,{
      headers:{
        'Content-Type':'application/json',
        //'authorization' : token

      }
  }
  )
  let data = await results.json()
 return data
}
export const addFavMovieList = async (idMovie, idUser)=>{
  return fetch(`http://localhost:3000/api/user/${idUser}/favoritos/${idMovie}`, {
    method: 'POST',
    //body: JSON.stringify(movie),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      return res;
  }).catch(err => err);
}

export const deleteMovie= async(id, token)=>{
  return fetch(`http://localhost:3000/api/movies/${id}`, {
    method: 'DELETE',
    //body: JSON.stringify(id),
    headers: {
        'Content-Type': 'application/json',
        'authorization' : token
    }
  }).then(res => {
      return res;
  }).catch(err => err);
  
}

export const deleteFavMovie= async(idMovie,idUser)=>{
  return fetch(`http://localhost:3000/api/user/${idUser}/favoritos/${idMovie}`, {
    method: 'DELETE',
    //body: JSON.stringify(id),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => {
      return res;
  }).catch(err => err);
  
}


// export const favouriteList = async (idUser,token)=>{
//   let results = await fetch(`http://localhost:3000/api/user/${idUser}/favoritos`
//   ,{
//       headers:{
//         'Content-Type':'application/json',
//         'authorization' : token

//       }
//   }
//   )
//   let data = await results.json()
//  return data
// }