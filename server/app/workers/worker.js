const Queue = require('bull');
var {processImage} = require('../methods/upload_route')
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const workQueue = new Queue('processImage', REDIS_URL);
 

workQueue.process( async(job, done)=>{
   return processImage(job.data, done);
})

module.exports = workQueue;