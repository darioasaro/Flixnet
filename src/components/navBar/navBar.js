import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">FlixNet</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Loggin
          </Link>
          <Link className="nav-link" to="/admins">
            Admin
          </Link>
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;
