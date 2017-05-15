/**
 * 项目相关提示信息配置
 * @type {Object}
 */
var MSG_CODE = {
    // 数据库相关描述
    DBERROR_SUCCESS_CODE                : "0",
    DBERROR_SUCCESS_MSG                 : "SUCCESS",
    DBERROR_CONNECTION_CODE             : "1000",
    DBERROR_CONNECTION_MSG              : "数据库连接失败",
    DBERROR_TABLE_NOTEXIT_CODE          : "1001",
    DBERROR_TABLE_NOTEXIT_MSG           : "数据表不存在",
    DBERROR_DATA_FORMAT_CODE            : "1002",
    DBERROR_DATA_FORMAT_MSG             : "数据格式错误",
    DBERROR_DATA_FIELD_CODE             : "1003",
    DBERROR_DATA_FIELD_MSG              : "数据字段错误",
    DBERROR_OTHER_CODE                  : "1004",
    DBERROR_OTHER_MSG                   : "其他错误",
    // 添加用户相关      
    ADDUSER_USERNAME_EMPTY_CODE         : "2000",
    ADDUSER_USERNAME_EMPTY_MSG          : "用户名为空",
    ADDUSER_PASSWORD_EMPTY_CODE         : "2001",
    ADDUSER_PASSWORD_EMPTY_MSG          : "密码为空",
    ADDUSER_PHONE_EMPTY_CODE            : "2002",
    ADDUSER_PHONE_EMPTY_MSG             : "手机号为空",
    // 通过用户ID获取用户信息
    QUERYUSER_USER_PARAMS_ILLEGAL_CODE  : "2100",
    QUERYUSER_USER_PARAMS_ILLEGAL_MSG   : "参数有误",
    QUERYUSER_USER_NOT_EXIT_CODE        : "2101",
    QUERYUSER_USER_NOT_EXIT_MSG         : "用户不存在"

};

module.exports = MSG_CODE;