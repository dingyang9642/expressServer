var express = require('express');
var appUsersApi = express();
var User = require('../modules/user');

appUsersApi.get('/test', function(req, res) {
    res.json(User.getUserInfoById('001'));
});

module.exports = appUsersApi;
