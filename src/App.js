import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";

class App extends React.Component {
  constructor() {
    super();
  }

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
            <Route path="/admins">{this.Admins}</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
