import React from 'react';
import {Message} from 'semantic-ui-react';

const RegisterError = () =>(
    <Message 
        negative 
        header = "Whoops! This email is taken."
        content = "Use another email." 
    />

)

export default RegisterError;