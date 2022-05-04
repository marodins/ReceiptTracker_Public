// checks jwt token -- authentication

const jwt = require('jsonwebtoken');


const check_token = (req,res,next)=>{
    var token = req.cookies.token;
    
    // if token exists
    if(token){
        jwt.verify(token,process.env.JWTSECRET,(err,decoded)=>{
            if(err){
                return next(err);
            }
            return next();
        })
    }
    else{
        return next(new Error("Not authenticated") );
    }
}

module.exports = check_token;