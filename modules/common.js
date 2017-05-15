/**
 * 业务层级公共部分
 * @type {Object}
 */
var COMMON = {
    /**
     * @description 执行数据格式化操作
     * @dateTime    2017-05-10
     * @param       {string}   status 状态码
     * @param       {string}   msg    状态描述文案
     * @param       {void}   result   数据
     * @return      {object}          返回json数据
     */
    formatResult: function(status, msg, result) {
        return {
            resultCode: status,
            resultMsg: msg,
            result: result
        };
    },
    /**
     * @description 获取客户端ip地址
     * @dateTime    2017-05-12
     * @param       {object}   req request请求对象
     * @return      {string}       ip地址
     */
    getClientIp: function(req) {
        return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    }
};

module.exports = COMMON;