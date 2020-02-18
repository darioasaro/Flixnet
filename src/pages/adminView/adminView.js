import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import "../adminView/adminView.css";
import Container from "react-bootstrap/Container";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch= this.handleSearch.bind(this)
    this.state = {
      name: "",
      description: "",
      year: "",
      find:"",
      table:false,
      movies:[],
      genres: [
        {
          id: 28,
          name: "Action"
        },
        {
          id: 12,
          name: "Adventure"
        },
        {
          id: 16,
          name: "Animation"
        },
        {
          id: 35,
          name: "Comedy"
        },
        {
          id: 80,
          name: "Crime"
        },
        {
          id: 99,
          name: "Documentary"
        },
        {
          id: 18,
          name: "Drama"
        },
        {
          id: 10751,
          name: "Family"
        },
        {
          id: 14,
          name: "Fantasy"
        },
        {
          id: 36,
          name: "History"
        },
        {
          id: 27,
          name: "Horror"
        },
        {
          id: 10402,
          name: "Music"
        },
        {
          id: 9648,
          name: "Mystery"
        },
        {
          id: 10749,
          name: "Romance"
        },
        {
          id: 878,
          name: "Science Fiction"
        },
        {
          id: 10770,
          name: "TV Movie"
        },
        {
          id: 53,
          name: "Thriller"
        },
        {
          id: 10752,
          name: "War"
        },
        {
          id: 37,
          name: "Western"
        }
      ]
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.name);
  }
   async handleSearch(e){
    e.preventDefault()
    var uri =this.state.find
    var res = encodeURI(uri);
    let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=b813c5783821c2f14ec75f3ae6cb1824&query='+res)
    let dato = await response.json()
    this.setState({
      table:true,
      
    })
    console.log(dato);
    
  
    

  }

  render() {
    return (
      <Container className="container">
        <h1 className="display-3">Admin Panel</h1>
        <h3 className="display-6">Add Movie from API</h3>
        <h5>Search</h5>
        
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Find Movie"
            name="find"
            onChange={this.handleChange}
          />
          <InputGroup.Append>
            <Button onClick={this.handleSearch} variant="outline-secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>

        <Form className="adminForm">
        <h3 className="display-6">Add Movie</h3>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="name"
                placeholder="Batman vs Superman"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Year</Form.Label>
              <Form.Control name="year" onChange={this.handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Genre</Form.Label>
              <Form.Control as="select">
                {this.state.genres.map(generos => (
                  <option>{generos.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <InputGroup as={Col}>
              <InputGroup.Prepend>
                <InputGroup.Text>Description</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="description"
                onChange={this.handleChange}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>

            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="images"
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>

          <Button onClick={this.handleClick} variant="primary" type="submit">
            Add Movie
          </Button>
        </Form>
      </Container>
    );
  }
}
export default AdminView;

//titulo-año-genero-overview-imagen-actores <option>Accion</option>
