
var multer = require('multer');
var Tesseract = require('tesseract.js');
var path = require('path');
var {Receipt} = require('../methods/analyze_receipt.js');
var gm = require('gm').subClass({
    imageMagick:true
});

var fs = require('file-system');


var storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'app/uploads/')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + file.originalname)
    }
});

var fileUpload = multer({storage:storage});

var check_folder = (req, res, next)=>{
    fs.mkdirSync('app/uploads');
    next();
}

var processImage = async ({fileName, filePath}, done)=>{
    var ext = fileName.slice('/')[1]
    var processedData = {};
    gm(filePath)
    .monochrome()
    .sharpen(14,4)
    .setFormat(ext)
    .write(fileName, (err)=>{
        if(err){
            return done(err);
        }
        Tesseract.recognize(filePath,'eng')
        .then(({data:{text}})=>{
            var newReceipt = new Receipt(text)

            newReceipt.setAll().then(()=>{
                var {store,items,date} = newReceipt.fullReceipt
                processedData.data = {store,items,date}
                return done(null, processedData);
            });

        })
        .catch(err=>{
            return done(err);
        })


    })
    return processedData;
}


 module.exports = {check_folder, fileUpload, processImage}
