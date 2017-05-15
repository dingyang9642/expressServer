var express = require('express');
var appUsersApi = express();
var UserControl = require('../control/user');
var User = require('../modules/user');

// 添加用户
appUsersApi.get('/addUser', function(req, res) {
	User.addUser({}, function(data) {
        res.json(data);
	})
});
// 根据id查询用户信息
appUsersApi.get('/getUserInfoById', function(req, res) {
	// 1、获取请求参数
	var userId = req.query.id;
	// 2、判断参数是否合法
	var isLegalUserId = UserControl.verifyUserId(userId);
	if (!isLegalUserId.flag) {
		res.json(isLegalUserId.result); return;
	}
	// 3、执行查询请求
	User.getUserInfoById(userId, function(data) {
        res.json(data);
	})
});

module.exports = appUsersApi;
