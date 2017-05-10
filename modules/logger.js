var log4js = require('log4js');
log4js.configure({
    "appenders":
        [{
            "type"        : 'console',
            "category"    : 'console'
        }, {
            "category"    : 'error',
            "type"        : 'file',
            "filename"    : './logs/error.log',
            "maxLogSize"  : 104800,
            "backups"     : 100
    }],
    "replaceConsole"      : true,
    "levels": {
        "error"           : 'ALL',
        "console"         : 'ALL'
    }
});



var logger = {
    /**
     * @description 日志打印
     * @dateTime    2017-05-10
     * @param       {[type]}   options {
     *     type: trace/debug/info/warn/error/fatal
     *     msg: 'sdsds'
     * }
     * @return      {[type]}           [description]
     */
    error: function(options) {
        var logType = options.type ? options.type : 'info',
            logMsg  = options.msg ? options.msg : '日志错误';
        var LogFile = log4js.getLogger('error');
        LogFile[logType](logMsg);
    }
}

module.exports = logger;
