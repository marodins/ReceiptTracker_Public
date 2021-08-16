import React from 'react';
import NavBar from '../nav/navBar';
import Authenticate_user from '../../auth/login_auth';
import axios from 'axios';


class Receipts extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            currentUser: Authenticate_user.getUser(),
            data:null

        }
    }
    //make axios request to get all past 50? receipts

    componentDidMount(){
        var header = {
            withCredentials:true
        }
        axios.get('http://localhost:3131/receipts',header)
            .then(res=>{
                this.setState({data:res.data.allRows})
            })
            .catch(err=>{
                console.log(err)
            })
    }
    //axios allow filter option for more?
    //axios search/filter by store
    //axios sum for month/year

    render(){

        return(
            <div class = "ui container">
                <NavBar />
                <h1> Current Receipts </h1>
            </div>
        )
    }
}

export default Receipts;