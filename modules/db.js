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
var DBERROR_SUCCESS_CODE       = "0",
    DBERROR_SUCCESS_MSG        = "SUCCESS";
var DBERROR_CONNECTION_CODE    = "1000",
    DBERROR_CONNECTION_MSG     = "数据库连接失败";
var DBERROR_TABLE_NOTEXIT_CODE = "1001",
    DBERROR_TABLE_NOTEXIT_MSG  = "数据表不存在";
var DBERROR_DATA_FORMAT_CODE   = "1002",
    DBERROR_DATA_FORMAT_MSG    = "数据格式错误";
var DBERROR_DATA_FIELD_CODE    = "1003",
    DBERROR_DATA_FIELD_MSG     = "数据字段错误";
var DBERROR_OTHER_CODE         = "1004",
    DBERROR_OTHER_MSG          = "其他错误";

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
     * @description 数据库操作异常处理并返回相应数据
     * @dateTime    2017-05-11
     * @param       {object}   err 返回异常对象
     * @return      {object}       返回格式化数据
     */
    getDBQueryErrorResult: function(err) {
        var self = this;
        var formatResult = {};
        console.log(err.code);
        switch (err.code) {
            case 'ER_NO_SUCH_TABLE':
                LOGGER.error({type: 'fatal', msg: 'database table not exit'});
                formatResult = self.formatDBResult(DBERROR_TABLE_NOTEXIT_CODE,DBERROR_TABLE_NOTEXIT_MSG, {});
            break;
            case 'ER_PARSE_ERROR':
                LOGGER.error({type: 'fatal', msg: 'database ER_PARSE_ERROR'});
                formatResult = self.formatDBResult(DBERROR_DATA_FORMAT_CODE, DBERROR_DATA_FORMAT_MSG, {});
            break;
            case 'ER_BAD_FIELD_ERROR':
                LOGGER.error({type: 'fatal', msg: 'database ER_BAD_FIELD_ERROR'});
                formatResult = self.formatDBResult(DBERROR_DATA_FIELD_CODE, DBERROR_DATA_FIELD_MSG, {});
            break;
            default:
                LOGGER.error({type: 'fatal', msg: 'database ER_OTHER_ERROR'});
                formatResult = self.formatDBResult(DBERROR_OTHER_CODE, DBERROR_OTHER_MSG, {});
            break;
        }
        return formatResult;
    },
    /**
     * @description 数据库sql执行
     * @dateTime    2017-05-11
     * @param       {sting}   type      数据库操作类型insert/update/delete/select
     * @param       {string}   sql      执行sql语句
     * @param       {Function} callback 相应回调函数
     * @return      {void}              无
     */
    query: function(type, sql, callback) {
        var self = this;
        pool.getConnection(function(err, conn) {
            if(err) {
                LOGGER.error({type: 'fatal', msg: 'database connection failed'});
                var formatResult = self.formatDBResult(DBERROR_CONNECTION_CODE, DBERROR_CONNECTION_MSG, {});
                callback(formatResult);
            } else {
                conn.query(sql, function(err, values, fields) {
                    conn.release(); // 释放连接
                    var formatResult = {};
                    if (err) {
                        formatResult = self.getDBQueryErrorResult(err);
                    } else {
                        var resultData = values;
                        formatResult = self.formatDBResult(DBERROR_SUCCESS_CODE, DBERROR_SUCCESS_MSG, resultData);
                    }
                    callback(formatResult);      // 事件驱动回调
                });
            }
        });
    },
    /**
     * @description 执行数据库增删改查相关操作
     * @dateTime    2017-05-10
     * @param       {string}   sql      数据库sql语句操作
     * @param       {Function} callback 回调函数
     * @return      {void}              无
     */
    insert: function(sql, callback) {
        var self = this;
        self.query('insert', sql, callback);
    },
    delete: function(sql, callback) {
        var self = this;
        self.query('delete', sql, callback);       
    },
    update: function(sql, callback) {
        var self = this;
        self.query('update', sql, callback);       
    },
    select: function(sql, callback) {
        var self = this;
        self.query('select', sql, callback);       
    }
};

module.exports = DB;