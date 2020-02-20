import React from 'react'
import NavBar from './navBar/navBar.js'


function Layout(props){


    //const childern = props.children
    return (
        <div>
            <NavBar/>
             {props.children}
        </div>
    )
}

export default Layout