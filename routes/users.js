var express = require('express');
var router = express.Router();
var User = require('../modules/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.getUserInfoById(2, function(data) {
        res.render('users', data.result[0]);
	})
});

module.exports = router;
