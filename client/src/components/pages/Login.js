import React from 'react';
import {withRouter} from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import {Button, Divider,Grid,Segment,Container, Header} from 'semantic-ui-react'



class Login extends React.Component {
    
    constructor(props){
        super(props);
        
    }

    toReg = () =>{
        this.props.history.push('/register')
    }
    render(){
        return(
            <Container fluid>
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
                                <Segment>
                                    Don't have an account?
                                    <Button primary onClick={this.toReg}>
                                        <Button.Content>
                                            Register
                                        </Button.Content>
                                    </Button>
                                </Segment>                    
                            </Grid.Column>
                        </Grid> 
                        <Divider vertical></Divider>               
                    </Segment>                
                </Container>                
            </Container>



        )    
    }

}

export default withRouter(Login);