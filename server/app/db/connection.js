var {Pool} = require('pg');
require('dotenv').config()

//gets all info from env variables
var pool = new Pool({
  ssl: process.env.NODE_ENV ==="production"
});

module.exports=pool
