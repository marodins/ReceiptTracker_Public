var {Pool} = require('pg');
require('dotenv').config()

//gets all info from env variables
var pool = new Pool();

module.exports=pool