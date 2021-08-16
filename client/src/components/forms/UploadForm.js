import React from 'react';
import axios from 'axios';
import {Button,Form, ItemDescription} from 'semantic-ui-react'



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
            }
        }
        
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
    
        axios.post('http://localhost:3131/upload',formFile,headers)

        .then(res=>{
            console.log(res.data);
            this.onChangeLoader(false,res.data.data)
        })
        .catch(error=>{
            console.log(error);
        });

    }
    render(){
        return(
            <div id ="upload_page">
                <div class = "ui large form">
                    <Form id = "upload-form" loading ={this.state.loading}>
                        <Form.Input id = "fileUpload" onChange = {this.onChangeFile} type = "file" name = "receipt"></Form.Input>
                        <Button size='medium' color ="blue" type ="submit" onClick = {this.onSubmitFile}>Upload</Button>
                    </Form>
                </div>
            </div>


        )
    }

};
export default UploadForm