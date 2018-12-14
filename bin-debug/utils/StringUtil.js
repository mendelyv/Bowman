var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *字符串的相关处理
 */
var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.dump = function (array) {
        var s = "";
        var a = "";
        for (var i = 0; i < array.length; i++) {
            if (i % 16 == 0)
                s += ("0000" + i.toString(16)).substring(-4, 4) + " ";
            if (i % 8 == 0)
                s += " ";
            var v = array[i];
            s += ("0" + v.toString(16)).substring(-2, 2) + " ";
            //a += (v < 32 || v > 126)?".":string.fromCharCode(v);
            if (((i + 1) % 16) == 0 || i == (array.length - 1)) {
                s += " |" + a + "|\n";
                a = "";
            }
        }
        return s;
    };
    //是否有效
    StringUtil.isUsage = function (value) {
        if (value == undefined || value == null || StringUtil.trim(value) == "") {
            return false;
        }
        return true;
    };
    //去收尾空格
    StringUtil.trim = function (str) {
        if (str == undefined || str == null) {
            return null;
        }
        return str.trim();
    };
    /**
     * 随机数
     * @param start 最小数
     * @param end   最大数
     * @returns {number}
     */
    StringUtil.randomRange = function (start, end) {
        if (end === void 0) { end = 0; }
        return Math.floor(start + (Math.random() * (end - start)));
    };
    /**
     * 格式化字符串(金钱，如：100,000,000)
     * @param value
     * @param hasSign 是否带符号
     * @return "xx,xxx"
     *
     */
    StringUtil.changToMoney = function (value, hasSign) {
        if (hasSign === void 0) { hasSign = false; }
        var i = 0;
        var count = 0;
        var str = "";
        if (hasSign) {
            if (value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57) {
                value = "+" + value;
            }
        }
        for (i = value.length - 1; i >= 0; i--) {
            str = value.charAt(i) + str;
            if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) {
                if (value.charCodeAt(i - 1) >= 48 && value.charCodeAt(i - 1) <= 57) {
                    count++;
                    if (count == 3) {
                        str = "," + str;
                        count = 0;
                    }
                }
            }
            else {
                count = 0;
            }
        }
        return str;
    };
    /**
     * 统计子串在字符串中得数目
     * @param subString 字串
     * @param source 源字符串
     * @return
     *
     */
    StringUtil.getMatchesCount = function (subString, source) {
        var count = 0;
        var lastIndex = source.lastIndexOf(subString);
        var currentIndex = source.indexOf(subString);
        if (currentIndex == lastIndex && lastIndex >= 0) {
            return 1;
        }
        else if (currentIndex != lastIndex && lastIndex >= 0) {
            ++count;
            while (currentIndex != lastIndex) {
                currentIndex = source.indexOf(subString, currentIndex + subString.length - 1);
                if (currentIndex != -1) {
                    ++count;
                }
            }
        }
        return count;
    };
    /**
     * 当数字超过10000时，转化为“万”的描述
     * @param value 数据
     * @return 目标字符串
     *
     */
    StringUtil.changeIntToText = function (value) {
        if (value === void 0) { value = 0; }
        var str = "";
        if (value >= 10000) {
            str += Math.ceil(value / 10000).toFixed(0) + "万";
        }
        else if (value < 0) {
            str += "0";
        }
        else {
            str += value.toFixed(0);
        }
        return str;
    };
    /**
     * 当数字超过1000时，金钱单位，每1000进位K、M、B、C、D、E
     * @param value 数据
     * @return 目标字符串
     *
     */
    StringUtil.changeToUnitGold = function (value) {
        if (value === void 0) { value = 0; }
        var takeLength = 4; //所有的显示都是小数点后3位
        var str = "";
        if (value >= 1000000000000000000000000) {
            str += (value / 1000000000000000000000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "G";
            return str;
        }
        else if (value >= 1000000000000000000000) {
            str += (value / 1000000000000000000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "F";
            return str;
        }
        else if (value >= 1000000000000000000) {
            str += (value / 1000000000000000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "E";
            return str;
        }
        else if (value >= 1000000000000000) {
            str += (value / 1000000000000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "D";
            return str;
        }
        else if (value >= 1000000000000) {
            str += (value / 1000000000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "C";
            return str;
        }
        else if (value >= 1000000000) {
            str += (value / 1000000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "B";
            return str;
        }
        else if (value >= 1000000) {
            str += (value / 1000000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "M";
            return str;
        }
        else if (value >= 1000) {
            str += (value / 1000);
            str = StringUtil.subStringBitByLength(str, takeLength) + "K";
            return str;
        }
        else if (value < 0) {
            str += "0";
        }
        else {
            str += value;
        }
        return str;
    };
    /**
     * 根据需要的字符长度来截取字符串
     */
    StringUtil.subStringBitByLength = function (str, takeLength) {
        if (takeLength === void 0) { takeLength = 4; }
        var starIdx = str.indexOf(".");
        var fontEnd = str.length;
        if (str.length >= takeLength) {
            fontEnd = starIdx + takeLength;
        }
        str = str.substring(0, fontEnd).trim();
        return str;
    };
    /**
     * 根据字符串来解析金币
     */
    StringUtil.parseValueG = function (value) {
        var str = value;
        var fontEnd = value.length;
        var word = str.substring(fontEnd - 1, fontEnd).trim();
        var num = Number(str.substring(0, fontEnd - 1).trim());
        if (word == "K" || word == "k") {
            return num * 1000;
        }
        else if (word == "M" || word == "m") {
            return num * 1000000;
        }
        else if (word == "B" || word == "b") {
            return num * 1000000000;
        }
        else if (word == "C" || word == "c") {
            return num * 1000000000000;
        }
        else if (word == "D" || word == "d") {
            return num * 1000000000000000;
        }
        else if (word == "E" || word == "e") {
            return num * 1000000000000000000;
        }
        else if (word == "F" || word == "f") {
            return num * 1000000000000000000000;
        }
        else if (word == "G" || word == "g") {
            return num * 1000000000000000000000000;
        }
        return num;
    };
    /**
     * 将16进制颜色值转换为html类型(即html类型的)
     * 16进制类型的颜色值
     * @return 返回html类型的颜色值
     */
    StringUtil.convertColor2Html = function (color) {
        if (color === void 0) { color = 0; }
        var colorHtml = "#000000";
        var colorTemp = "";
        try {
            colorTemp = color.toString(16);
            while (colorTemp.length < 6) {
                colorTemp = "0" + colorTemp;
            }
            colorHtml = "#" + colorTemp;
        }
        catch (err) {
        }
        return colorHtml;
        //            var result:Boolean = false;
        //            //支持十进制、十六进制
        //            if(value.indexOf("0x")==0 && ("0x" + ToString(parseInt(value).toString(16), value.length - 2, "0")) == value.toLowerCase()){
        //                result = true;
        //            }
        //            else if(ToString(parseInt(value).toString(), value.length, "0") == value){
        //                result = true;
        //            }else{
        //                result = false;
        //            }
        //            return result;
    };
    /**
     *对字符串中的特殊字符进行转义
     * @param value 包含特殊字符的串
     * @return 转义后的新字符串
     *
     */
    StringUtil.htmlESC = function (value) {
        if (value == null || StringUtil.trim(value) == "") {
            return null;
        }
        else {
            var ampPattern = /&/g;
            var ltPattern = /</g;
            var gtPattern = />/g;
            value = value.replace(ampPattern, "&amp;"); //该条必须在第一行
            value = value.replace(ltPattern, "&lt;");
            value = value.replace(gtPattern, "&gt;");
            return value;
        }
    };
    /**
     *关键词过滤 将关键字替换成***
     * @param value 需要进行关键词过滤的字符串
     * @return  关键词替换成***后的新字符串
     *
     */
    StringUtil.keywordFiltration = function (value) {
        if (value == null || StringUtil.trim(value) == "") {
            return null;
        }
        else {
            value = value.replace("你大爷", "***");
            value = value.replace("尻", "***");
            value = value.replace("二胡", "***");
            return value;
        }
    };
    /**
     * 把数字替换成数组
     * @param value 待替换成字符数组的数值
     * @return 数字字符数组
     */
    StringUtil.replaceNumberToArray = function (value) {
        var numVector = new Array();
        var str = value.toString();
        var len = str.length;
        for (var i = 0; i < len; i++) {
            numVector.push(str.charAt(i));
        }
        return numVector;
    };
    /**
     * 字符串替换
     * @param content
     * @param src
     * @param target
     * @return
     *
     */
    StringUtil.replace = function (content, src, target) {
        if (!StringUtil.isUsage(content))
            return "";
        while (content.indexOf(src) >= 0)
            content = content.replace(src, target);
        return content;
    };
    StringUtil.splitStrArr = function (str, split) {
        var result = [];
        if (StringUtil.isUsage(str)) {
            var sd = str.split(split);
            for (var i = 0; i < sd.length; i++) {
                if (StringUtil.isUsage(sd[i])) {
                    result.push(sd[i]);
                }
            }
        }
        return result;
    };
    StringUtil.isPhone = function (str) {
        //var regu ="/(^\([1-9]{3}\)[1-9]{3}(-\d{4})?$)" +
        //    "|(^\([1-9]{3}\)\s[1-9]{3}(-\d{4})?$)" +
        //    "|(^([1-9]{3}\s\/\s[1-9]{3}(-\d{4}))?$)" +
        //    "|(^([1-9]{3}-[1-9]{3}(-\d{4}))?$)" +
        //    "|(^([1-9]{3}\s[1-9]{3}(\s\d{4}))?$)" +
        //    "|(^\d{10}$)/";
        //var regu = "^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}";
        //var regu = "1[1-9][0-9]{9}";
        //var re = new RegExp(regu);
        //if (re.test( str )) {
        //    //alert(str+"true");
        //    return true;
        //}
        if (StringUtil.isUsage(str) && str.length == 11) {
            var num = parseInt(str);
            if (("" + num) == str) {
                return true;
            }
        }
        return false;
    };
    /**
     * 格式化时间
     * @param timer
     * @param format
     * @returns {string}
     */
    StringUtil.formatTime = function (timer, format) {
        if (format === void 0) { format = "00:00"; }
        var str = "";
        var minute = Math.floor(timer / 60);
        if (minute < 10) {
            str = "0" + minute;
        }
        else {
            str = "" + minute;
        }
        str += ":";
        var second = Math.floor(timer % 60);
        if (second < 10) {
            str += "0" + second;
        }
        else {
            str += "" + second;
        }
        return str;
    };
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    StringUtil.prototype.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    StringUtil.prototype.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    StringUtil.prototype.isChinese = function (str) {
        var reg = /^[u4E00-u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    };
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
