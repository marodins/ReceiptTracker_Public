
// Upload form for image file

import React from 'react';
import axios from 'axios';
import {Button,Form, Header,Container, Segment, Icon} from 'semantic-ui-react'
import current_user from '../../auth/login_auth'



class UploadForm extends React.Component{
    constructor(props){
        super(props)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.onSubmitFile = this.onSubmitFile.bind(this)
        this.onChangeLoader = this.onChangeLoader.bind(this)
        this.state = {
            fileChosen:null,
            loading:false,
            cell:{
                row:'',
                name:''
            },
            fileName:null
        }
        this.user_id = current_user.user_id

    }
    onChangeFile = (e)=>{
        this.setState({fileChosen:e.target.files[0]})
    }
    onChangeLoader = (bool,info)=>{
        this.setState({loading:bool},()=>{
            if(info){
                this.props.handleData(info)
            }

        })
    }

    onSubmitFile = (e)=>{
        e.preventDefault();
        const formFile = new FormData();
        formFile.append('avatar',this.state.fileChosen);

        const headers = {
            headers:{'content-type':'multipart/form-data'},
            Authorization:this.props.token,
            withCredentials:true
        }
        this.onChangeLoader(true,null);

        // submit image file to server for processing
        axios.post(`/users/${this.user_id}/uploads`,formFile,headers)

            .then(res=>{
                this.onChangeLoader(false,res.data.data)
            })
            .catch(error=>{

                return this.props.handleCompletion('INCOMPLETE')

            });

    }
    selectFile = (e)=>{
        this.setState({fileName:''})
        e.target.nextSibling.click()

    }
    render(){
        return(
            <Container textAlign="center">
                <Segment basic>
                    <Header icon>
                        <Icon name = "file image outline"/>
                    </Header>
                    <Form id = "upload-form" loading ={this.state.loading}>
                        <Form.Field>
                            <label>
                               {this.state.fileChosen?this.state.fileChosen.name:null}
                            </label>

                            <Button onClick={this.selectFile}>Select File</Button>

                            <input id = "fileUpload" onChange = {this.onChangeFile} type = "file" name = "receipt" hidden/>
                        </Form.Field>

                        <Button size='medium' color ="blue" type ="submit" onClick = {this.onSubmitFile}>Upload</Button>
                    </Form>
                </Segment>
            </Container>



        )
    }

};
export default UploadForm
