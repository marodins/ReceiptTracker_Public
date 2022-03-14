//upload route
var express = require('express');
var router = express.Router();
var multer = require('multer');
var check_token = require('../auth/check_token');
var Tesseract = require('tesseract.js');
var fs = require('file-system');
var path = require('path');
var {Receipt} = require('../methods/analyze_receipt.js');
var gm = require('gm');


var storage = multer.diskStorage(
    {destination:function(req,file,callback){
        pname = req.fileDest
        callback(null,pname)
    },filename:function(req,file,callback){
        fileName = req.session.email + Date.now() + file.originalname
        req.fileName = fileName
        callback(null,fileName)
    }});

var sharpenImage = (path)=>{
    gm(path)
    .monochrome()
    .sharpen(14,4)
    .write(path,function(err){
        if(err){
            throw new Error('not an image');
        }
    })
}

var runTes = (req,res,next)=>{
    // Run tesseract to analyze image file and convert to text
        current = req.file.path
        try{
            sharpenImage(current)
        }catch(err){
            next(err)
        }
        Tesseract.recognize(current,'eng',{logger:e=>{console.log('working')}})
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

    }

var fileUpload = multer({storage:storage});


var checkFolder = (req,res,next)=>{
    //make folder name using token and email
    folder = path.join(__dirname,'../../uploads/')
    req.fileDest = folder
    next();
}

router.post('/',check_token,checkFolder,fileUpload.single('avatar'),runTes,(req,res,next)=>{
    res.send({message:'upload complete',data:res.locals.data})
})


 module.exports = router
