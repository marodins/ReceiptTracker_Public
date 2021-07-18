//upload route
var express = require('express');
var router = express.Router();
var multer = require('multer');
var check_token = require('../auth/check_token');

//tesseract here

var fileUpload = multer({dest:'../uploads',}).any();

router.post('/',check_token,fileUpload,(req,res,next)=>{
    console.log('received')
    res.status('200').send({message:'upload complete'})
})


 module.exports = router;

