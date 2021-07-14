var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
const bodyParser = require('body-parser');

const path = require('path')
const fs = require('fs');

var multer = require('multer');

var fileUpload = multer({dest:'./uploads'}).single('avatar');


//const {TesseractWorker} = require('tesseract.js')

//const worker = new TesseractRunner();
/*
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,res,cb)=>{
        cb(null,req.file);
    }
});

const upload = multer({storage:storage}).file('new_file')
*/
//app.use(express.static(path.resolve(__dirname,'../client/build')));
app.use('/',express.static('public'));
app.use(express.urlencoded({extended:false}));


app.get("/home",(req,res)=>{
    console.log('at home page')
});
app.put("/login",(req,res)=>{
    res.json({ok:'got it'})
});
app.post("/upload",fileUpload,(req,res)=>{
    if(req.file){

        console.log(req.file.name)
        res.json({
            status:"received",
            data:req.file.name
        })
        res.end();
    }
    
    res.json({file:'did not get file'})
})

//serve this file for any other non-existent route
/*
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../client/build','index.html'));
})
*/

const PORT = process.env.PORT || 9696;
app.listen(PORT, ()=>{
    console.log(`server listening ${PORT}`);
})

module.exports = app;