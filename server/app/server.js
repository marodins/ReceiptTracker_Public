var express = require('express');
    log_in = require('./routes/login_route.js');
    check_token = require('./auth/check_token.js');
    log_out = require('./routes/log_out.js');
    users = require('./routes/user');
    receipts = require('./routes/receipts');


var app = express();

var cors = require('cors');
var path = require('path');

const ppath = path.join(__dirname,'../../client','build');

var session = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

let port = process.env.PORT || 3131;

app.use(cors({
    origin: process.env.NODE_ENV === 'development'? "http://localhost:3000" : "https://receipt-tracker.herokuapp.com",
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
    if (app.get(process.env.NODE_ENV)==='production'){
        app.set('trust proxy',1)
        sess.cookie.secure = true
    }
    next()
})

app.use(session(sess));

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());



app.use('/logout',log_out)
app.use('/login',log_in)
app.use('/users/:uid/receipts', receipts)
app.use('/users', users)


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

app.get('*', (req, res, next)=>{
    return res.redirect('https://receipt-tracker.herokuapp.com')
})

app.listen(port, ()=>{
  console.log('connected to ', port);
});
