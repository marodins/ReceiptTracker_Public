import React from 'react';
import axios from 'axios';
import RegisterMessage from '../messages/RegisterMessage'
import {Form, Segment, Button, Container, Divider} from 'semantic-ui-react';


class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email:'',
            password:'',
            loading:false,
            success:null
        }
    }

    onChangeEmail = e => {
        this.setState({email:e.target.value})
    }
    onChangePassword = e =>{
        this.setState({password:e.target.value})
    }
    getSubmit=(e)=>{
        // submit user input to server for registration
        var dataSend = {email:this.state.email, password:this.state.password};
        axios.post('http://localhost:3131/register',dataSend)
            .then((res)=>{
                console.log(res);
                if(res.data.message == "taken"){
                    this.setState({success:false});
                }else{
                    this.setState({success:true});
                }
                
            })
            .catch((error)=>{
                this.setState({success:false});
            });
    };
    render(){
        return(
            <Container fluid>
                <RegisterMessage success={this.state.success} />
                <Form onSubmit = {this.getSubmit}>
                    <Segment>
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
                            />
                        </Form.Field>
                        <Button color = "green" type = "submit" primary>Submit</Button>
                    </Segment>
                </Form>

            </Container>


        )
    }
}

export default RegisterForm;