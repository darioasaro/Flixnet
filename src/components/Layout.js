import React from "react";
import NavBar from "./navBar/navBar.js";

function Layout(props) {
  const children = props.children

  return (
    <div>
      <NavBar logOut={props.logOut} logged={props.logged}/>
      {props.children}
    </div>
  );
}

export default Layout;
