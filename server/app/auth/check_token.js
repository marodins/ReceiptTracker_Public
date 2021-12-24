// checks jwt token -- authentication

const jwt = require('jsonwebtoken');


const check_token = (req,res,next)=>{
    var token = req.cookies.token;
    
    // if token exists
    if(token){
        // decrypt using key
        jwt.verify(token,'appleCarrot',function(err,decoded){
            if(err){
                next(err);
            }
            next();
        })
    }
    else{
        next(new Error("Not authenticated") );
    }
}

module.exports = check_token;