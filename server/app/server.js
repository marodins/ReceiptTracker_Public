var express = require('express')
    upload_receipt = require('./routes/upload_route.js')
    view_receipts = require('./routes/view_receipts.js')
    register_user = require('./routes/register.js')
    log_in = require('./routes/login_route.js')
    check_login = require('./routes/check_login.js')
    check_token = require('./auth/check_token.js')
    log_out = require('./routes/log_out.js');
    submit_receipt = require('./routes/submit_receipt.js')
    change = require('./routes/change.js')

var app = express();
var cors = require('cors');

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('express-jwt');


var path = require('path');


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use(cookieParser());


app.use(session({
    secret:"axxsv!a",
    resave: false,
    saveUninitialized:false,
    cookie:{secure:false}
}));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
/*
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"http://localhost:3000");
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    next()
});
*/
app.use('/upload',upload_receipt)
app.use('/register',register_user)
app.use('/logout',log_out)
app.use('/login',log_in)
app.use('/check_login',check_login)
app.use('/submit_receipt',submit_receipt)
app.use('/receipts',view_receipts)
app.use('/change',change)



app.use(function(err,req,res,next){
    
    if(res.statusCode >= 400){
        return res.send('server error')
    }
    if(err){
        return res.send({error:err.code})
    }
    else{
        return res.status('200').send({status:'sent'});
    }
});


app.use(express.static(path.join(__dirname,'../client','build')));

app.use((req,res)=>{
    res.sendFile(path.resolve(__dirname,'../../client','build','index.html'));
});

app.listen(3131,()=>{
    console.log('server listening')
});