import React from "react";
import Container from "react-bootstrap/Container";
import "./singleMovie.css";
import dataBase from "../../services/database";

class SingleMovie extends React.Component {
  constructor() {
    super();
  }

  render() {
    const pelicula = dataBase.getData("pelicula");
    let url;
    pelicula.card_image
      ? (url = "500" + pelicula.card_image)
      : (url = "342" + pelicula.poster_image);
    return (
      <Container className="myContainer">
        <div>
          <img src={"https://image.tmdb.org/t/p/w" + url} />
        </div>
        <div>
          <h1> {pelicula.name} </h1>
          <p> {pelicula.description} </p>
        </div>
      </Container>
    );
  }
}
export default SingleMovie;
