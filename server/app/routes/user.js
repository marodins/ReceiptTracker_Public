var express = require('express');
var router = express.Router();
var {registerUser, deleteAccount} = require('../db/queries.js')
var {change_check} = require('../methods/check_which')
var check_token = require('../auth/check_token');
var {check_folder, fileUpload, processImage} = require('../methods/upload_route')

//register user
router.post('/',registerUser,(req,res,next)=>{
    if(res.locals.registercomplete){
        return res.send({message:'taken'});
    }
    res.send({message:'User registered'});
});
//modify user
router.patch('/:uid', check_token, change_check,(req,res,next)=>{
    res.send({message:"successful"})
});

//delete user
router.delete('/:uid', check_token, deleteAccount,(req,res,next)=>{
    res.send({message:"successfully-deleted"})
})
// upload image to parse
router.post('/:uid/uploads',check_token,check_folder, fileUpload.single('avatar'),processImage,(req,res,next)=>{
    return res.send({message:'upload complete',data:res.locals.data})
})

module.exports = router