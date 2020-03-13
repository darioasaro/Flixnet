import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../loginView/Login.css";
import Container from "react-bootstrap/Container";
import Modal from "./modalForm/Modal";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.pedirDatos(this.state);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Container className="container">
        <h1>
          Welcome to FLIXNET
          <p>
            <span>Sing in</span>
          </p>
        </h1>

        <Form className="form-group" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={this.onChange}
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.onChange}
              name="password"
            />
          </Form.Group>

          <div className="optionsGroup">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Modal />
          </div>
        </Form>
      </Container>
    );
  }
}

export default Login;
