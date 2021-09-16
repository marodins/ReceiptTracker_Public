// Various error messages

import React from 'react';
import {Message} from 'semantic-ui-react';


const RegisterError = () =>(
    <Message 
        negative 
        header = "Whoops! This email is taken."
        content = "Use another email." 
    />

)
const DeleteAccountError = () =>(
    <Message
        negative
        header = "Unable to delete account, something went wrong please try again."
        />
)
const EmailChangeError = () =>(
    <Message
        negative
        header = "Unable to change email, something went wrong, please try again."
        />
)
const PassChangeError = () =>(
    <Message
        negative
        header = "Unable to change password, something went wrong, please try again."
        />
)
const LoginError = () =>(
    <Message
        negative
        header = "Incorrect email or password."
        content = "Try, again."
    />
)

const ConfirmPassError =()=>(
    <Message 
        negative
        header ="New password and confirm password don't match"
        content ="Try again"
    />

)
const OldPassError =()=>(
    <Message 
        negative
        header ="Old password is incorrect"
        content ="Try again"
    />

)
const ConfirmEmailError =()=>(
    <Message 
        negative
        header ="Emails don't match"
        content ="Try again"
    />

)
const EmailExists =()=>(
    <Message
        negative
        header = "Email already exists"
        content = "try different email"/>
)

const ReceiptUpdateUnsuccessful = ()=>(
    <Message
        negative
        header="something went wrong with the update, please try again"/>
)

export {
        RegisterError,
        LoginError,
        ConfirmPassError,
        OldPassError, 
        ConfirmEmailError,
        EmailExists,
        ReceiptUpdateUnsuccessful,
        DeleteAccountError,
        EmailChangeError,
        PassChangeError};