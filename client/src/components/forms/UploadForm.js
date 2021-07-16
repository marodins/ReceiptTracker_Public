import React from 'react';
import axios from 'axios';

class UploadForm extends React.Component{
    constructor(props){
        super(props)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.state = {
            fileChosen:null,
            loggedIn:true,
        }
        
    }
    onChangeFile = (e)=>{
        this.setState({fileChosen:e.target.files[0]})
    }
    onSubmitFile = (e)=>{
        e.preventDefault();
        const formFile = new FormData();
        formFile.append('avatar',this.state.fileChosen);
        
        const headers = {
            headers:{'content-type':'multipart/form-data'}
        }
    
        axios.post('http://localhost:9696/upload',formFile,headers)

        .then(function(res){
            console.log(res.data);
            
        })
        .catch(function(error){
            console.log(error);
        });

    }
    render(){
        return(
            <div class = "ui large form">
                <form id = "upload-form">
                    <label>Upload</label>
                    <input class = "ui input" id = "fileUpload" onChange = {this.onChangeFile} type = "file" name = "avatar"></input>
                    <button class = "ui large blue button" type ="submit" onClick = {this.onSubmitFile}>Upload</button>
                </form>

            </div>

        )
    }

};
export default UploadForm;