import React from 'react';
import axios from 'axios';
import {Redirect,withRouter} from 'react-router-dom'
import LoginFunc from '../messages/LoginMessage'
import Authenticate_user from '../../auth/login_auth';




class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getSubmit = this.getSubmit.bind(this);

        this.state = {
            email:'',
            password:'',
            loggedIn:null,
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
        axios.post('http://localhost:3131/login',containedHere,{withCredentials:true})
            .then(res=>{
                console.log(res);
                if(res.data.authentication === "mismatch"){
                    this.setState({loggedIn:false})
                }
                else if(res.data.authentication==="no-match"){
                    this.setState({loggedIn:false})
                }
                else{

                    Authenticate_user.login(res.data.user,res.data.token,()=>{
                        this.props.history.push('/upload')
                    });
                }
                
            })
            .catch(error=>{
                this.props.history.push('/');
            });
    };

    render(){
        return(
            <div>
                <LoginFunc loggedIn={this.state.loggedIn}></LoginFunc>
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
            </div>
  

        )
    }
}

export default withRouter(LoginForm);