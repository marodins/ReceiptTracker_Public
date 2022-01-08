import React from 'react'
import {List} from 'semantic-ui-react'
import DeleteAccountForm from '../forms/DeleteAccountForm'

//Delete form



class AccountDelete extends React.Component{
    constructor(props){
        super(props)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state ={
            button:true,
            error:null
        }

    }
    handleClick = () =>{
        // changes from list item to form
        this.setState({button:false,success:''})
    }

    handleCancel = () =>{
        // changes from form to list item
        this.setState({button:true})
    }

    render(){
        return(
            <div>
                <div>
                    {this.state.button?
                        <List.Header onClick = {this.handleClick}>Delete Account</List.Header>:
                        <DeleteAccountForm cancel = {this.handleCancel} handleError = {this.props.handleError}/>}
                </div>
            </div>

        )

    }
}

export default AccountDelete
