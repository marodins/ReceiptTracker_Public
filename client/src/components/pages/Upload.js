import React from 'react';
import NavBar from '../nav/navBar'
import UploadForm from '../forms/UploadForm'
import Authenticate_user from '../../auth/login_auth'



const Upload = ()=>{
    console.log('checking auth in upload',Authenticate_user.isAuth())
    return(
        
        <div class = "ui container">
            <NavBar />
            <h1> Upload Receipt </h1>
            <UploadForm />
        </div>
       
    )
}

export default Upload;