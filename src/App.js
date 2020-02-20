import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import AdminView from "./pages/adminView/adminView.js";
import UserView from "./pages/userView/userView";
import SingleMovie from "./pages/singleMovie/SingleMovie";
import Layout from "./components/Layout";
import { getUsers } from "./services/users";
import dataBase from "./services/database";

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
    getUsers().then(data => {
      this.setState({
        usuarios: data
      });
    });
    dataBase.setData("movies","")
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
    
    
    dataBase.setData("pelicula", (movie));
    var pelis = dataBase.getData("movies")
    if(pelis == ""){
      pelis = []
      pelis.push(movie)
      dataBase.setData("movies",pelis)

   }
   console.log(pelis);
   
       pelis.push(movie)
      dataBase.setData("movies",pelis)
   
   
   
   
  //  pelis.push(json.Parse(movie))
  //  dataBase.setData("movies",pelis)

    
  };
  
  usarDatos = e => {
    const usuarios = this.state.usuarios;
    usuarios.forEach(usuario => {
      if (e.username === usuario.username) {
        if (e.password === usuario.password) {
          console.log(usuario.state);
          dataBase.setData("username", usuario.username);
          dataBase.setData("token", "000001");
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
        <Layout>
          <Switch>
            <Route path="/login">
              <Login pedirDatos={this.usarDatos} />
            </Route>
            <Route path="/users">
              <UserView />
            </Route>
            <Route path="/admins">
              <AdminView addMovie={this.addMovie} />
            </Route>
            <Route path="/movie">
              <SingleMovie />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}
export default App;
