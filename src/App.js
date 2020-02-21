import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminView from "./pages/adminView/adminView.js";
import UserView from "./pages/userView/userView";
import SingleMovie from "./pages/singleMovie/SingleMovie";
import Layout from "./components/Layout";
import { getUsers } from "./services/users";
import dataBase from "./services/database";
import {findMovie} from "./services/movies";

class App extends React.Component {
  constructor() {
    super();
    this.selfMovieView = this.selfMovieView.bind(this) 
    this.state = {
      singe:0,
      usuarios: [
        { 
          
          username: "",
          password: ""
        }
      ],
     
       movie: [{ movie: "" }]
    };
  }

  componentDidMount = () => {
    getUsers().then(data => {
      this.setState({
        usuarios: data
      });
    });
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
      this.setState({ movie});
    }
  };

  usarDatos = e => {
    const usuarios = this.state.usuarios;
    usuarios.forEach(usuario => {
      if (e.username === usuario.username) {
        if (e.password === usuario.password) {
          console.log(usuario.state);
          dataBase.setData("username", usuario.username);
          const data = dataBase.getData("List of " + usuario.username);
          if (data) {
            data.then(data => console.log(data));
          } else {
            dataBase.setData("List of " + usuario.username, []);
          }
        } else {
          console.log("te fallo la pass crack");
        }
      } else {
        console.log("te fallo el usuario master");
      }
    });
  };

   async selfMovieView(id){
     
     
    let mov =  await findMovie(id)
    
     this.setState({
      movie:mov,
      single : id
    })
    console.log(this.state.single);
    
    
    
      
    
    
  }

  render() {
    return (
      <Router>

        <Layout>
          <Switch>
            <Route path="/login">
              <Login pedirDatos={this.usarDatos} />
            </Route>
            <Route path="/users">
              <UserView selfMovieView={this.selfMovieView}key={this.state.key} />
            </Route>
            <Route path="/admins">
              <AdminView addMovie={this.addMovie} />
            </Route>
            {/* <Route path="/movie:idSelected" */}
            <Route path="/movie"
            >
              <SingleMovie movie={this.state.movie} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}
export default App;
