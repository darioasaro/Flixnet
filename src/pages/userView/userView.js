import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../userView/userView.css";
import dataBase from "../../services/database";
import { Redirect } from "react-router-dom";
import { checkUsers } from "../../services/users.js";
import { getGenre,favouriteList } from "../../services/movies";

class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.filter = this.filter.bind(this);
    this.state = {
      topRated: [],
      myList: [],
      avaibleList: [],
      genres: [],
      filterGenre: "All",
      idMovie: null,
      validator: true
    };
  }
  async componentDidMount() {
    if (checkUsers()) {
      let topMovies = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US&page=1"
      );
      let resMovies = await topMovies.json();

      let user = await dataBase.getData("username");
      let miLista = await dataBase.getData("List of " + user);
      let avaibleList = await dataBase.getData("movies");
      let newList = await favouriteList(await dataBase.getData('id_user'))
      console.log('nuevalista',newList)
      if (miLista === null) {
        miLista = this.state.myList;
        //console.log(miLista);
      }
      let generos = await getGenre();
      generos.genres.unshift({ id: 0, name: "All" });

      this.setState({
        topRated: resMovies.results.slice(0, 6),
        myList: miLista,
        avaibleList: avaibleList,
        genres: generos.genres
      });
    } else {
      this.setState({ validator: false });
    }
  }
  onLoggout = () => {
    this.props.inLoggout();
  };
  handleClick = e => {
    //console.log(e.target.id)
    this.setState({
      idMovie: e.target.id
    });
    this.props.selfMovieView(e.target.id);
  };

  deleteMyFavoriteList = async () => {
    let user = await dataBase.getData("username");
    dataBase.setData("List of " + user, []);
    this.setState({
      myList: []
    });
  };
  filter(e) {
    this.setState({
      filterGenre: e.target.value
    });
  }
  render() {
    if (!this.state.validator) return <Redirect to={"/"} />;
    if (this.state.idMovie)
      // return <Redirect to={`/movie/${this.state.idMovie}`}/>
      return <Redirect to={"/movie"} />;
    return (
      <Container className="container">
        <div className="sidenav">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Search by Genre</Form.Label>
            <Form.Control onChange={this.filter} as="select">
              {this.state.genres.map(genero => (
                <option>{genero.name}</option>
              ))}
              <Button type="submit" onClick={this.handleFilter}>
                {" "}
              </Button>
            </Form.Control>
          </Form.Group>
        </div>
        {/* <Button onClick={this.onLoggout}> loggout </Button> */}
        {/* <h2 className="blockquote text-center">Popular Movies</h2>
        <div className="cartas-group">
          {this.state.topRated.map((movie, i) => {
            return (
              <Card className="card" key={i}>
                <Card.Img
                  id={movie.id}
                  className="card-img"
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w342" + movie.poster_path}
                  onClick={this.handleClick}
                />
              </Card>
            );
          })}
        </div> */}

        <h2 className="blockquote text-center">Avaiable Movies</h2>
        <div className="cartas-group">
          {this.state.avaibleList.map((movie, i) => {
            let url;
            movie.poster_path
              ? (url = "342" + movie.poster_path)
              : (url = "500" + movie.backdrop_path);
            if (this.state.filterGenre === "All") {
              return (
                <Card className="card" key={i}>
                  <Card.Img
                    id={movie.id}
                    className="card-img"
                    variant="top"
                    src={"https://image.tmdb.org/t/p/w" + url}
                    onClick={this.handleClick}
                  ></Card.Img>
                </Card>
              );
            } else {
              let dev = movie.genre.map(genero => {
                if (genero.name == this.state.filterGenre) {
                  return (
                    <Card className="card" key={i}>
                      <Card.Img
                        id={movie.id}
                        className="card-img"
                        variant="top"
                        src={"https://image.tmdb.org/t/p/w" + url}
                        onClick={this.handleClick}
                      ></Card.Img>
                    </Card>
                  );
                }
              });
              return dev;
            }
          })}
        </div>

        <h2 className="blockquote text-center">My Top Movies</h2>
        <div className="cartas-group">
          {this.state.myList.map((movie, i) => {
            let url;
            movie.poster_path
              ? (url = "342" + movie.poster_path)
              : (url = "500" + movie.backdrop_path);
            return (
              <Card className="card" key={i}>
                <Card.Img
                  id={movie.id}
                  className="card-img"
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w" + url}
                  onClick={this.handleClick}
                />
              </Card>
            );
          })}
        </div>
        <Button onClick={this.deleteMyFavoriteList}> ERASE ALL </Button>
      </Container>
    );
  }
}

export default ViewUser;
