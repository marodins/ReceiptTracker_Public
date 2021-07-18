import React from 'react';
import NavBar from '../nav/navBar';
import Authenticate_user from '../../auth/login_auth';



class Receipts extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            currentUser: props.user,
        }
    }
    render(){

        return(
            <div class = "ui container">
            <NavBar />
            <h1> Current Receipts </h1>
        </div>
        )
    }
}

export default Receipts;