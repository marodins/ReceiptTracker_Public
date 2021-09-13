import React from 'react';
import {Link} from 'react-router-dom';
import Authenticate_user from '../../auth/login_auth';
import {withRouter} from 'react-router-dom';




const NavBar = props =>{
    return(
        <div class = "ui four item menu">
            <Link class = "item" to="/account">Account</Link>
            <Link class = "item" to="/upload">Upload</Link>
            <Link class = "item" to="/receipts">Receipts</Link>
            <Link class = "item" onClick={()=>{Authenticate_user.logout(()=>
                props.history.push('/'))}}>Log Out</Link>
        </div>
    )
}

export default withRouter(NavBar);