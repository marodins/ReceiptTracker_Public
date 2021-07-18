var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var {loginUser} = require('../db/queries.js')

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


router.post('/',loginUser);


module.exports = router;