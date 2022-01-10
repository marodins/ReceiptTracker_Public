import React from 'react';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import { Segment, Button} from 'semantic-ui-react';
import RegisterForm from '../forms/RegisterForm'



class Register extends React.Component{

    render(){
        return(
            <Segment compact>
                <Segment basic>
                    <Button floated = "right" onClick={()=>{
                        this.props.history.push('/')
                    }}>Back</Button>
                </Segment>
                <Segment basic>
                    <RegisterForm/>
                </Segment>
            </Segment>

        ) 
    }

}

export default Register;
