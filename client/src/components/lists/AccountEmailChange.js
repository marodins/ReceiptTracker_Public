import React from 'react'
import {Button,List,Icon} from 'semantic-ui-react'
import EmailChangeForm from '../forms/EmailChangeForm'
import {EmailChangeSuccess} from '../messages/SuccessMessages'


class AccountEmailChange extends React.Component{
    constructor(props){
        super(props)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state ={
            button:true,
            success:''
        }

    }
    handleClick = () =>{
        this.setState({button:false,success:''})
    }

    handleCancel = (changed) =>{
        if(changed === 'email'){
            this.setState({button:true,success:'email'})
        }
        this.setState({button:true})
    }

    render(){
        return(
            <div>
                <div>
                    {this.state.button?<List.Header onClick = {this.handleClick}>Change Email</List.Header>: <EmailChangeForm cancel = {this.handleCancel} handleError ={this.props.handleError}/>}                    
                    {this.state.success==='email'?<EmailChangeSuccess/>:null}  
                </div>
            </div>
            
        )
    }

}

export default AccountEmailChange