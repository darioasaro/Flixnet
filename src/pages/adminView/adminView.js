import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import "../adminView/adminView.css";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { findMovie } from "../../services/movies";
import dataBase from "../../services/database";
import {getUsers} from "../../services/users.js"

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      id: "",
      original_title: "",
      overview: "",
      year: "",
      genreAdd: "",
      find: "",
      table: false,
      movies: [],
      addedMovie: false,
      deleted:false,
      addedMovies: [],
      current_page: 0,
      pages: 0,
      genres: [
        {
          id: 28,
          name: "Action"
        },
        {
          id: 12,
          name: "Adventure"
        },
        {
          id: 16,
          name: "Animation"
        },
        {
          id: 35,
          name: "Comedy"
        },
        {
          id: 80,
          name: "Crime"
        },
        {
          id: 99,
          name: "Documentary"
        },
        {
          id: 18,
          name: "Drama"
        },
        {
          id: 10751,
          name: "Family"
        },
        {
          id: 14,
          name: "Fantasy"
        },
        {
          id: 36,
          name: "History"
        },
        {
          id: 27,
          name: "Horror"
        },
        {
          id: 10402,
          name: "Music"
        },
        {
          id: 9648,
          name: "Mystery"
        },
        {
          id: 10749,
          name: "Romance"
        },
        {
          id: 878,
          name: "Science Fiction"
        },
        {
          id: 10770,
          name: "TV Movie"
        },
        {
          id: 53,
          name: "Thriller"
        },
        {
          id: 10752,
          name: "War"
        },
        {
          id: 37,
          name: "Western"
        }
      ]
    };
  }

  //----FUNCIONES----//

  //Borra de la base de datos todas las peliculas

  componentDidMount = async () => {
    let addMovies = await dataBase.getData("movies");
    let movies = addMovies;
    this.setState({
      addedMovies: movies
    });

    console.log("addedmovies", this.state.addedMovies);
  };
  deleteAllMovies = () => {
    dataBase.deleteData("movies");
  };
  //Capta el id de la pelicula la busca a travez de la funcion findMovie y la agrega a App
  async handleAdd(e) {
    let dato = await findMovie(e.target.id);
    let movie = {
      original_title: dato.original_title,
      overview: dato.overview,
      genre: dato.genres,
      release_date: dato.release_date,
      poster_path: dato.poster_path,
      backdrop_path: dato.backdrop_path,
      vote_average: dato.vote_average,
      vote_count: dato.vote_count,
      id: dato.id
    };
    this.props.addMovie(movie);
    let addMovies = await dataBase.getData("movies");
    let movies = addMovies;

    this.setState({
      addedMovie: true,
      addedMovies: movies
      
    });
    //this.forceUpdate()
   
  }
  //Setea los estados de la pelicula que se agrega manualmente
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  //funcion para ejecutar el add de la pelicula manual
  handleClick(e) {
    e.preventDefault();

    let movie = {
      name: this.state.name,
      description: this.state.description,
      genre: this.state.genreAdd,
      year: this.state.year,
      poster_image: this.state.image,
      id: this.state.id
    };
    this.setState({
      addedMovie: true
    });
    this.props.addMovie(movie);
    document.getElementById("form").reset();
  }

  //funcion asincronica que busca en la api y trae los resultados del search del administrador
  async handleSearch(e) {
    e.preventDefault();
    var uri = this.state.find;
    var res = encodeURI(uri);
    let response = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=b813c5783821c2f14ec75f3ae6cb1824&query=" +
        res
    );
    let dato = await response.json();
    this.setState({
      table: true,
      movies: dato.results,
      pages: dato.total_pages,
      current_page: dato.page
    });
  }
  /* EN CONSTRUCCION */
  createPaginacion() {
    let arr = this.state.pages.map(numero => {
      return [<Pagination.Item key={numero}>{numero}</Pagination.Item>];
    });

    console.log(arr);
  }
  //Logout 
  onLoggout = () => {
    this.props.inLoggout();
  };
 //Toma el id del boton y elimina la pelicula de la lista de disponibles
  deleteAdd = async e => {
    let id = e.target.id
    let movies = await dataBase.getData('movies')
    movies = movies.filter(movie=>movie.id != id)  
    dataBase.setData('movies',movies)
   //elimina la pelicula de la lista de cada usuario donde estaba disponible
    let users = await getUsers()
     users.map(async (user)=>{
      let miLista = await dataBase.getData("List of " + user.username);
      
      if(miLista){
      miLista = miLista.filter(miMovie=>miMovie.id != id)
      dataBase.setData("List of "+user.username,miLista)
      }
    })
   
    

    this.setState({
      deleted : true,
      addedMovies:movies
    })
    
  };
  //cierra la tabla de busqueda
  close=() => {
    this.setState({
      table:false
    })
  }

  render() {
    return (
      <Container className="container">
        {/* <Button onClick={this.onLoggout}> loggout </Button> */}
        <h1 className="display-3">Admin Panel</h1>
        <h3 className="display-6">Movies</h3>

        <h3 className="display-6">Add Movie from API</h3>
        <h5>Search</h5>
        {/* <Button onClick={this.deleteAllMovies} variant="primary">
          DELETE
        </Button> */}

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Find Movie"
            name="find"
            onChange={this.handleChange}
          />
          <InputGroup.Append>
            <Button onClick={this.handleSearch} variant="outline-secondary">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {this.state.table && (
          <>
    
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Tittle</th>
                  <th>Year</th>
                  <th>Genre</th>
                  <th><Button variant="outline-danger" onClick={this.close}>Close</Button></th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(movie => (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.release_date}</td>
                    <td>
                      {movie.genre_ids.map(id => {
                        let genero = this.state.genres.map(gnres => {
                          if (id === gnres.id) return gnres.name + "-";
                          else return "";
                        });
                        return genero;
                      })}
                    </td>
                    <td>
                      <Button
                        id={movie.id}
                        onClick={this.handleAdd}
                        variant="primary"
                        type="submit"
                      >
                        Add Movie
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
         )} 

        <h3 className="display-6">Added Movies</h3>
        {/* {this.state.table && ( */}
          <>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Tittle</th>
                  <th>Year</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>
                {this.state.addedMovies.map(movie => (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.original_title}</td>
                    <td>{movie.release_date}</td>
                    <td>
                      {movie.genre.map(gnre => {
                        return gnre.name + "-";
                      })}
                    </td>
                    <td>
                      <Button
                        id={movie.id}
                        onClick={this.deleteAdd}
                        variant="primary"
                        type="submit"
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        {/* )} */}

        <Form id="form" className="adminForm">
          <h3 className="display-6">Add Movie</h3>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="name"
                placeholder="Batman vs Superman"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Year</Form.Label>
              <Form.Control name="year" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                name="genreAdd"
                onChange={this.handleChange}
                as="select"
              >
                {this.state.genres.map((generos, i) => (
                  <option key={i}>{generos.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <InputGroup as={Col}>
              <InputGroup.Prepend>
                <InputGroup.Text>Description</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="description"
                onChange={this.handleChange}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>

            <Form.Group as={Col}>
              <Form.Label>Search Image</Form.Label>
              <Form.Control
                type="file"
                name="images"
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>

          <Button onClick={this.handleClick} variant="primary" type="submit">
            Add Movie
          </Button>
        </Form>
      </Container>
    );
  }
}
export default AdminView;
