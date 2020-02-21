import React from "react";
import Container from "react-bootstrap/Container";
import "./singleMovie.css";
import Button from "react-bootstrap/Button";
import dataBase from "../../services/database";

class SingleMovie extends React.Component {
  constructor(props) {
    super();
  }
  addFav = async () => {
    const user = await dataBase.getData("username");
    const json = await dataBase.getData("List of " + user);
    if (!json) {
      dataBase.setData("List of " + user, []);
      this.addFav();
    } else {
      let favs = json;
      favs.push(this.props.movie);
      dataBase.setData("List of " + user, favs);
    }
  };

  render() {
    const pelicula = this.props.movie;
    let url;

    pelicula.card_image
      ? (url = "500" + pelicula.backdrop_path)
      : (url = "342" + pelicula.poster_path);
    return (
      <Container className="myContainer">
        <div>
          <img src={"https://image.tmdb.org/t/p/w" + url} alt="" />
        </div>
        <div>
          <h1> {pelicula.title} </h1>
          <p> {pelicula.overview} </p>
          <p>Voto general: {pelicula.vote_average}</p>
          <p>Cantidad de votantes: {pelicula.vote_count}</p>

          <>
            <Button
              className="mr-3"
              variant="primary"
              size="lg"
              active
              onClick={this.addFav}
            >
              Peliculón
            </Button>
            <Button variant="secondary" size="lg" active>
              Aburrida
            </Button>
          </>
        </div>
      </Container>
    );
  }
}
export default SingleMovie;
