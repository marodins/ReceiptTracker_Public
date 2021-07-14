
var pool = require('./connection.js');


const registerUser = (req,res,next)=>{
    const add_user = 'INSERT INTO Users(email,password) VALUES ($1,$2)';
    const add_these = [req.body.email,req.body.password];
    pool.query(add_user,add_these,(error,result)=>{
        if(error){
            return next(error);
        }
        return res.send({message:'User registered'});

    })
};

const loginUser = (req,res,next) =>{
    const check_user = 'SELECT email,password from Users WHERE email = ?';
    const email = req.body.email;
    pool.query(check_user,email,(err,result)=>{
        if (err){
            return next(err);
        }
        return res.send({message:'User logged in'})
    });


};

module.exports = {registerUser:registerUser,loginUser:loginUser}
