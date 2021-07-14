import React from 'react';
import {Link} from 'react-router-dom';




const NavBar = () =>{
    return(
        <div class = "ui three item menu">
            <Link class = "item" to="/">Home</Link>
            <Link class = "item" to="/upload">Upload</Link>
            <Link class = "item" to="/receipts">Receipts</Link>
        </div>
    )
}

export default NavBar;