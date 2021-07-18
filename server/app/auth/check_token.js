
const jwt = require('jsonwebtoken');


const check_token = (req,res,next)=>{
    var token = req.cookies.token;
    console.log('token received',token)

    if(token){
        jwt.verify(token,'appleCarrot',function(err,decoded){
            console.log('the token',decoded);
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