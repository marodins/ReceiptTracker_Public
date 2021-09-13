import React from 'react';
import axios from 'axios';
import {Button,Form, Header,Container, Segment, Icon} from 'semantic-ui-react'



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
    selectFile = (e)=>{
        console.log(e.target.files)
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