import React from 'react';
import NavBar from '../nav/navBar'
import UploadForm from '../forms/UploadForm'
import LoadData from '../tables/LoadData'
import Authenticate_user from '../../auth/login_auth'



class Upload extends React.Component{
    constructor(props){
        super(props)
        this.handleData = this.handleData.bind(this)
        this.state = {
            data:{
                email:'',
                items:{},
                store:'',
                date:''
            }
        }
    }
    handleData = ({email,items,store,date}) =>{
        console.log('hereeeeeeeee')

        this.setState(prevState=>(
                {
                    ...prevState,
                    data:{
                        email: email? email : prevState.data.email,
                        items: items? items: prevState.data.items,
                        store: store? store : prevState.data.store,
                        date : date? date: prevState.data.date
                    }
                        
                }
            )
        )
    }
    render(){
        console.log('checking auth in upload',Authenticate_user.isAuth())
        console.log(this.state,'state of the upload page')
        return(
            <div class = "ui container">
                <NavBar />
                <h1> Upload Receipt </h1>
                <UploadForm handleData = {this.handleData}/>
                <LoadData handleData = {this.handleData} data = {this.state.data}/>
            </div>
        
        )
    }

}

export default Upload;