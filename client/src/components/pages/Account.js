import React from 'react'
import Authenticate_user from '../../auth/login_auth'
import NavBar from '../nav/NavBar'
import AccountPasswordChange from '../lists/AccountPasswordChange'
import AccountEmailChange from '../lists/AccountEmailChange'
import AccountDelete from '../lists/AccountDelete'
import {DeleteAccountError,EmailChangeError,PassChangeError} from '../messages/ErrorMessages'

import {List,Icon, Segment} from 'semantic-ui-react'



class Account extends React.Component{
    constructor(props){
        super(props)
        this.handleError = this.handleError.bind(this)
        this.state = {
            user:Authenticate_user.getUser(),
            error:null
        }
    }

    handleError = (error) =>{
        return this.setState({error:error})
    }

    render(){
        return(
            <div class = 'ui container'>
                <NavBar/>
                <h1>
                    Welcome, {this.state.user}
                </h1>
                <Segment basic>
                    {this.state.error==='delete'?<DeleteAccountError/>:null}
                    {this.state.error === 'emailChange'?<EmailChangeError/>:null}
                    {this.state.error === 'passChange'?<PassChangeError/>:null}
                </Segment>
                <List animated verticalAlign = 'middle'>
                    <List.Item>
                        <Icon name = "edit"/> 
                        <List.Content>
                            <AccountPasswordChange handleError ={this.handleError}/>                            
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Icon name ="edit"/>
                        <List.Content>
                            <AccountEmailChange handleError = {this.handleError}/>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Icon name ="trash alternate outline" color = "red"/>
                        <List.Content>
                            <AccountDelete handleError = {this.handleError}/>
                        </List.Content>
                    </List.Item>
                </List>

            </div>
        )
    }

}
export default Account