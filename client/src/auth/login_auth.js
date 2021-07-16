import axios from 'axios';

class Authenticate_user{
    constructor(){
        this.authenticated = false    
    }
    
    login(callback){
        this.authenticated=true
        callback()
    }
    logout(callback){
        this.authenticated=false
        callback()
    }
    isAuth(){
        return this.authenticated
    }
}

export default new Authenticate_user();