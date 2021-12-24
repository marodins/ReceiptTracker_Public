import React from 'react'
import {Form,Button} from 'semantic-ui-react'
import {ConfirmEmailError} from '../messages/ErrorMessages'
import Authenticate_user from '../../auth/login_auth'

import axios from 'axios'
import { withRouter } from 'react-router'

class DeleteAccountForm extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            user:Authenticate_user.getUser(),
            confirm:'',
            error:null
        }
    }

    handleSubmit=(e)=>{
        //gets value of email input and makes request to server for deletion
        e.preventDefault()
        if(this.state.user !== this.state.confirm){
            return this.setState({error:'confirm'})
        }
        var data = {
            email:this.state.user
        }
        axios.delete('/change/delete',data,{withCredentials:true})
            .then(res=>{
                Authenticate_user.logout(()=>{
                    this.props.history.push('/')
                })
                
            })
            .catch(err=>{
                return this.props.handleError('delete')
            })
    }

    handleInput = (e) =>{
        var from = e.target.id
        if(from === "confirm"){
            this.setState({confirm:e.target.value})
        }
    }


    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Account will be deleted after email is confirmed</label>
                        <input id ="confirm" type = "email" placeholder="confirm email" onChange = {this.handleInput}></input>
                        {this.state.error ==='confirm'?<ConfirmEmailError/>:null}
                    </Form.Field>
        
                    <Button type = "submit">Submit</Button>
                    <Button onClick = {this.props.cancel}>Cancel</Button>

                </Form>


            </div>

        )       
    }

}

export default withRouter(DeleteAccountForm)