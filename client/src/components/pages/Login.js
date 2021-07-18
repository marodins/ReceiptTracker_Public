import React from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import Authenticate_user from '../../auth/login_auth';



class Login extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(
        <div class = "ui container">
            <div class = "ui middle aligned center aligned grid">
                <div class = "column">
                    <h1> login </h1>
                </div>
                <LoginForm />
                <div class = "ui message">
                    "Don't have an account?"
                    <Link to ="/register">Register</Link>
                </div>
            </div>
        </div>
    )    
    }

}

export default Login;