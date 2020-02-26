import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import AdminView from "./pages/adminView/adminView.js";
import UserView from "./pages/userView/userView";
import SingleMovie from "./pages/singleMovie/SingleMovie";
import Layout from "./components/Layout";
import { getUsers } from "./services/users";
import dataBase from "./services/database";
import { findMovie } from "./services/movies";

class App extends React.Component {
  constructor() {
    super();
    this.selfMovieView = this.selfMovieView.bind(this);
    this.state = {
      singe: 0,
      usuarios: [
        {
          username: "",
          password: ""
        }
      ],
      redirect: "null",
      movie: [{ movie: "" }]
    };
  }

  componentDidMount = () => {
    getUsers().then(data => {
      this.setState({
        usuarios: data
      });
    });
    dataBase.setData("movies", []);
  };

  test = async () => {
    var uri = "batman forever";
    var res = encodeURI(uri);
    let response = await fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=b813c5783821c2f14ec75f3ae6cb1824&query=" +
        res
    );
    let dato = await response.json();
    console.log(dato);
  };

  addMovie = async movie => {
    const json = await dataBase.getData("movies");
    if (!json) {
      dataBase.setData("movies", []);
      this.addMovie(movie);
    } else {
      let movies = json;
      movies.push(movie);
      dataBase.setData("movies", movies);
      this.setState({ movie });
    }
    console.log("movie", movie);
  };
  loggout = () => {
    this.setState({ redirect: "null" });
  };
  usarDatos = e => {
    const usuarios = this.state.usuarios;
    usuarios.forEach(usuario => {
      if (e.username === usuario.username) {
        if (e.password === usuario.password) {
          dataBase.setData("username", usuario.username);
          this.setState({ redirect: usuario.state });
        } else {
          console.log("te fallo la pass crack");
        }
      } else {
        console.log("te fallo el usuario master");
      }
    });
  };

  async selfMovieView(id) {
    let mov = await findMovie(id);

    this.setState({
      movie: mov,
      single: id
    });
    console.log(this.state.single);
  }

  render() {
    return (
      <Router>
        {this.state.redirect !== "null" ? (
          <Redirect to={"/" + this.state.redirect} />
        ) : (
          <Redirect to={"/"} />
        )}
        <Layout>
          <Switch>
            <Route exact path="/">
              <Login pedirDatos={this.usarDatos} />
            </Route>
            <Route path="/users">
              <UserView
                selfMovieView={this.selfMovieView}
                key={this.state.key}
                inLoggout={this.loggout}
              />
            </Route>
            <Route path="/admins">
              <AdminView addMovie={this.addMovie} inLoggout={this.loggout} />
            </Route>
            {/* <Route path="/movie:idSelected" */}
            <Route path="/movie">
              <SingleMovie movie={this.state.movie} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}
export default App;
