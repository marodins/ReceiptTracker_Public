var express = require('express');
var router = express.Router();
var {uploadReceipt, updateReceipt, deleteReceipt, specific_receipt} = require('../db/queries');
var {check_query} = require('../methods/check_query');
var check_token = require('../auth/check_token.js');
var {query_check} = require('../methods/check_which');


// add receipt
router.post('/', check_token, uploadReceipt, (req,res,next)=>{
    return res.status(200).send({message:"success"})
});

// delete receipt
router.delete('/:rid', check_token, deleteReceipt, (req,res)=>{
    res.send({message:"successfully deleted"})
});

// modify receipt
router.put('/:rid', check_token,updateReceipt,(req,res)=>{
    res.send({message:"successfully updated"})
});

//get all receipts
router.get('/',check_token, query_check,(req,res,next)=>{
    res.send({message:'successfully retrieved',data:res.locals.query_results})
});

// get one receipt based on selection
router.get('/:rid/detail',check_token, specific_receipt, (req,res,next)=>{
    res.send({message:'successfully retrieved',data:res.locals.query_results})
});

module.exports = router;