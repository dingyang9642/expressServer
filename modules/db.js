var LOGGER = require('./logger');
var APPCONFIG = require('../conf/conf');
var mysql = require('mysql');
var pool  = mysql.createPool({
    host       : APPCONFIG.DB.HOST,
    user       : APPCONFIG.DB.USER,
    password   : APPCONFIG.DB.PASS,
    database   : APPCONFIG.DB.DATABASE,
    port       : APPCONFIG.DB.PORT
});
// 声明数据库相关错误状态码描述
var DBERROR_CONNECTION_CODE = "1000",
    DBERROR_CONNECTION_MSG  = "数据库连接失败";
// 定义数据库统一返回格式
var DB_RESULT = {
    resultCode: "0",
    resultMsg: "Success",
    result: {} // 此处可随意定义数据类型
};
/**
 * 数据库操作对象
 * @type {Object}
 */
var DB = {
    /**
     * @description 执行数据库返回数据格式化操作
     * @dateTime    2017-05-10
     * @param       {string}   status 状态码
     * @param       {string}   msg    状态描述文案
     * @param       {void}   result   数据
     * @return      {object}          返回json数据
     */
    formatDBResult: function(status, msg, result) {
        return {
            resultCode: status,
            resultMsg: msg,
            result: result
        };
    },

    /**
     * @description 执行数据库相关操作
     * @dateTime    2017-05-10
     * @param       {string}   sql      数据库sql语句操作
     * @param       {Function} callback 回调函数
     * @return      {void}              无
     */
    query: function(sql, callback) {
        var self = this;
        pool.getConnection(function(err, conn) {
            if(err) {
                LOGGER.error({type: 'fatal', msg: 'connection database fail'});
                var formatResult = self.formatDBResult(DBERROR_CONNECTION_CODE, DBERROR_CONNECTION_MSG);
                callback(formatResult);
            } else {
                conn.query(sql, function(qerr, vals, fields) {
                    conn.release();                    // 释放连接
                    // var formatResult = self.formatDBResult();
                    callback(qerr, vals, fields);      // 事件驱动回调
                });
            }
        });
    }
};

module.exports = DB;