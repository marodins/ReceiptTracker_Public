//upload route
var express = require('express');
var router = express.Router();
var multer = require('multer');

//tesseract here

var fileUpload = multer({dest:'../uploads',}).any();

router.post('/',fileUpload,(req,res,next)=>{
    console.log('received')
})


 module.exports = router;

