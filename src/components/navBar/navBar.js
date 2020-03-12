import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../navBar/navBar.css'

class NavBar extends React.Component {

  log = ()=>{
      
    if(this.props.logged !== 'null'){
      return <Button className= "nav-link2"  onClick={this.logOut}>
      Logout
     </Button>
    }
    // else{return <Link className="nav-link" to="/">
    //   Login
    //  </Link> }
  }

  logOut = ()=>{
    this.props.logOut()
  }

  render() {
     
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">FlixNet</Navbar.Brand>
        <Nav className="mr-auto">
         {this.log()} 
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
