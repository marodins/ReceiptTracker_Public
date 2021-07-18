var express = require('express');
var router = express.Router();



router.post('/',(req,res,next)=>{
    req.session.destroy(err=>{
        next(err)
    });
    res.clearCookie('connect.sid',{path:'/'});
    res.clearCookie('token',{path:'/'});
    res.status('200').send({message:'user-logged-out'})
})


module.exports = router;