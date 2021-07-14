import React from "react";
import {Route} from 'react-router-dom'
import Login from "./components/pages/Login"
import Upload from "./components/pages/Upload"
import Receipts from "./components/pages/Receipts"
import Register from "./components/pages/Register"

const App = ()=>(
  <div>
    <Route path="/" exact component = {Login}/>
    <Route path="/upload" exact component = {Upload}/>
    <Route path="/receipts" exact component = {Receipts}/>
    <Route path="/register" exact component = {Register}/>
  </div>
)

export default App;
