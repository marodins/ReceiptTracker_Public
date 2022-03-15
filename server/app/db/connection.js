var {Pool} = require('pg');
require('dotenv').config()

//gets all info from env variables

var production = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

var development = {
  connectionString: process.env.DATABASE_URL,
  ssl: false
}

var poolConfig = process.env.NODE_ENV === 'production'? production:development;
var pool = new Pool(poolConfig);

module.exports=pool
