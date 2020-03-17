import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./pages/loginView/Login";
import AdminView from "./pages/adminView/adminView.js";
import UserView from "./pages/userView/userView";
import SingleMovie from "./pages/singleMovie/SingleMovie";
import Layout from "./components/Layout";
import { getUsers,login } from "./services/users";
import dataBase from "./services/database";
import { findMovie, movieAdd, findAllMovies } from "./services/movies";
import Modal from '../src/pages/loginView/modalForm/Modal'

class App extends React.Component {
  constructor() {
    super();
    this.selfMovieView = this.selfMovieView.bind(this);
    this.state = {
      token:"",
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
   movieAdd(movie)
  };
  loggout = () => {
    dataBase.deleteData("username")
    this.setState({ redirect: "null" }); 
  };
  usarDatos =async e => {
    const userLog = {'username':e.username,
        'password':e.password}

      const res = await login(userLog)
      var rol = "admins";
      console.log('resultado login',res)

        if (res.result) {
          dataBase.setData("username", userLog.username);
          if(res.rol==2){
            rol = "users"
          }

          //hay q asignar el rol para redireccionar a admin o user.
          this.setState({token:res.token})
          this.setState({ redirect: rol });
        } else {
          alert(res.message);
        }
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
        <Layout logOut={this.loggout} logged={this.state.redirect}>
          <Switch>
            <Route exact path="/">
              <Login pedirDatos={this.usarDatos} />
              <Modal />
            </Route>
            <Route path="/users">
              <UserView
                token={this.state.token}
                selfMovieView={this.selfMovieView}
                key={this.state.key}
                inLoggout={this.loggout}
              />
            </Route>
            <Route path="/admins">
              <AdminView token={this.state.token}addMovie={this.addMovie} inLoggout={this.loggout} />
            </Route>
            {/* <Route path="/movie:idSelected" */}
            <Route path="/movie">
              <SingleMovie token={this.state.token} movie={this.state.movie} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}
export default App;
