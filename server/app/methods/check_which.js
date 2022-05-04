var {changePass,changeEmail, getReceipts, searchReceipts, specific_receipt} = require('../db/queries')

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
    if("quantity" in req.params){
        return getReceipts(req, res, next)
    }
    if("specific" in req.params){
        return specific_receipt(req, res, next)
    }
    return searchReceipts(req, res, next)
}
module.exports = {change_check, query_check}