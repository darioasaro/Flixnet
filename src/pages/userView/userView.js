import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../userView/userView.css";
import dataBase from "../../services/database";
import { Redirect } from "react-router-dom";

class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      topRated: [],
      myList: [],
      avaibleList: [],
      idMovie: null
    };
  }
  async componentDidMount() {
    let topMovies = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US&page=1"
    );
    let resMovies = await topMovies.json();

    let user = await dataBase.getData("username");
    let miLista = await dataBase.getData("List of " + user);
    let avaibleList = await dataBase.getData("movies");
    if (miLista === null) {
      miLista = this.state.myList;
      console.log(miLista);
    }

    this.setState({
      topRated: resMovies.results.slice(0, 6),
      myList: miLista,
      avaibleList: avaibleList
    });
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

  render() {
    if (this.state.idMovie)
      // return <Redirect to={`/movie/${this.state.idMovie}`}/>
      return <Redirect to={"/movie"} />;
    return (
      <Container className="container">
        <Button onClick={this.onLoggout}> loggout </Button>
        <h2 className="blockquote text-center">Popular Movies</h2>
        <CardGroup className="card-group">
          {this.state.topRated.map((movie, i) => {
            return (
              <Card key={i}>
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
        </CardGroup>

        <h2 className="blockquote text-center">Avaiable Movies</h2>
        <CardGroup className="card-group">
          {this.state.avaibleList.map((movie, i) => {
            let url;
            movie.poster_path
              ? (url = "342" + movie.poster_path)
              : (url = "500" + movie.backdrop_path);
            return (
              <Card key={i}>
                <Card.Img
                  id={movie.id}
                  className="card-img"
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w" + url}
                  onClick={this.handleClick}
                ></Card.Img>
              </Card>
            );
          })}
        </CardGroup>

        <h2 className="blockquote text-center">My Top Movies</h2>
        <CardGroup className="card-group">
          {this.state.myList.map((movie, i) => {
            let url;
            movie.poster_path
              ? (url = "342" + movie.poster_path)
              : (url = "500" + movie.backdrop_path);
            return (
              <Card key={i}>
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
        </CardGroup>
        <Button onClick={this.deleteMyFavoriteList}> ERASE ALL </Button>
      </Container>
    );
  }
}

export default ViewUser;

// while (cant < array.length) {

//   for (let i = 0 ; i < 6 && cant < array.length; i++) {
//       arraux.push(parseInt(array[cant]))
//       cant++
// }
// console.log('arraux',arraux);

// arraux = []

// }
