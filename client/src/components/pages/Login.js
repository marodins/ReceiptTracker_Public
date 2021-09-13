import React from 'react';
import {Link} from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import Authenticate_user from '../../auth/login_auth';
import {Button, Divider,Form,Grid,Segment,Container, Header} from 'semantic-ui-react'



class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Container textAlign='center'>
                  <Header as='h1'>Receipt Tracker</Header>
                  <Divider></Divider>  
                </Container>
                
                <Container>
                    <Segment placeholder>
                        <Grid columns = {2} relaxed= 'very' stackable>
                            <Grid.Column>
                                <LoginForm />                    
                            </Grid.Column>
                            <Grid.Column verticalAlign = 'middle'>
                                <div class = "ui message">
                                    Don't have an account?
                                    <Button><Link to ="/register">Register</Link></Button>
                                </div>                    
                            </Grid.Column>
                        </Grid> 
                        <Divider vertical></Divider>               
                    </Segment>                
                </Container>                
            </div>



        )    
    }

}

export default Login;