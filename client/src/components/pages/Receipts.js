import React from 'react';
import NavBar from '../nav/navBar';
import Authenticate_user from '../../auth/login_auth';
import axios from 'axios';
import LoadReceipts from '../tables/LoadReceipts'
import SearchReceipts from '../search/SearchReceipts'
import { ReceiptUpdateSuccess } from '../messages/SuccessMessages'
import {ReceiptUpdateUnsuccessful} from '../messages/ErrorMessages'

import {Item,Card,Segment} from 'semantic-ui-react'


class Receipts extends React.Component{
    constructor(props){
        super(props);
        this.getAll = this.getAll.bind(this)
        this.createDataObject = this.createDataObject.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.setModal = this.setModal.bind(this)
        this.state ={
            currentUser: Authenticate_user.getUser(),
            data:null,
            update:false,
            success:null,
            selected:''

        }
    }
    //make axios request to get all past 50? receipts
    getAll = (specific) => {
        console.log('getall',specific)
        var headers = {
            withCredentials:true
        }
        var params;
        if(specific){
            params = {params:{specific:specific}}
            console.log('here')
        }else{
            console.log('here2')
            params = {params:{quantity:10}}
        }
        axios.get('/receipts',params,headers)
            .then(res=>{
                console.log('data received from client side',res.data)
                var {data} = res.data
                console.log('this is the ob',data)
                this.createDataObject(data,specific)
            })
            .catch(err=>{
                console.log('error----',err)
            })
    }
    createDataObject = (data,sp) =>{
        var dataObj = {}

        Object.keys(data).forEach((key)=>{
            var check_id = data[key].receipt_id
            console.log('id',check_id)
            if(!(check_id in dataObj)){
                dataObj[check_id] = {
                    store: data[key].store,
                    receipt_date:data[key].receipt_date.split('T')[0],
                    receipt_id: data[key].receipt_id,
                    items:[]
                }
            }
            dataObj[check_id]["items"].push({
                item_name:data[key].item_name,
                item_price:data[key].item_price
            })
        })
        
        this.setState((prev)=>{
            if(sp){
                console.log('sppp',sp)
                return {...prev,data:dataObj,selected:sp}
            }
            return {...prev,data:dataObj,selected:''}
        })
        
    }

    componentDidMount(){
        this.getAll()
    }
    //axios allow filter option for more?
    //axios search/filter by store
    //axios sum for month/year

    setMessage = (m)=>{
        if(m === "success"){
            return this.setState({success:true})
        }
        if(m === "error"){
            return this.setState({success:false})
        }
        this.setState({success:null})
    }
    setModal = (id)=>{
        console.log('id for modal',id)
        if(!(this.state.data[id]) && id!==''){
            return this.getAll(id)
        }
        return this.setState({selected:id})
    }

    render(){
        console.log('updated')
        if(this.state.data==null){
            return (<div class = "ui container">
                        <NavBar />
                        <h1> Current Receipts </h1>
                    </div>)
        }
        //ensure search will load modal for a receipt that has not been fetched yet
        return(
            <div class = "ui container">
                <NavBar />
                
                <h1> Current Receipts </h1>
                
                <SearchReceipts setModal ={this.setModal}/>
                {this.state.success === true?<ReceiptUpdateSuccess/>:null}
                {this.state.success === false?<ReceiptUpdateUnsuccessful/>:null}
                <Segment padded>
                    <Card.Group>
                        {Object.keys(this.state.data).map((key)=>{
                            return (
                                    <LoadReceipts 
                                        key ={key}
                                        getAll={this.getAll}
                                        data = {this.state.data[key]} 
                                        setMessage={this.setMessage} 
                                        modalOn={this.state.selected}
                                        clearModal={this.setModal} />
                                )
                        })}                    
                    </Card.Group>                   
                </Segment>


            </div>
        )
    }
}

export default Receipts;