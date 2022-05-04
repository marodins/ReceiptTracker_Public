
// instance to track each users' authorization status for rerouting purposes

import axios from 'axios';

class AuthenticateUser{
    constructor(){
        this.authenticated = false;
        this.user = null;
        this.user_id = null;
        this.token = null;
    }

    login(user,token,uid, callback){
        this.authenticated=true;
        this.token = token;
        this.user = user;
        this.user_id = uid

        callback();
    }

    logout(callback){
        this.authenticated=false
        axios.post('/logout',this.user,{withCredentials:true})
            .then(res=>{
                this.user=null;
                this.token=null;
                callback();
            })
            .catch(err=>{
                return err
            })
    }
    isAuth(){
        return this.authenticated
    }
    getUser(){
        return this.user
    }
    setToken(tk){
        this.token = tk

    }
    setUser(user){
        this.user = user
    }
}

export default new AuthenticateUser();