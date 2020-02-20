import React from "react";
import Container from "react-bootstrap/Container";
import "./singleMovie.css";
import Button from "react-bootstrap/Button";

class SingleMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: [
        {
          static: "00001"
        }
      ]
    };
  }

  render() {
    const pelicula = this.props.movie;
    let url;

    pelicula.card_image
      ? (url = "500" + pelicula.card_image)
      : (url = "342" + pelicula.poster_image);
    return (
      <Container className="myContainer">
        <div>
          <img src={"https://image.tmdb.org/t/p/w" + url} alt="" />
        </div>
        <div>
          <h1> {pelicula.name} </h1>
          <p> {pelicula.description} </p>
          <>
            <Button variant="primary" size="lg" active>
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
