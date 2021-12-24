import React from 'react'
import {Button,List,Icon} from 'semantic-ui-react'
import PasswordChangeForm from '../forms/PasswordChangeForm'
import {PassChangeSuccess} from '../messages/SuccessMessages'


class AccountPasswordChange extends React.Component{
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
        //switch to form
        this.setState({button:false,success:''})
    }

    handleCancel = (changed) =>{
        // switch from form to list item
        if(changed === 'password'){
            this.setState({button:true,success:'password'})
        }
        this.setState({button:true})
    }

    render(){
        return(

            <div>
 
                <div>
                    {this.state.button?
                        <List.Header onClick = {this.handleClick}>Change Password</List.Header>:
                        <PasswordChangeForm cancel = {this.handleCancel} handleError = {this.props.handleError}/>
                    }    

                    {this.state.success==='password'?<PassChangeSuccess/>:null}  
                </div>
            </div>
            
        )
    }

}

export default AccountPasswordChange