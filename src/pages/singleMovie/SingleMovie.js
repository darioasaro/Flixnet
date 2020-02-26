import React from "react";
import Container from "react-bootstrap/Container";
import "./singleMovie.css";
import Button from "react-bootstrap/Button";
import dataBase from "../../services/database";
import { Redirect } from "react-router-dom";
import { isDuplicated } from "../../services/movies";

class SingleMovie extends React.Component {
  constructor(props) {
    super();
    this.state = {
      back: false
    };
  }
  addFav = async () => {
    const user = await dataBase.getData("username");
    const json = await dataBase.getData("List of " + user);
    if (!json) {
      dataBase.setData("List of " + user, []);
      this.addFav();
    } else {
      let favs = json;
      if (await isDuplicated("List of " + user, this.props.movie)) {
        alert("no podes tener valores repetidos");
      } else {
        favs.push(this.props.movie);
        alert("Ya podes disfrutarla");
      }
      dataBase.setData("List of " + user, favs);
    }
    this.setState({
      back: true
    });
  };
  delFav = async () => {
    const user = await dataBase.getData("username");
    const json = await dataBase.getData("List of " + user);

    if (!json) {
      dataBase.setData("List of " + user, []);
      this.delFav();
    } else {
      json.forEach((movie, i) => {
        if (movie.id === this.props.movie.id) {
          json.splice(i, 1);
        }
      });
      dataBase.setData("List of " + user, json);
      alert("Ya fue removida");
      this.setState({
        back: true
      });
    }
  };

  handleBack = () => {
    this.setState({
      back: true
    });
  };

  // componentDidMount () {
  //   const { idSelected } =  useParams();
  //   alert(idSelected)
  // }

  render() {
    const pelicula = this.props.movie;
    let url;

    pelicula.backdrop_path
      ? (url = "500" + pelicula.backdrop_path)
      : (url = "342" + pelicula.poster_path);
    if (this.state.back === true)
      // return <Redirect to={`/movie/${this.state.idMovie}`}/>
      return <Redirect to={"/users"} />;
    return (
      <>
        <Button
          onClick={this.handleBack}
          className="back-button"
          type="submit"
          variant="primary"
        >
          back
        </Button>
        <Container className="myContainer">
          <div>
            <img src={"https://image.tmdb.org/t/p/w" + url} alt="" />
          </div>
          <div>
            <h1> {pelicula.original_title} </h1>
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
                Agregar a myFav
              </Button>
              <Button
                variant="secondary"
                size="lg"
                active
                onClick={this.delFav}
              >
                Eliminar de myFav
              </Button>
            </>
          </div>
        </Container>
      </>
    );
  }
}
export default SingleMovie;
