import React from "react";
import AdminView from './pages/adminView/adminView.js'

class App extends React.Component {
  constructor(props){
    super(props)
    this.test=this.test.bind(this)
  }

  async test(){
 
    var uri = "batman forever"
    var res = encodeURI(uri);
    let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=b813c5783821c2f14ec75f3ae6cb1824&query='+res)
    let dato = await response.json()
    console.log(dato);
    

  }



  render(){
  return (
    <>
      
     <AdminView/>
    </>
  );
  }
}

export default App;
