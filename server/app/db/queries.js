
const jwt = require('jsonwebtoken');
const { all } = require('../routes/log_out.js');
var pool = require('./connection.js');
var format = require('pg-format')


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
        console.log('here is info sent',email,password);
        console.log(result);
        if (err){
            return next(err);
        }
        if(result.rows.length > 0){
            var token = jwt.sign({email},'appleCarrot',{
                expiresIn:30000000
            })
            if (result.rows[0].password === password){
                req.session.email = email;
                res.cookie('token',token,{httpOnly:true});
                res.send({authentication:"user-authenticated", user:email,token:token})
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


const uploadReceipt = (req,res,next)=>{
    console.log('this is the req thats sent from client on receipt upload',req.body)
    //creating the receipt with some data {store,date,email} = object
    var receipt_data = [req.body.store,req.body.date,req.body.email]
    //all [['banana',12,'account1@yahoo.com'],[...]]
    var email = req.body.email
    const all_items = req.body.items
    


    

    const insertStore = `INSERT INTO receipts(store,receipt_date,fk_user_receipt) VALUES($1,$2,
        (SELECT user_id FROM users WHERE email = $3)) RETURNING receipt_id;`

    const insertItems = `INSERT INTO items(item_name,item_price,fk_item_receipt) VALUES %L`

    /*const insertItems = `INSERT INTO items(item_name,item_price,fk_item_receipt) VALUES($1,$2,
        (SELECT receipt_id from receipts WHERE fk_user_receipt = (SELECT user_id FROM users WHERE email =$3) ORDER BY receipt_id DESC
        LIMIT 1))`*/

    pool.query(insertStore,receipt_data,(err,results)=>{
        console.log('making submit request',results)
        
        if(err){
            console.log('error on first')
            next(err)
        }
        else{
            var rid = results.rows[0].receipt_id
            var arr_items = Object.keys(all_items).map((key)=>{
                return [all_items[key].item_name,parseFloat(all_items[key].price),rid]
            })



            pool.query(format(insertItems,arr_items),[],(err)=>{
                console.log('making second request',arr_items)
                if(err){
                    next(err)
                }
                else{
                    next()
                }
            })
        }

    })
};

const getReceipts = (req,res,next)=>{
    var email = req.session.email
    var quantity = req.body.quantity
    const getInfo =   `SELECT * FROM
                    (SELECT receipt_id as receipt_id_1
                    FROM receipts
                    WHERE fk_user_receipt = (SELECT user_id from users WHERE email = $1)
                    GROUP BY receipt_id ORDER BY receipt_id DESC LIMIT $2 )q1
                    LEFT JOIN
                    (SELECT store, receipt_date, item_name,item_price,item_id, receipt_id
                    FROM receipts
                    INNER JOIN items on receipts.receipt_id = items.fk_item_receipt)q2
                    
                    ON q1.receipt_id_1 = q2.receipt_id;`
    
    pool.query(getInfo,[email,quantity],(err,results)=>{

        if(err){
            next(err)
        }
        req.data.query_results = results.rows
        next()
    })
}

module.exports = {
    registerUser:registerUser,
    loginUser:loginUser,
    uploadReceipt:uploadReceipt,
    getReceipts:getReceipts
}
