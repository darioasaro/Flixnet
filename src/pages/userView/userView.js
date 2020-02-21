import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/Card";
import "../userView/userView.css";
import dataBase from "../../services/database";
class ViewUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      
      topRated: [],
      myList: [],
      avaibleList:[]
    };
  }
  async componentDidMount() {
    let topMovies = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b813c5783821c2f14ec75f3ae6cb1824&language=en-US&page=1"
    );
    let resMovies = await topMovies.json();

    let user = await dataBase.getData("username");
    let miLista = await dataBase.getData("List of " + user);
    let avaibleList = await dataBase.getData('movies');
    if (miLista === null) {
      miLista = this.state.myList;
      console.log(miLista)
    }

    this.setState({
      topRated: resMovies.results.slice(0, 6),
      myList: miLista,
      avaibleList : avaibleList
    });
      
    
  }
  handleClick = async e => {
    console.log(e.target.id);
    let user = await dataBase.getData("username");
    dataBase.setData("List of " + user, []);
    this.setState({
      myList: []
    });
  };

  render() {
    return (
      <Container className="container">
        <h2 className="blockquote text-center">Popular Movies</h2>
        <CardGroup className="card-group">
          {this.state.topRated.map((movie, i) => {
            return (
              <Card key={i}>
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
        
        <h2 className="blockquote text-center">Avaiable Movies</h2>
        <CardGroup className="card-group">
          {this.state.avaibleList.map((movie, i) => {
            let url;
            movie.poster_image
              ? (url = "342" + movie.poster_image)
              : (url = "500" + movie.card_image);
            return (
              <Card key={i}>
                <Card.Img
                  id={i}
                  className="card-img"
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w" + url}
                  onClick={this.handleClick}
                />
              </Card>
            );
          })}
        </CardGroup>
       
        <h2 className="blockquote text-center">My Top Movies</h2>
        <CardGroup className="card-group">
          {this.state.myList.map((movie, i) => {
            let url;
            movie.poster_image
              ? (url = "342" + movie.poster_image)
              : (url = "500" + movie.card_image);
            return (
              <Card key={i}>
                <Card.Img
                  id={i}
                  className="card-img"
                  variant="top"
                  src={"https://image.tmdb.org/t/p/w" + url}
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

// while (cant < array.length) {

//   for (let i = 0 ; i < 6 && cant < array.length; i++) {
//       arraux.push(parseInt(array[cant]))
//       cant++
// }
// console.log('arraux',arraux);



// arraux = []

// }