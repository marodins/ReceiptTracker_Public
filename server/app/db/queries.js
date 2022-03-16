// all db query methods

const jwt = require('jsonwebtoken');
var pool = require('./connection.js');
var format = require('pg-format')


const registerUser = (req,res,next)=>{
    const add_user = 'INSERT INTO Users(email,password) VALUES ($1,$2)';
    const add_these = [req.body.email,req.body.password];

    const check_if_exists = 'SELECT email FROM Users WHERE email = $1'
    pool.query(check_if_exists,[req.body.email], (error, result)=>{
        if (error){
            return next(error);
        }
        if (result.rows.length > 0){
            res.locals.registercomplete = 'unable';
        }else{
            pool.query(add_user,add_these,(err,result)=>{
                if(err){
                    return next(err);
                }

            })
        }
        return next();
    })

};

const loginUser = (req,res,next) =>{
    const check_user = 'SELECT email, password from users WHERE email = $1';
    const email = req.body.email;
    const password = req.body.password;
    
    if(process.env.NODE_ENV === 'development'){
        var token = jwt.sign({email},process.env.JWTSECRET,{
            expiresIn:30000000
        })
        req.session.email = email;
        res.cookie('token',token,{httpOnly:true});
        return res.send({authentication:"user-authenticated", user:email,token:token})
    }
    pool.query(check_user,[email],(err,result)=>{
        console.log('sending', email)
        if (err){
            return res.send({authentication:"mismatch"})
        }
        if(result.rows.length > 0){
            if (result.rows[0].password === password){
                var token = jwt.sign({email},process.env.JWTSECRET,{
                    expiresIn:30000000
                })
                req.session.email = email;
                res.cookie('token',token,{httpOnly:true});
                return res.send({authentication:"user-authenticated", user:email,token:token})
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
    //creating the receipt with some data {store,date,email} = object
    var receipt_data = [req.body.store,req.body.date,req.body.email]
    //all [['banana',12,'account1@yahoo.com'],[...]]
    var email = req.body.email
    const all_items = req.body.items
    console.log('receipt data:', receipt_data, email);
    const insertStore = `INSERT INTO receipts(store,receipt_date,fk_user_receipt) VALUES($1,$2,
        (SELECT user_id FROM users WHERE email = $3)) RETURNING receipt_id;`

    const insertItems = `INSERT INTO items(item_name,item_price,fk_item_receipt) VALUES %L`

    // create receipt (store, date, )
    pool.query(insertStore,receipt_data,(err,results)=>{

        if(err){
            next(err)
        }
        else{
            var rid = results.rows[0].receipt_id
            var arr_items = Object.keys(all_items).map((key)=>{
                return [all_items[key].item_name,parseFloat(all_items[key].price),rid]
            })
            console.log(arr_items)
            // add all items belonging to that receipt
            pool.query(format(insertItems,arr_items),[],(err)=>{
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
    var quantity = req.query.quantity

    // get receipts for specific user
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
            return next(err)
        }
        res.locals.query_results = results.rows
        next()
    })
}

const specific_receipt = (req,res,next)=>{

    //queries database for specific receipt -- invoked when search item clicked from front end

    var specific_id = req.query.specific
    var email = req.session.email

    const getReceipt = `SELECT * FROM
                        (SELECT receipt_id as receipt_id_1
                        FROM receipts
                        WHERE fk_user_receipt = (SELECT user_id from users WHERE email = $1)
                        AND receipt_id = $2) q1
                        LEFT JOIN
                        (SELECT store, receipt_date, item_name,item_price,item_id, receipt_id
                        FROM receipts
                        INNER JOIN items on receipts.receipt_id = items.fk_item_receipt)q2

                        ON q2.receipt_id = q1.receipt_id_1;`

    pool.query(getReceipt,[email,specific_id],(err,results)=>{
        if(err){
            return next(err)
        }
        res.locals.query_results = results.rows
        next()
    })



}

const deleteReceipt = (req,res,next) =>{

    var receipt_id = req.query.receipt_id

    const delete_receipt = `DELETE FROM receipts WHERE receipt_id = $1`
    pool.query(delete_receipt, [receipt_id],(err,results)=>{
        if(err){
            next(err)
        }
        next()
    })

}

const changePass = (req,res,next) =>{
    var old = req.body.old
    var new_pass = req.body.new
    var email = req.session.email

    const changePass = `SELECT password FROM users WHERE email = $1`
    const updatePass = `UPDATE users SET password = $1 WHERE email = $2`

    pool.query(changePass,[email],(err,results)=>{
        if(err){
            console.log(err);
            return next(err)
        }
        if(results.rows[0].password !== old){
            res.send({message:"password-no-match"})
            res.end()
        }
        else{
            pool.query(updatePass,[new_pass,email],(err)=>{
                if (err){
                    next(err)
                }
                else{
                    next()
                }
            })
        }
    })
}
const changeEmail = (req,res,next) =>{
    var newEmail = req.body.new

    var oldEmail = req.session.email
    const changeEmail = `UPDATE users SET email = $1 WHERE email = $2`
    const checkIf = `SELECT email FROM users WHERE email = $1`
    pool.query(checkIf,[newEmail],(err,results)=>{
        if (err){
            next(err)
        }
        if(results.rows[0]){
            res.send({message:'email-in-use'})
            res.end()
        }else{
            pool.query(changeEmail, [newEmail,oldEmail],(err,result)=>{
                if(err){
                    next(err)
                }
                next()
            })
        }
    })


}

const deleteAccount = (req,res,next) =>{
    var email = req.session.email
    const deleteAcc = `DELETE FROM users WHERE email = $1`

    pool.query(deleteAcc,[email],(err,result)=>{
        if(err){
            next(err)
        }
        next()
    })
}
const searchReceipts = (req,res,next)=>{
    var input = req.query.value
    var email = req.session.email

    const search = `SELECT receipt_id AS price, store AS title, receipt_date AS description
                    FROM receipts
                    WHERE LOWER(receipts.store) LIKE $1 || '%'
                    AND fk_user_receipt = (SELECT user_id FROM users WHERE email = $2)`

    pool.query(search,[input, email],(err,results)=>{
        if(err){
            return next(err)
        }
        res.locals.query_results = results
        next()
    })
}

var updateReceipt = (req,res,next)=>{
    //get store name --req.body
    var rid = req.body.receipt_id
    var store = req.body.store
    var items = req.body.items


    //get receipt date
    var date = req.body.date

    //delete current items of that rid
    const updateRec =  `UPDATE receipts
                        SET store = $1, receipt_date = $2
                        WHERE receipt_id = $3`
    const deleteCurrentItems =`DELETE FROM items WHERE fk_item_receipt = $1`
    //add every single item: price: as new items for that recipt id
    const addItems = `INSERT INTO items (item_name,item_price,fk_item_receipt) VALUES %L`

    pool.query(updateRec,[store,date,rid],(err)=>{
        if(err){
            next(err)
        }
        pool.query(deleteCurrentItems,[rid],(err)=>{
            if(err){
                next(err)
            }
            pool.query(format(addItems,items),[],(err)=>{
                if(err){
                    next(err)
                }
                next()
            })
        })

    })



}

module.exports = {
    registerUser:registerUser,
    loginUser:loginUser,
    uploadReceipt:uploadReceipt,
    getReceipts:getReceipts,
    deleteReceipt:deleteReceipt,
    changePass : changePass,
    changeEmail : changeEmail,
    deleteAccount:deleteAccount,
    searchReceipts:searchReceipts,
    updateReceipt:updateReceipt,
    specific_receipt:specific_receipt
}
