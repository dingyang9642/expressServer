var express = require('express');
var router = express.Router();
var ToolUtil = require('../lib/tools');     // 基本工具库对象


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { ip: ToolUtil.getClientIp(req)});
});

module.exports = router;
