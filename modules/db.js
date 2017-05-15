var LOGGER = require('./logger');
var COMMON = require('./common');
var APPCONFIG = require('../conf/conf');
var MSGCODE = require('../conf/msgCode');

var mysql = require('mysql');
var pool  = mysql.createPool({
    host       : APPCONFIG.DB.HOST,
    user       : APPCONFIG.DB.USER,
    password   : APPCONFIG.DB.PASS,
    database   : APPCONFIG.DB.DATABASE,
    port       : APPCONFIG.DB.PORT
});

/**
 * 数据库操作对象
 * @type {Object}
 */
var DB = {
    /**
     * @description 数据库操作异常处理并返回相应数据
     * @dateTime    2017-05-11
     * @param       {object}   err 返回异常对象
     * @return      {object}       返回格式化数据
     */
    getDBQueryErrorResult: function(err) {
        var self = this;
        var formatResult = {};
        switch (err.code) {
            case 'ER_NO_SUCH_TABLE':
                LOGGER.error({type: 'fatal', msg: 'database table not exit'});
                formatResult = COMMON.formatResult(MSGCODE.DBERROR_TABLE_NOTEXIT_CODE, MSGCODE.DBERROR_TABLE_NOTEXIT_MSG, {});
            break;
            case 'ER_PARSE_ERROR':
                LOGGER.error({type: 'fatal', msg: 'database ER_PARSE_ERROR'});
                formatResult = COMMON.formatResult(MSGCODE.DBERROR_DATA_FORMAT_CODE, MSGCODE.DBERROR_DATA_FORMAT_MSG, {});
            break;
            case 'ER_BAD_FIELD_ERROR':
                LOGGER.error({type: 'fatal', msg: 'database ER_BAD_FIELD_ERROR'});
                formatResult = COMMON.formatResult(MSGCODE.DBERROR_DATA_FIELD_CODE, MSGCODE.DBERROR_DATA_FIELD_MSG, {});
            break;
            default:
                LOGGER.error({type: 'fatal', msg: 'database ER_OTHER_ERROR'});
                formatResult = COMMON.formatResult(MSGCODE.DBERROR_OTHER_CODE, MSGCODE.DBERROR_OTHER_MSG, {});
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
                var formatResult = COMMON.formatResult(MSGCODE.DBERROR_CONNECTION_CODE, MSGCODE.DBERROR_CONNECTION_MSG, {});
                callback(formatResult);
            } else {
                conn.query(sql, function(err, values, fields) {
                    conn.release(); // 释放连接
                    var formatResult = {};
                    if (err) {
                        formatResult = self.getDBQueryErrorResult(err);
                    } else {
                        var resultData = values;
                        formatResult = COMMON.formatResult(MSGCODE.DBERROR_SUCCESS_CODE, MSGCODE.DBERROR_SUCCESS_MSG, resultData);
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