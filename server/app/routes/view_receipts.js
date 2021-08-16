//edit receipts
//add receipts
//get receipts
//delete receipts

var express = require('express');
var router = express.Router();
var {getReceipts} = require('../db/queries')

router.put('/',(req,res)=>{
    //edit receipts
});

router.post('/',(req,res)=>{
    //add to receipts
});

router.get('/',getReceipts,(req,res)=>{
    res.send({message:'successfully retrieved',data:req.data.query_results})
});

router.delete('/',(req,res)=>{
    //delete receipt
});


module.exports = router;