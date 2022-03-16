var express = require('express')
const check_token = require('../auth/check_token.js')

var router = express.Router()

const { uploadReceipt } = require('../db/queries.js')


router.post('/',check_token,uploadReceipt,(req,res,next)=>{
    return res.status(200).send({message:"success"})
})


module.exports = router