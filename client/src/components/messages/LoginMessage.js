import React from 'react';
import {LoginError} from './ErrorMessages';




const LoginFunc = ({loggedIn}) =>{

    if (loggedIn===false){
        return <LoginError />
    }
    return null;
        
}

export default LoginFunc;