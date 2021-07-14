import React from 'react';
import axios from 'axios';




class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getSubmit = this.getSubmit.bind(this);

        this.state = {
            email:'',
            password:'',
            loading:false
        }
    }

    onChangeEmail = e => {
        this.setState({email:e.target.value})
    }
    onChangePassword = e =>{
        this.setState({password:e.target.value})
    }
    getSubmit(e){
        e.preventDefault();
        var containedHere = {
            email: this.state.email,
            password: this.state.password
        }
        axios.put('http://localhost:3131/login',containedHere)
            .then(function(res){
                console.log(res.data);
            })
            .catch(function(error){
                console.log(error);
            });
    };
    
    render(){
        return(
            <form  class = "ui large form" onSubmit = {this.getSubmit}>
                <div class ="ui stacked segment">
                    <div class = "field">
                        <label>Email</label>
                        <input onChange = {this.onChangeEmail} value = {this.state.email} type='email' id = 'email' name='email'></input>
                    </div>
                    <div class = "field">
                        <label>Password</label>
                        <input 
                            type = 'password'
                            id = 'password'
                            name = 'password'
                            value = {this.state.password}
                            onChange = {this.onChangePassword}
                        >
                    </input>
                    </div>
                    <button class = "ui fluid large teal submit button" type = "submit">Submit</button>
                </div>
            </form>

        )
    }
}

export default LoginForm;