//upload route
var express = require('express');
var router = express.Router();
var multer = require('multer');
var check_token = require('../auth/check_token');
var Tesseract = require('tesseract.js');
var path = require('path');
var {Receipt} = require('../methods/analyze_receipt.js');
var gm = require('gm');


var storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + file.originalname)
    }
});

var processImage = (req, res, next)=>{

    gm(req.file.path)
    .monochrome()
    .sharpen(14,4)
    .toBuffer((err, buffer)=>{
        if(err){
            console.log(err)
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


router.post('/',fileUpload.single('avatar'),processImage,(req,res,next)=>{
    return res.send({message:'upload complete',data:res.locals.data})
})


 module.exports = router
