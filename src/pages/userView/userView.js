import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/Card";
import "../userView/userView.css";
class ViewUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topRated: []
    };
  }
  async componentDidMount() {
    let topMovies = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US&page=1"
    );
    let resMovies = await topMovies.json();
    this.setState({
      topRated: resMovies.results.slice(0, 6)
    });
    console.log(this.state);
  }

  handleClick(e) {
    console.log(e.target.id);
  }

  render() {
    return (
      <Container className="container">
        <h2 class="blockquote text-center">Popular Movies</h2>
        <CardGroup className="card-group">
          {this.state.topRated.map(movie => {
            return (
              <Card>
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
        <h2 class="blockquote text-center">My Movies</h2>
        <CardGroup className="card-group">
          {this.state.topRated.map(movie => {
            return (
              <Card>
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
      </Container>
    );
  }
}

export default ViewUser;
