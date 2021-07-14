var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


var cors = require('cors');
var {registerUser} = require('../db/queries.js')


router.use(cors());


router.post('/',registerUser);


module.exports = router