var express = require('express');
var appUsersApi = express();
var User = require('../modules/user');

appUsersApi.get('/test', function(req, res) {
	User.getUserInfoById(2, function(data) {
        res.json(data);
	})
});

module.exports = appUsersApi;
