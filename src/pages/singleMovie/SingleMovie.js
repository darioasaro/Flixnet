import React from "react";
import Container from "react-bootstrap/Container";
import "./singleMovie.css";
import dataBase from "../../services/database";
import Button from "react-bootstrap/Button";

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
          <>
            <Button variant="primary" size="lg" active>
              Peliculón
            </Button>{" "}
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
