
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
    const check_user = 'SELECT email, password from users WHERE email = $1';
    const email = req.body.email;
    const password = req.body.password;
    pool.query(check_user,[email],(err,result)=>{
        console.log('here is info sent',email,password)
        console.log(result.rows.length)
        if (err){
            return next(err);
        }
        if(result.rows.length > 0){
            if (result.rows[0].password === password){
                req.session.email = email
                return res.send({authentication:"user-authenticated"})
            }
            else{
                return res.send({authentication:"mismatch"})
            }
        }
        else{
            return res.send({authentication:"no-match"})
        }
    });


};

module.exports = {registerUser:registerUser,loginUser:loginUser}
