var ToolUtil = require('../lib/tools');     // 基本工具库对象
var LOGGER = require('./logger');
var DB = require('./db');     // 基本工具库对象
/**
 * 用户对象
 * @type {Object}
 */
var User = {
    /**
     * @description 用户添加操作
     * @dateTime    2017-05-11
     * @param       {object}   options  用户相关信息
     * @param       {Function} callback 回调函数
     */
    addUser: function(options, callback) {
        var defaultOptions = {
            name     : 'test', // *必填，用户名 string
            password : 'test', // *必填，密码 string
            realname : 'test', // 选填，用户名 string
            type     : 0,      // 选填，用户类型 int
            sex      : -1,     // 选填，性别 int
            age      : 27,     // 选填，年龄 int
            email    : 'test', // 选填，邮箱 string
            phone    : 'test', // 选填，手机 string
            address  : 'test', // 选填，地址 string
            flag     : 1       // 选填，默认1，启用状态 int
        };
        var newOptions = ToolUtil.extend(defaultOptions, options);
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
        var sql = "select * from users where id=" + _id;
        DB.select(sql, function(data) {
            callback && callback(data);
        });
    }
};

module.exports = User;