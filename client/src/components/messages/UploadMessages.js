import react from 'react'
import {Message} from 'semantic-ui-react'




export const UploadMessages = ({completion})=>{

    if(completion==='COMPLETED'){
        return (<Message success header = 'receipt uploaded successfully' content ='viewable in receipts'/>)
    }
    else if(completion === 'INCOMPLETE'){
        return (<Message negative header = 'something went wrong try again.'/>)
    }
    else{
       return (null)
    }
    
}
