//upload route
var express = require('express');
var router = express.Router();
var multer = require('multer');
var check_token = require('../auth/check_token');
var Tesseract = require('tesseract.js');
var fs = require('fs');
var path = require('path');
var {Receipt} = require('../methods/analyzeReceipt.js');
var gm = require('gm');


var storage = multer.diskStorage(
    {destination:function(req,file,callback){
        name = req.fileDest
        console.log('this is the file',file)
        callback(null,name)
    },filename:function(req,file,callback){
        fileName = file.originalname
        console.log('filllleeename',fileName)
        callback(null,fileName)
    }});

var sharpenImage = (path)=>{
    gm(path)
    .monochrome()
    .sharpen(14,4)
    .write(path,function(err){
        console.log('writing')
        if(err){
            throw new Error('not an image');
        }
    })
}

var runTes = (req,res,next)=>{
        current = path.join(__dirname,'../',req.file.path)
        try{
            sharpenImage(current)
        }catch(err){
            next(err)
        }
        Tesseract.recognize(current,'eng',{logger:e=>{console.log('working')}})
                .then(({data:{text}})=>{
                    console.log('heres the text')
                    console.log(text);
                    //fs.rmdirSync(req.file.destination,{recursive:true});
                    var newReceipt = new Receipt(text,req,res)
                    newReceipt.setAll().then(()=>{
                        var {email,store,items,date} = newReceipt.fullReceipt
                        res.locals.data = {email,store,items,date}
                        console.log('sending this to client',res.locals.data)
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
    folder = path.join('../uploads',req.session.email+req.cookies.token.slice(-10),'/')
    console.log('folder name',folder);
    //check if folder exists for user-token
    if (!fs.existsSync(folder)){
        console.log('folder does not exist')
        fs.mkdirSync(folder);
    }
    req.fileDest=folder
    
    next();
}

router.post('/',check_token,checkFolder,fileUpload.single('avatar'),runTes,(req,res,next)=>{
    console.log('thihsishidhsd',res.locals.data)
    res.status('200').send({message:'upload complete',data:res.locals.data})

})


 module.exports = router

