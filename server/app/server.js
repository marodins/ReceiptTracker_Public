var express = require('express')
    upload_receipt = require('./routes/upload_route.js')
    view_route = require('./routes/view_receipts.js')
    register_user = require('./routes/register.js')

var app = express();
var cors = require('cors');

var session = require('express-session');
var bodyParser = require('body-parser');


var path = require('path');


app.use(bodyParser.json());
app.use('/upload',upload_receipt);
app.use('/receipts',view_route);
app.use('/register',register_user);


app.use(function(err,req,res,next){
    
    if(err.code){
        console.log(err.code)
        return res.status('300').send({error:err.code})
    }
    if(err.statusCode > 200){
        return res.send('server error')
    }
    else{
        return res.status('200').send('sent');
    }
});

app.use(session({
    secret:"axxsv!a",
    resave: false,
    saveUninitialized:true,
    cookie:{secure:true}
}))

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../client','build')));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../client','build','index.html'));
});

app.listen(3131,()=>{
    console.log('server listening')
});