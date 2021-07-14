import React from 'react';
import NavBar from '../nav/navBar'
import UploadForm from '../forms/UploadForm'



const Upload = ()=>{
    return(
        
        <div class = "ui container">
            <NavBar />
            <h1> Upload Receipt </h1>
            <UploadForm />
        </div>
       
    )
}

export default Upload;