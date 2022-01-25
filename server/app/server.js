

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

const dotenv = require('dotenv').config({path:'../.env'});

var cors = require('cors');
var path = require('path');

const ppath = path.join(__dirname,'../../client','build');

var session = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('express-jwt');

let port = process.env.PORT || 3131;

app.use(cors({
    origin:'https://receipt-tracker.herokuapp.com',
    credentials:true
}));

app.use(cookieParser());


var sess = {
    keys:[process.env.SESS_SECRET],
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false
    }
}

app.use(function(req,res,next){
    if (app.get('env')==='production'){
        app.set('trust proxy',1)
        sess.cookie.secure = true
    }
    next()
})

app.use(session(sess));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

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


app.use(express.static(ppath));

app.listen(port, ()=>{
  console.log('connected to ', port);
});
