import React from 'react';
import {Component} from 'react';
import Authenticate_user from '../../auth/login_auth'
import {Route,Redirect} from 'react-router-dom'



const PrivateRoute = ({component:Component,...rest}) =>{
    return(
        <Route {...rest} render={(props)=>{
            if(Authenticate_user.isAuth()===true){
                return <Component {...props}/>
            }else{
                return <Redirect to={{pathname:'/',state:{from:props.location}}} />
            }
             
        }}>
        </Route>
    )
}

export default PrivateRoute;