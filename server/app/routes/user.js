var express = require('express');
var router = express.Router({mergeParams:true});
var {registerUser, deleteAccount} = require('../db/queries.js')
var {change_check} = require('../methods/check_which')
var check_token = require('../auth/check_token');
var {check_folder, fileUpload} = require('../methods/upload_route');
var workQueue = require('../workers/worker');

//register user
router.post('/',registerUser,(req,res,next)=>{
    if(res.locals.registercomplete){
        return res.send({message:'taken'});
    }
    res.send({message:'User registered'});
});
//modify user
router.patch('/:uid', check_token, change_check,(req,res,next)=>{
    res.send({message:"successful"})
});

//delete user
router.delete('/:uid', check_token, deleteAccount,(req,res,next)=>{
    res.send({message:"successfully-deleted"})
})
// add task to queue
router.post('/:uid/uploads', check_token, check_folder,fileUpload.single('avatar'), async (req,res,next)=>{
    const jobOptions = {
        removeOnFail:true
    };
    var jid = await workQueue.add({fileName:req.file.filename, filePath:req.file.path}, jobOptions); 


    return res.send({message:'upload complete', data:jid})
})
// check if task is complete
router.get('/:uid/uploads/:jid', check_token, async (req, res, next)=>{
    let id = req.params.jid ;
    let job = await workQueue.getJob(id);
    if(!job){
        res.status(404).end();
    }else{
        let jobState = await job.getState();
        res.send({id, data:job.returnvalue, jobState});
    }
})

module.exports = router