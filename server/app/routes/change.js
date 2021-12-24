var express = require ('express')
const check_token = require('../auth/check_token')
var {changePass,changeEmail,deleteAccount} = require('../db/queries')

var router = express.Router()


router.put('/password',check_token,changePass,(req,res,next)=>{
    res.send({message:"successful"})
})
router.post('/email',check_token,changeEmail,(req,res,next)=>{
    res.send({message:"successful"})
})

router.delete('/delete',check_token,deleteAccount,(req,res,next)=>{
    console.log('alright')
    res.send({message:"successfully-deleted"})
})

module.exports = router