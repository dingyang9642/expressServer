var express = require('express');
var appIndexApi = express();


appIndexApi.get('/test', function(req, res) {
    res.json({
        "name": 'dingyang',
        "age": '27'
    });
});

module.exports = appIndexApi;
