var COMMON = require('../modules/common');
var MSGCODE = require('../conf/msgCode');

/**
 * 用户相关操作控制层
 * @type {Object}
 */
var userControl = {
	/**
	 * @description 查询用户信息时，判断用户id是否为有效id
	 * @dateTime    2017-05-15
	 * @param       {string || number}   userId [description]
	 * @return      {[type]}          [description]
	 */
    verifyUserId: function(userId) {
    	var formatResult = {};
    	if (userId) {
    		return {flag: true, result: formatResult};
    	} else {
    		formatResult = COMMON.formatResult(MSGCODE.QUERYUSER_USER_PARAMS_ILLEGAL_CODE, MSGCODE.QUERYUSER_USER_PARAMS_ILLEGAL_MSG, {});
            return {flag: false, result: formatResult};
    	}
    }
};

module.exports = userControl;