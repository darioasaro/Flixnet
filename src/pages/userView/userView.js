import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/Card";
import "../userView/userView.css";

class ViewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container className="container">
        <h2 className="blockquote text-center">Top Rated Movies</h2>
        <Carousel className="carrousel">
          <Carousel.Item className="carrousel-card">
            <CardGroup className="card-group">
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                  onClick={this.handleClick}
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/bqS2lMgGkuodIXtDILFWTSWDDpa.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
            </CardGroup>
          </Carousel.Item>

          <Carousel.Item className="carrousel-card">
            <CardGroup className="card-group">
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                  onClick={this.handleClick}
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/bqS2lMgGkuodIXtDILFWTSWDDpa.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
              <Card>
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="https://image.tmdb.org/t/p/w154/dr6x4GyyegBWtinPBzipY02J2lV.jpg"
                />
              </Card>
            </CardGroup>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default ViewUser;
