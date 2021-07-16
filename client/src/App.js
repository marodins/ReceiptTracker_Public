import React from "react";
import {Route, Switch} from 'react-router-dom'
import Login from "./components/pages/Login"
import Upload from "./components/pages/Upload"
import Receipts from "./components/pages/Receipts"
import Register from "./components/pages/Register"
import PrivateRoute from "./components/private_routes/_check_login"

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn:"NOT_LOGGED_IN",
      user:null
    }
  }
  render(){
    return(
      <Switch>
        <Route path="/" exact component = {Login}/>
        <PrivateRoute path="/upload" exact component = {Upload}/>
        <PrivateRoute path="/receipts" exact component = {Receipts}/>
        <Route path="/register" exact component = {Register}/>
      </Switch>       
    )
  }
}

export default App;
