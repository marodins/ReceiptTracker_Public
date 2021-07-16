var express = require('express');
var router = express.Router();


router.get('/',(req,res)=>{
    if (req.session.email){
        return res.json({loggedIn:true})
    }
    else{
        return res.json({loggedIn:false})
    }
})


module.exports = router;