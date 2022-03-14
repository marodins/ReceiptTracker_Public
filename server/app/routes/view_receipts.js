
var express = require('express')
var router = express.Router()
var {getReceipts,deleteReceipt,searchReceipts,updateReceipt} = require('../db/queries')
var {check_query} = require('../methods/check_query')
var check_token = require('../auth/check_token')

router.delete('/delete',check_token,deleteReceipt,(req,res)=>{
    res.send({message:"successfully deleted"})
});

router.put('/update',check_token,updateReceipt,(req,res)=>{
    res.send({message:"successfully updated"})
});

router.get('/',check_token,check_query,(req,res,next)=>{
    res.send({message:'successfully retrieved',data:res.locals.query_results})
});

router.get('/search',check_token,searchReceipts,(req,res,next)=>{
    res.send({message:'successfully retrieved',data:res.locals.query_results})
});


module.exports = router