import axios from 'axios'
import React from 'react'
import {Search} from 'semantic-ui-react'
import current_user from '../../auth/login_auth'



class SearchReceipts extends React.Component{
    constructor(props){
        super(props)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.state={
            results:[],
            loading:false
        }
        this.user_id = current_user.user_id
    }

    handleSearchChange = (e)=>{
        var theVal =  e.target.value
        if(theVal.length > 0){
            this.setState({loading:true})
            axios.get(`/users/${this.user_id}/receipts`,{params:{value:theVal}},{withCredentials:true})
                .then((res)=>{
                    var fullResults = res.data.data.rows.map((ob)=>{
                        return {...ob,key:ob.price}
                    })
                    this.setState({results:fullResults,loading:false})
                })
                .catch(err=>{
                    console.log(err)
                })

        }

    }



    render(){
        return(
            <Search
                loading={this.state.loading}
                onResultSelect={(e,data)=>{
                    return this.props.setModal(data.result.price)
                }}
                onSearchChange = {this.handleSearchChange}
                results = {this.state.results}
            />
        )
    }
}

export default SearchReceipts