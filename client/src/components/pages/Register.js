import React from 'react';
import RegisterForm from '../forms/RegisterForm'



const Register = ()=>{
    return(
        <div class = "ui container">
            <div class = "ui middle aligned center aligned grid">
                <div class = "column">
                    <h1> Register </h1>
                </div>
                <RegisterForm />
            </div>
        </div>



    )
}

export default Register;
