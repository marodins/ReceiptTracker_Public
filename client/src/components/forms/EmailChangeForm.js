import React from 'react'
import {Form,Button} from 'semantic-ui-react'
import {ConfirmEmailError, EmailExists} from '../messages/ErrorMessages'
import current_user from '../../auth/login_auth'

import axios from 'axios'


export default class EmailChangeForm extends React.Component{

    constructor(props){
        super(props)
        //this.handleSubmit = this.handleSubmit.bind(this)
        this.state ={
            new:'',
            confirm:'',
            error:null,
            success:false
        }
        this.user_id = current_user.user_id
    }

    handleSubmit=(e)=>{
        e.preventDefault()

        if(this.state.new !== this.state.confirm){
            return this.setState({error:'confirm'})
        }
        var data = {
            email:this.state.new
        }
        axios.patch(`/users/${this.user_id}`,data,{withCredentials:true})
            .then(res=>{
                if(res.data.message==='email-in-use'){
                    return this.setState({error:'in-use'})
                }
                //email successfully changed, exit form
                this.props.cancel('email')
            })
            .catch(err=>{
                this.props.handleError('emailChange')
            })
    }

    handleInput = (e) =>{
        // retrieves value from target input element
        var from = e.target.id
        if(from ==="new"){
            this.setState({new:e.target.value})
        }
        if(from === "confirm"){
            this.setState({confirm:e.target.value})
        }
    }


    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>new email</label>
                        <input id = "new" type = "email" placeholder="new email" onChange = {this.handleInput}></input>
                        {this.state.error === 'in-use'?<EmailExists/>:null}
                    </Form.Field>
                    <Form.Field>
                        <label>confirm new email</label>
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