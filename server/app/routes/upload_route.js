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
    console.log('current req.file', req.file)
    gm(req.file.buffer, req.file.originalname)
    .monochrome()
    .sharpen(14,4)
    .toBuffer((err, buffer)=>{
        if(err){
            return next(err);
        }
        Tesseract.recognize(buffer,'eng')
        .then(({data:{text}})=>{
            var newReceipt = new Receipt(text,req,res)

            newReceipt.setAll().then(()=>{
                var {email,store,items,date} = newReceipt.fullReceipt
                res.locals.data = {email,store,items,date}
                console.log(res.locals)
                return next();
            });

        })
        .catch(err=>{
            return next(err)
        })


    })
}


var fileUpload = multer({storage:storage});


router.post('/',check_token,fileUpload.single('avatar'),processImage,(req,res,next)=>{
    return res.send({message:'upload complete',data:res.locals.data})
})


 module.exports = router
