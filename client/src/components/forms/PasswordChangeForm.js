import React from 'react'
import {Form,Button} from 'semantic-ui-react'
import {ConfirmPassError,OldPassError} from '../messages/ErrorMessages'
import current_user from '../../auth/login_auth'


import axios from 'axios'


export default class PasswordChangeForm extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            new:'',
            confirm:'',
            old:'',
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
            old_password:this.state.old,
            new_password:this.state.new
        }
        axios.patch(`/users/${this.user_id}`,data,{withCredentials:true})
            .then(res=>{
                if(res.data.message === 'password-no-match'){
                    return this.setState({error:'old'})
                }
                //password successfully changed, exit form and view message
                this.props.cancel('password')
            })
            .catch(err=>{
                this.props.handleError('passChange')
            })
    }

    handleInput = (e) =>{
        // sets password input fields in state object
        var from = e.target.id
        if(from === "old"){
            this.setState({old:e.target.value})
        }
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
                        <label>old password</label>
                        <input id = "old" type = "password" placeholder="old password" onChange = {this.handleInput}></input>
                        {this.state.error ==='old'?<OldPassError/>:null}
                    </Form.Field>

                    <Form.Field>
                        <label>new password</label>
                        <input id = "new" type = "password" placeholder="new password" onChange = {this.handleInput}></input>
                    </Form.Field>
                    <Form.Field>
                        <label>confirm new password</label>
                        <input id ="confirm" type = "password" placeholder="confirm password" onChange = {this.handleInput}></input>
                        {this.state.error ==='confirm'?<ConfirmPassError/>:null}
                    </Form.Field>
                    

                    <Button type = "submit">Submit</Button>
                    <Button onClick = {this.props.cancel}>Cancel</Button>

                </Form>


            </div>

        )       
    }

}