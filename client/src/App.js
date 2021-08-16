import React from "react";
import {Route, Switch} from 'react-router';
import Login from "./components/pages/Login";
import Upload from "./components/pages/Upload";
import Receipts from "./components/pages/Receipts";
import Register from "./components/pages/Register";
import PrivateRoute from "./components/private_routes/_check_login";
import PublicRoute from "./components/public_routes/logged_in_check";
import Authenticate_user from "./auth/login_auth";

class App extends React.Component{
  constructor(props){
    super(props);
    this.setUser = this.setUser.bind(this);
    this.state = {
      user:Authenticate_user.getUser(),
      jwt:null
    }
  }
  setUser =()=>{
    this.setState({user:Authenticate_user.getUser()});
  }
  componentDidUpdate(){
    this.setState({user:Authenticate_user.getUser()});
    this.setState({jwt:Authenticate_user.getToken()});
  }

  render(){
    console.log('current user from main App',this.state.user)
    return(
      <Switch>
        <PublicRoute path="/" exact component = {Login}/>
        <PrivateRoute path="/upload" exact component = {Upload}/>
        <PrivateRoute path="/receipts" exact component = {Receipts}/>
        <Route path="/register" exact component = {Register}/>
      </Switch>       
    )
  }
}

export default App;
