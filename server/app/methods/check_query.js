var {getReceipts,specific_receipt} = require('../db/queries')



var check_query = (req,res,next)=>{
    var specific = req.query.specific
    if(specific){
        return specific_receipt(req,res,next)
    }
    return getReceipts(req,res,next)
}



module.exports ={
    check_query:check_query
}