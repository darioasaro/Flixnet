import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import AdminView from "./pages/adminView/adminView.js";
import UserView from './pages/userView/userView'

import Layout from './components/Layout'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usuarios: [
        {
          username: "",
          password: ""
        }
      ]
    };
  }

  componentDidMount = () => {
    fetch("./data/users.json")
      .then(response => response.json())
      .then(data =>
        this.setState({
          usuarios: data
        })
      );
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

  addMovie = movie => {
    console.log("pelicula agregada", movie);
    this.saveInLocalStorage("pelicula", JSON.stringify(movie));
  };

  saveInLocalStorage = (where, data) => {
    localStorage.setItem(where, data);
  };
  getDataOfLocalStorage = where => {
    return localStorage.getItem(where);
  };

  Admins = () => {
    return <h1>Admins</h1>;
  };

  Login = () => {
    return <h1>About</h1>;
  };

  Users = () => {
    return <h1>Users</h1>;
  };

  usarDatos = e => {
    const usuarios = this.state.usuarios;

    usuarios.forEach(usuario => {
      if (e.username === usuario.username) {
        if (e.password === usuario.password) {
          console.log(usuario.state);
          this.saveInLocalStorage("username", usuario.username);
          this.saveInLocalStorage("token", "000001");
        } else {
          console.log("te fallo la pass crack");
        }
      } else {
        console.log("te fallo el usuario master");
      }
    });
  };

  render() {
    return (
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/admins">Admins</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav> */}
          

          {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
         <Layout>
          <Switch>
            <Route path="/login">
              <Login pedirDatos={this.usarDatos} />
            </Route>
            <Route path="/users">{this.Users}
            <UserView />
            </Route>
            <Route path="/admins">
              <AdminView addMovie={this.addMovie} />
            </Route>
          </Switch>
          </Layout>
        </div>
      </Router>
    );
  }
}
export default App;
