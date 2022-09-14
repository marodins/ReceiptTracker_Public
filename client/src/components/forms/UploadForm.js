
// Upload form for image file

import React from 'react';
import axios from 'axios';
import {Button,Form, Header,Container, Segment, Icon} from 'semantic-ui-react'
import current_user from '../../auth/login_auth'



class UploadForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmitFile = this.onSubmitFile.bind(this);
        this.onChangeLoader = this.onChangeLoader.bind(this);
        this.onDataProcessed = this.onDataProcessed.bind(this);
        this.checkProgress = this.checkProgress.bind(this);
        this.state = {
            fileChosen:null,
            intervalId:null,
            loading:false,
            job:{
                id:null,
                status:null
            },
            cell:{
                row:'',
                name:''
            },
            fileName:null
        }
        this.user_id = current_user.user_id;

    }
    onChangeFile = (e)=>{
        this.setState({fileChosen:e.target.files[0]})
    }
    onChangeLoader = (bool)=>{
        this.setState({loading:bool});
    }

    onDataProcessed = (data)=>{
        clearInterval(this.state.intervalId);
        return this.props.handleData(data);
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
        this.onChangeLoader(true);

        // submit image file to server for processing
        axios.post(`/users/${this.user_id}/uploads`,formFile,headers)
            .then(res=>{
                console.log('res from upload', res);
                this.setState({job:{id:res.data.data.id}});
                this.setState({intervalId:setInterval(this.checkProgress, 1500)});
            })
            .catch(error=>{

                return this.props.handleCompletion('INCOMPLETE')

            });

    }

    checkProgress = ()=>{
        const headers = {
            Authorization:this.props.token,
            withCredentials:true
        }
        axios.get(`/users/${this.user_id}/uploads/${this.state.job.id}`,headers)

        .then(res=>{
            console.log('checking progress', res.data);
            if(res.data.jobState === 'completed'){
                this.onChangeLoader(false);
                this.onDataProcessed(res.data.data.data);
            }else if(res.data.jobState === 'failed'){
                clearInterval(this.state.intervalId);
                this.props.handleCompletion('INCOMPLETE');
                
            }
            
        })
        .catch(error=>{
            clearInterval(this.state.intervalId);
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

                            <input 
                                id = "fileUpload" 
                                onChange = {this.onChangeFile} 
                                type = "file" 
                                name = "receipt" 
                                accept='.png, .jpg, .jpeg'
                                hidden/>
                        </Form.Field>

                        <Button size='medium' color ="blue" type ="submit" onClick = {this.onSubmitFile}>Upload</Button>
                    </Form>
                </Segment>
            </Container>



        )
    }

};
export default UploadForm
