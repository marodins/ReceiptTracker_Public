import React from 'react'
import {Message} from 'semantic-ui-react'



const PassChangeSuccess = () =>(
    <Message
        success
        header = "Password changed successfully"
    />
)

const EmailChangeSuccess = () =>(
    <Message
        success
        header = "Email changed successfully"/>
)
const ReceiptUpdateSuccess = ()=>(
    <Message
        success
        header = "Receipt updated successfully"/>
)
export {PassChangeSuccess,EmailChangeSuccess,ReceiptUpdateSuccess}