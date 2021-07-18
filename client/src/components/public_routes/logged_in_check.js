import React from 'react';
import {Component} from 'react';
import Authenticate_user from '../../auth/login_auth'
import {Route,Redirect} from 'react-router-dom'



const PublicRoute = ({component:Component,...rest})=>{
    return(
        <Route {...rest} render={(props)=>{
            if(Authenticate_user.isAuth()===true){
                return <Redirect to={{pathname:'/upload',state:{from:props.location}}} />
            }else{
                return <Component {...props}/>
            }
             
        }}>
        </Route>
    )
}
export default PublicRoute;