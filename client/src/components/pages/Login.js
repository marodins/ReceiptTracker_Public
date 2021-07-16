import React from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../forms/LoginForm'



const Login = () =>{
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

export default Login;