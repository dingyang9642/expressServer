/**
 * 基本操作工具对象
 * @type {Object}
 */
var ToolUtil = {
    /**
     * @description 判断是否为字符串类型并且字符串为空
     * @dateTime    2017-05-12
     * @param       {[type]}   str [description]
     * @return      {Boolean}      [description]
     */
    isEmptyString: function(str) {
        return (typeof str === 'string' && str !== '') ? true : false;
    },
    /**
     * @description 获取json数据的keys数组和对应values数组，只支持以及json {a: 1, b: 2} 不支持{a:{},b:2}
     * @dateTime    2017-05-10
     * @param       {object}   obj 原始json对象
     * @return      {object}       {keys: [], values: []}
     */
    getKeysAndValues: function(obj) {
    	var result = {
            keys: [],
            values: []
    	};
        for(var key in obj) {
            result.keys.push(key);
            result.values.push(obj[key]);
        }
        return result;
    },

    /**
     * @description 数据中数据合并，只针对数组中每一项为值类型数据，如string int数据
     * @dateTime    2017-05-11
     * @param       {array}    arr            数组
     * @param       {string}   separator      指定要使用的分隔符
     * @param       {Boolean}  isHoldDataType 是否保留原始数据类型？['a', 1] return "'a',1" 或者"a,1"
     * @return      {string}                  返回数据
     */
    array2str: function(arr, separator, isHoldDataType) {
        if (isHoldDataType) {
            // 保留原有数据类型
            var arrLength = arr.length;
            var resultStr = "";
            for (var i = 0; i < arrLength; i++) {
                (i > 0) && (resultStr+=separator);
                var tmpItem = arr[i];
                var tmpItemDataType = (typeof tmpItem);
                var newItem = (tmpItemDataType === 'string') ? "'" + tmpItem + "'" : tmpItem;
                resultStr+=newItem;
            }
            return resultStr;
        }
        return arr.join(separator);
    },
    /**
	 * 对象合并【待完善】
	 * @param  {object} originalObject 默认json对象数据
	 * @param  {object} ownObject      用户自定义对象
	 * @return {object}                合并之后的返回对象
	 */
    extend: function (originalObject, ownObject) {
        // 1、进行json对象深拷贝
        var _originalObject = this.deepCopy(originalObject, {});
        var _ownObject = this.deepCopy(ownObject, {});
        // 2、循环合并
        for (var key in _ownObject) {
            _originalObject[key] = _ownObject[key];
        }
        return _originalObject;
    },

    /**
     * 深拷贝
     * @param  {object} p 需要拷贝的对象
     * @param  {object} c 拷贝目标对象类型【[] || {}】
     * @return {object}   深拷贝之后的返回对象
     */
    deepCopy: function (p, c) {
        c = c || {};
        for (var i in p) {
        　　if (typeof p[i] === 'object') {
        　　　　c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
        　　} else {
        　　　　　c[i] = p[i];
        　　}
        }
        return c;
    }
};

module.exports = ToolUtil;