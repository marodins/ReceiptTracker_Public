var {changePass,changeEmail, getReceipts, searchReceipts} = require('../db/queries')

var change_check = (req,res,next)=>{
    input = req.body
    if('new_password' in input){
        return changePass(req, res, next)
    }
    if('email' in input){
        return changeEmail(req,res,next)
    }

}
var query_check = (req, res, next)=>{
    if(req.query.value === null){
        return getReceipts(req, res, next)
    }
    return searchReceipts(req, res, next)
}
module.exports = {change_check, query_check}