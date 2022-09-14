// all db query methods

const jwt = require('jsonwebtoken');
var pool = require('./connection.js');
var format = require('pg-format')


const registerUser = (req,res,next)=>{
    const add_user = 'INSERT INTO Users(email,password) VALUES ($1,$2) RETURNING user_id';
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
    const check_user = 'SELECT email, password, user_id from users WHERE email = $1';
    const email = req.body.email;
    const password = req.body.password;
    
    pool.query(check_user,[email],(err,result)=>{
        if (err){
            return res.send({authentication:"mismatch"})
        }
        if(result.rows.length > 0){
            if (result.rows[0].password === password){
                user_id = result.rows[0].user_id
                var token = jwt.sign({"uid":user_id},process.env.JWTSECRET,{
                    expiresIn:30000000
                })
                res.cookie('token',token,{httpOnly:true});
                return res.status(201).send({authentication:"user-authenticated", user:email,token:token, uid:user_id})
            }
            else{
                return res.status(404).send({authentication:"mismatch"})
            }
        }
        else{
            return res.status(404).send({authentication:"no-match"})
        }
    });


};


const uploadReceipt = (req,res,next)=>{
    //creating the receipt with some data {store,date,email} = object
    
    //all [['banana',12,'account1@yahoo.com'],[...]]
    var user_id = req.params.uid
    var store = req.body.store ? req.body.store : 'N/A Store';
    var date = req.body.date ? req.body.date : '01/01/1999';
    var receipt_data = [store, date, user_id];
    const all_items = req.body.items;

    const insertStore = `INSERT INTO receipts(store,receipt_date,fk_user_receipt) VALUES($1,$2,$3) RETURNING receipt_id`

    const insertItems = `INSERT INTO items(item_name,item_price,fk_item_receipt) VALUES($1, $2, $3)`

    // create receipt (store, date, )
    pool.query(insertStore,receipt_data,(err,results)=>{

        if(err){
            next(err)
        }
        else{
            var rid = results.rows[0].receipt_id;
            var arr_items = Object.keys(all_items).map((key)=>{

                var price = all_items[key].price ? parseFloat(all_items[key].price): 0.0;
                var item_name = all_items[key].item_name;
                return [item_name, price,rid];
            })
            // add all items belonging to that receipt

            for(var item of arr_items){
                pool.query(insertItems,item,(err)=>{
                    if(err){
                        return next(err)
                    }
                })                

            }
            return next();

        }

    })
};

const getReceipts = (req,res,next)=>{
    var uid = req.params.uid
    var quantity = req.query.quantity

    // get receipts for specific user
    const getInfo =   `SELECT * FROM
                    (SELECT receipt_id as receipt_id_1
                    FROM receipts
                    WHERE fk_user_receipt = $1
                    GROUP BY receipt_id ORDER BY receipt_id DESC LIMIT $2 )q1
                    LEFT JOIN
                    (SELECT store, receipt_date, item_name,item_price,item_id, receipt_id
                    FROM receipts
                    INNER JOIN items on receipts.receipt_id = items.fk_item_receipt)q2

                    ON q1.receipt_id_1 = q2.receipt_id;`

    pool.query(getInfo,[uid,quantity],(err,results)=>{
        if(err){
            return next(err)
        }
        res.locals.query_results = results.rows
        return next()
    })
}

const specific_receipt = (req,res,next)=>{

    //queries database for specific receipt -- invoked when search item clicked from front end

    var specific_id = req.params.rid
    var email = req.params.uid

    const getReceipt = `SELECT * FROM
                        (SELECT receipt_id as receipt_id_1
                        FROM receipts
                        WHERE fk_user_receipt = $1
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

    var rid = req.params.rid

    const delete_receipt = `DELETE FROM receipts WHERE receipt_id = $1`
    pool.query(delete_receipt, [rid],(err,results)=>{
        if(err){
            return next(err)
        }
        return next()
    })

}

const changePass = (req,res,next) =>{
    var old = req.body.old_password
    var new_pass = req.body.new_password
    var uid = req.params.uid

    const changePass = `SELECT password FROM users WHERE user_id = $1`
    const updatePass = `UPDATE users SET password = $1 WHERE user_id = $2`

    pool.query(changePass,[uid],(err,results)=>{
        if(err){
            return next(err)
        }
        if(results.rows[0].password !== old){
            res.send({message:"password-no-match"})
            res.end()
        }
        else{
            pool.query(updatePass,[new_pass,uid],(err)=>{
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
    var newEmail = req.body.email
    var oldEmail = req.params.uid
    
    const changeEmail = `UPDATE users SET email = $1 WHERE user_id = $2`
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
    var uid = req.params.uid
    const deleteAcc = `DELETE FROM users WHERE user_id = $1`

    pool.query(deleteAcc,[uid],(err,result)=>{
        if(err){
            next(err)
        }
        next()
    })
}
const searchReceipts = (req,res,next)=>{
    var input = req.query.value
    var user_id = req.params.uid

    const search = `SELECT receipt_id AS price, store AS title, receipt_date AS description
                    FROM receipts
                    WHERE LOWER(receipts.store) LIKE $1 || '%'
                    AND fk_user_receipt = $2`

    pool.query(search,[input, user_id],(err,results)=>{
        if(err){
            return next(err)
        }
        res.locals.query_results = results
        next()
    })
}

var updateReceipt = (req,res,next)=>{
    //get store name --req.body
    var rid = req.params.rid
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
