var express = require('express');
var appCommonApi = express();


appCommonApi.get('/test', function(req, res) {
    res.json({
        "name": 'dingyang',
        "age": '27'
    });
});

module.exports = appCommonApi;
