import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import AdminView from "./pages/adminView/adminView.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("src/users.json")
      .then(response => response.json())
      .then(data => this.setState({ data }));

    console.log(this.state.data);
  }

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
    console.log(e);
  };

  render() {
    return (
      <Router>
        <div>
          <nav>
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
          </nav>

          {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login pedirDatos={this.usarDatos} />
            </Route>
            <Route path="/users">{this.Users}</Route>
            <Route path="/admins">
              <AdminView />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
