var {Pool} = require('pg');
require('dotenv').config()

//gets all info from env variables
var pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports=pool
