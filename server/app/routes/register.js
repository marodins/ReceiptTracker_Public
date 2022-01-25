var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var {registerUser} = require('../db/queries.js')


router.post('/',registerUser,(req,res,next)=>{
    if(res.locals.registercomplete){
        return res.send({message:'taken'});
    }
    res.send({message:'User registered'});
});


module.exports = router
