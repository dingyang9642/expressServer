var express = require('express');
var router = express.Router();
var COMMON = require('../modules/common');     // 基本工具库对象


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { ip: COMMON.getClientIp(req)});
});

module.exports = router;
