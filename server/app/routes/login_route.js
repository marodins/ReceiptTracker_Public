var express = require('express');
var router = express.Router();

var {loginUser} = require('../db/queries.js')

router.post('/',loginUser);


module.exports = router;