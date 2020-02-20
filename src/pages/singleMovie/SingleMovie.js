import React from "react";
import Container from "react-bootstrap/Container";
import "./singleMovie.css";

class SingleMovie extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container className="container">
        <div>
          <img src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg" />
        </div>
        <div>
          <h1> BATMAN Cualquiera </h1>
          <p> PELICULON</p>
        </div>
      </Container>
    );
  }
}
export default SingleMovie;
