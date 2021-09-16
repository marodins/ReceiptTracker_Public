import React from 'react';
import NavBar from '../nav/NavBar'
import UploadForm from '../forms/UploadForm'
import LoadData from '../tables/LoadData'
import Authenticate_user from '../../auth/login_auth'
import {UploadMessages} from '../messages/UploadMessages'
import {Popup,Button, PopupContent, Segment,Container} from 'semantic-ui-react'



class Upload extends React.Component{
    constructor(props){
        super(props)
        this.handleData = this.handleData.bind(this)
        this.handleCompletion = this.handleCompletion.bind(this)
        this.state = {
            data:{
                email:'',
                items:{},
                store:'',
                date:''
            },
            exists:null,
            completion:''
        }
    }
    handleData = ({email,items,store,date}) =>{

        this.setState(prevState=>(
                {
                    ...prevState,
                    data:{
                        email: email? email : prevState.data.email,
                        items: items? items: prevState.data.items,
                        store: store? store : prevState.data.store,
                        date : date? date: prevState.data.date
                    },
                    exists:true
                        
                }
            )
        )
    }

    handleCompletion = (error) =>{
        if(error){
           return this.setState({completion:"INCOMPLETE"}) 
        }
        this.setState({completion:"COMPLETED"})
    }

    render(){
        return(
            <div class = "ui container">
                <NavBar />
                <UploadMessages completion = {this.state.completion}/>
                <h1> Upload Receipt </h1>
                <Container textAlign="right">
                    <Popup trigger = {<Button icon="question"></Button>}>
                        <PopupContent>
                            <Segment basic padded>
                                + click cell to edit data <br/>
                                + save data
                            </Segment>

                        </PopupContent>
                    </Popup>                        
                </Container>
                

                <Segment>
                  <UploadForm handleData = {this.handleData} handleCompletion = {this.handleCompletion}/>  
                </Segment>
                <Segment padded="very">
                    {this.state.exists?<LoadData handleData = {this.handleData} data = {this.state.data} setComplete = {this.handleCompletion}/>:null}   
                </Segment>
                
            </div>
        
        )
    }

}

export default Upload;