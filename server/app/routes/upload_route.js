//upload route
var express = require('express');
var router = express.Router();
var multer = require('multer');
var check_token = require('../auth/check_token');
var Tesseract = require('tesseract.js');
var path = require('path');
var {Receipt} = require('../methods/analyze_receipt.js');
var gm = require('gm');


var storage = multer.memoryStorage();

var processImage = (req, res, next)=>{

    gm(req.file.buffer)
    .monochrome()
    .sharpen(14,4)
    .toBuffer((err, buffer)=>{
        console.log('error', err);
        console.log('buffer',buffer);
        if(err){
            return next(err);
        }
        Tesseract.recognize(buffer,'eng',{logger:e=>{console.log('working')}})
        .then(({data:{text}})=>{
            var newReceipt = new Receipt(text,req,res)

            newReceipt.setAll().then(()=>{
                var {email,store,items,date} = newReceipt.fullReceipt
                res.locals.data = {email,store,items,date}
                next();
            });

        })
        .catch(err=>{
            next(err)
        })


    })
}


var fileUpload = multer({storage:storage});


router.post('/',check_token,fileUpload.single('avatar'),processImage,(req,res,next)=>{
    res.send({message:'upload complete',data:res.locals.data})
})


 module.exports = router
