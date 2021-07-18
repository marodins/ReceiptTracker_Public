
import axios from 'axios';

class Authenticate_user{
    constructor(){
        this.authenticated = false;
        this.user = null;
        this.token = null;
    }

    login(user,token,callback){
        this.authenticated=true;
        this.token = token;
        this.user = user;

        callback();
    }

    logout(callback){
        this.authenticated=false
        console.log('the current user',this.user);
        axios.post('http://localhost:3131/logout',this.user,{withCredentials:true})
            .then(res=>{
                this.user =null;
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

export default new Authenticate_user();