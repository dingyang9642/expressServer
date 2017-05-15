var ToolUtil = require('../lib/tools');     // 基本工具库对象
var LOGGER = require('./logger');
var COMMON = require('./common');
var MSGCODE = require('../conf/msgCode');
var DB = require('./db');     // 基本工具库对象

/**
 * 用户对象
 * @type {Object}
 */
var User = {
    /**
     * @description 用户信息校验
     * @dateTime    2017-05-12
     * @param       {[type]}   userInfo [description]
     * @return      {Boolean}           [description]
     */
    isLegalUserIno: function(userInfo) {
        var formatResult = {};
        if (userInfo.name ==='') {
            LOGGER.error({type: 'error', msg: 'user username is empty'});
            formatResult = COMMON.formatResult(MSGCODE.ADDUSER_USERNAME_EMPTY_CODE, MSGCODE.ADDUSER_USERNAME_EMPTY_MSG, {});
            return {flag: false, result: formatResult};
        }
        if (userInfo.password ==='') {
            LOGGER.error({type: 'error', msg: 'user password is empty'});
            formatResult = COMMON.formatResult(MSGCODE.ADDUSER_PASSWORD_EMPTY_CODE, MSGCODE.ADDUSER_PASSWORD_EMPTY_MSG, {});
            return {flag: false, result: formatResult};
        }
        if (userInfo.phone ==='') {
            LOGGER.error({type: 'error', msg: 'user phone is empty'});
            formatResult = COMMON.formatResult(MSGCODE.ADDUSER_PHONE_EMPTY_CODE, MSGCODE.ADDUSER_PHONE_EMPTY_MSG, {});
            return {flag: false, result: formatResult};
        }
        return {flag: true, result: formatResult};
    },
    /**
     * @description 用户添加操作
     * @dateTime    2017-05-11
     * @param       {object}   options  用户相关信息
     * @param       {Function} callback 回调函数
     */
    addUser: function(options, callback) {
        var defaultOptions = {
            name     : '',     // *必填，用户名 string
            password : '',     // *必填，密码 string
            realname : '',     // 选填，用户名 string
            type     : 0,      // 选填，用户类型 int
            sex      : 0,      // 选填，性别 int
            age      : 0,      // 选填，年龄 int
            email    : '',     // 选填，邮箱 string
            phone    : '',     // *必填，手机 string
            address  : '',     // 选填，地址 string
            flag     : 1       // 选填，默认1，启用状态 int
        };
        var newOptions = ToolUtil.extend(defaultOptions, options);
        // 一、校验异常
        var verifyResult = this.isLegalUserIno(newOptions);
        if (!verifyResult.flag) {
            callback && callback(verifyResult.result);
            return;
        }
        // 二、异常校验通过
        var newOptionsKeysAndValues = ToolUtil.getKeysAndValues(newOptions),
            keys = newOptionsKeysAndValues.keys.join(','),
            values = ToolUtil.array2str(newOptionsKeysAndValues.values, ',', true);
        var sql = "insert into users(" + keys + ") values(" + values + ")";
        DB.insert(sql, function(data) {
            callback && callback(data);
        });
    },
    
    /**
     * @description 通过用户id删除用户【非物理删除，实际执行update操作】
     * @dateTime    2017-05-11
     * @param       {int}   _id         用户id
     * @param       {Function} callback 回调函数
     */
    deleteUserById: function(_id, callback) {
        var sql = "update users set flag=-1 where id=" + _id;
        DB.update(sql, function(data) {
            callback && callback(data);
        });
    },

    /**
     * @description 获取所有用户
     * @dateTime    2017-05-09
     * @return      {array}   返回用户数组列表
     */
    getAllUsers: function(callback) {
        var sql = "select * from users";
        DB.select(sql, function(data) {
            callback && callback(data);
        });
    },
    /**
     * @description 通过用户id获取用户信息
     * @dateTime    2017-05-09
     * @param       {string}   _id 用户id
     * @return      {object}   用户信息 {ret: '0', data: {}}
     */
    getUserInfoById: function(_id, callback) {
        var self = this;
        var sql = "select * from users where id=" + _id;
        DB.select(sql, function(data) {
            // 统一返回格式
            var newData = self.formatUserInfoData(data);
            callback && callback(newData);
        });
    },
    /**
     * @description 与getUserInfoById函数关联，对返回数据格式进行处理
     * @dateTime    2017-05-15
     * @param       {object}   data getUserInfoById函数接收的查询返回数据
     * @return      {object}        格式化后的数据
     */
    formatUserInfoData: function(data) {
        var formatResult = {};
        if (data.resultCode === '0') {
            // 说明查询正确
            if (data.result.length === 0) {
                formatResult = COMMON.formatResult(MSGCODE.QUERYUSER_USER_NOT_EXIT_CODE, MSGCODE.QUERYUSER_USER_NOT_EXIT_MSG, {});
            } else {
                formatResult = COMMON.formatResult(data.resultCode, data.resultMsg, data.result[0]);
            }
        } else {
            // 说明查询异常
            formatResult = COMMON.formatResult(data.resultCode, data.resultMsg, {});
        }
        return formatResult;
    }
};

module.exports = User;