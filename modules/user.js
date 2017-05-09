var ToolUtil = require('../lib/tools');     // 基本工具库对象

/**
 * 用户对象
 * @type {Object}
 */
var User = {
    /**
     * @description 获取所有用户
     * @dateTime    2017-05-09
     * @return      {array}   返回用户数组列表
     */
    getAllUsers: function() {

    },
    /**
     * @description 通过用户id获取用户信息
     * @dateTime    2017-05-09
     * @param       {string}   _id 用户id
     * @return      {object}   用户信息 {ret: '0', data: {}}
     */
    getUserInfoById: function(_id) {
        return {
            "name": 'dingyang',
            "age": '27'
        };
    }
};

module.exports = User;