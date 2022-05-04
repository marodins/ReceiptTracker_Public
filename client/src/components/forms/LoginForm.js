import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {LoginError} from '../messages/ErrorMessages';
import {Button, Form, Segment} from 'semantic-ui-react';
import current_user from '../../auth/login_auth';




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
    getSubmit=(e)=>{
        e.preventDefault();
        var containedHere = {
            email: this.state.email,
            password: this.state.password
        }
        // request to authorize user
        axios.post('/login',containedHere,{withCredentials:true})
            .then(res=>{
                if(res.data.authentication === "mismatch"){
                    this.setState({loggedIn:false})
                }
                else if(res.data.authentication==="no-match"){
                    this.setState({loggedIn:false})
                }
                else{
                    // take user to upload page
                    current_user.login(res.data.user,res.data.token,res.data.uid,()=>{
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
            <Segment>
                {this.state.loggedIn===false?<LoginError/>:null}
                <Form onSubmit = {this.getSubmit}>
                    <Segment basic>
                        <Form.Field>
                            <label>Email</label>
                            <input onChange = {this.onChangeEmail} value = {this.state.email} type='email' id = 'email' name='email'></input>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                type = 'password'
                                id = 'password'
                                name = 'password'
                                value = {this.state.password}
                                onChange = {this.onChangePassword}
                            >
                            </input>
                        </Form.Field>
                        <Button type = "submit" primary>Submit</Button>
                    </Segment>
                </Form>
            </Segment>


        )
    }
}

export default withRouter(LoginForm);
