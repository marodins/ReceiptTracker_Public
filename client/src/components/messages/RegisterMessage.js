import React from 'react';
import RegisterSuccess from '../messages/RegisterSuccess';
import {RegisterError} from './ErrorMessages';

const RegisterMessage = ({success})=>{

    if(success===true){
        return <RegisterSuccess />
    }
    if(success===false){
        return <RegisterError />
    }
    return null
}

export default RegisterMessage;