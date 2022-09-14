var {Pool} = require('pg');

var production = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

var development = {
  connectionString: "postgresql://postgres:postgres@localhost:5432",
  ssl: false
}

var poolConfig = process.env.NODE_ENV === 'production'? production : development;
var pool = new Pool(poolConfig);

module.exports=pool
