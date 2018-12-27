/**
 * 工具类
 */
class Util {
    // public static VERSION: string = "1.0.1";
    // public static PRO: string = "h5";
    // public static VER_CONTROL: string = "local";//控制版本模式 local本地无需登录 formal正式登录连接
    /**
     * 把秒数转换为00:00:00格式的时间
     * */
    // public static formatTime(time) {
    //     // 计算
    //     var h = 0, i = 0, s = parseInt(time);
    //     if (s > 60) {
    //         i = Math.floor(s / 60);
    //         s = Math.floor(s % 60);
    //         if (i > 60) {
    //             h = Math.floor(i / 60);
    //             i = Math.floor(i % 60);
    //         }
    //     }
    //     // 补零
    //     var zero = function (v) {
    //         return (v >> 0) < 10 ? "0" + v : v;
    //     };
    //     return [zero(h), zero(i), zero(s)].join(":");
    // }
    /**
     * 正则CI框架报警
     * */
    //public static handleCIWarning(data:string):string {
    //    var warning_msg = data.match(/<div[\s\S]*\/div>/)[0];
    //    console.log("CI WARNING:" + warning_msg);
    //    return data.replace(/<div[\s\S]*\/div>/, "");
    //}
    /**
     * 获取地址栏参数
     * */
    public static getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    /**
     * 复制对象属性
     * */
    //public static copyMembers(object1, object2){
    //    for(var key in object2){
    //        object1[key] = object2[key];
    //    }
    //}
    /**
     * 解析形如“a_11|b_33|c_44”的字符串为json对象
     * */
    //public static stringToObject(text:string):any {
    //    var array = text.split("|");
    //    var obj = {};
    //    for(var i = 0; i < array.length; i++){
    //        obj[array[i].split("_")[0]] = array[i].split("_")[1];
    //    }
    //    return obj;
    //}
    /**
     * 获取属性textFlow
     * */
    //public static getAttrTextFlow(obj:any, size:number = 26, color:number = 0xffffff, newline:boolean = true):any {
    //    var textFlow = [];
    //    for(var key in obj){
    //        textFlow.push({
    //            text: "@attr" + key + ": +" + obj[key] + (newline ? "\n" : ""),
    //            style:{"size": size, "textColor": color}
    //        });
    //    }
    //    return textFlow;
    //}
    //左右摇动作
    //public static swingAction(object:any, rotation:number):void{
    //    var cloudantion = function():void{
    //        egret.Tween.get(object).wait(10).to({rotation:-rotation},100).to({rotation:rotation},100).to({rotation:-rotation},100).
    //            to({rotation:rotation},100).to({rotation:-rotation},100).to({rotation:0},100).wait(2000).call(cloudantion);
    //    };
    //    cloudantion();
    //}
    //设置锚点且位置不变
    //    public static WWsetAnchorNopt(object:egret.DisplayObject,anchor:number):void{
    //        var deviationanchor:number = anchor - object.anchorX;
    //        var deviationdisX:number = object.width*deviationanchor;
    //        var deviationdisY:number = object.height*deviationanchor;
    //        object.anchorX = anchor;
    //        object.anchorY = anchor;
    //        object.x+=deviationdisX;
    //        object.y+=deviationdisY;
    //    }
    //云动作
    //public static cloudAction(object:any):void{
    //    var cloudantion = function():void{
    //        egret.Tween.get(object).wait(10).to({scaleX:1,scaleY:0.9},500).to({scaleX:0.9,scaleY:1},500).call(cloudantion);
    //    };
    //    cloudantion();
    //}

    //分享图片。
    //    public static requestshareUrl()
    //    {
    //        window.location.href = "resource/assets/share.png";
    //    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmap(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        // console.log("createBitmap name="+name);
        var texture: egret.Texture = RES.getRes(name);
        //if(texture) {
        result.texture = texture;
        return result;
        // }
        // return null;
    }

    /**
     * 创建九宫格缩放位图
     * @param filename
     * @param rect
     * @returns {egret.Bitmap}
     * @constructor
     */
    public static createBitmap9(filename: string, rect: egret.Rectangle = null): egret.Bitmap {
        var bitmap: egret.Bitmap = Util.createBitmap(filename);
        if (!bitmap) return null;
        if (rect) {
            bitmap.scale9Grid = rect;
        }
        else {
            bitmap.scale9Grid = new egret.Rectangle(bitmap.width * 0.4, bitmap.height * 0.4, bitmap.width * 0.1, bitmap.height * 0.1);
        }
        bitmap.fillMode = egret.BitmapFillMode.SCALE;
        return bitmap;
    }

    /**
     * 设置坐标锚点
     * @param obj
     * @param x
     * @param y
     * @constructor
     */
    public static setAnchor(obj: egret.DisplayObject, x: number = 0.5, y: number = null) {
        if (y == null) {
            obj.anchorOffsetX = obj.width * x;
            obj.anchorOffsetY = obj.height * x;
        }
        else {
            obj.anchorOffsetX = obj.width * x;
            obj.anchorOffsetY = obj.height * y;
        }
    }

    //// number数组转字符串;
    public static arrToString(arr: Array<number>, jionStr: string): string {
        var str: string = '';
        var num = arr.length;

        for (var i = 0; i < num; i++) {
            if (i == 0) {
                str = String(arr[i]);

            } else {
                str += jionStr + arr[i];
            }
        }
        return str;
    }

    /**
     * 插入新的字符串到原有的字符串中
     * @param oldStr 原有的字符串
     * @param newStr 新的字符串
     * @param pos    插入的位置
     * @returns {string}  插入后的字符串
     */
    //public static insertString(oldStr:string,newStr:string,pos:number):string
    //{
    //    return oldStr.substring(0, pos) + newStr + oldStr.substring(pos, oldStr.length);
    //}

    //// 字符串转数字数组
    public static strToArrNum(strData: string, jionStr: string): Array<number> {
        if (strData == "" || strData == null) return [];
        var arr: Array<number> = [];
        var arr2: Array<string> = Util.strToArrStr(strData, jionStr);
        var num: number = arr2.length;
        for (var i = 0; i < num; i++) {
            arr.push(Number(arr2[i]))

        }
        return arr;
    }

    /**
     * 字符串转字符串数组
     * @param strData
     * @param jionStr
     * @returns {Array<string>}
     */
    public static strToArrStr(strData: string, jionStr: string): Array<string> {
        var arr: Array<string> = strData.split(jionStr);
        return arr;
    }

    /***
     * 根据num关键字创建一个Bitmap
     * ***/
    public static createNum(resJson: string, num: number): egret.Bitmap {
        var res: egret.SpriteSheet = RES.getRes(resJson);
        var numImage: egret.Bitmap = new egret.Bitmap();
        if (numImage) {
            numImage.texture = res.getTexture("num" + num);
            return numImage;
        }
        return null;
    }

    /**
     * 解析文本里面自带的url
     * @param title 文本类容
     * @returns {string} 返回url图片地址
     */
    public static parseTxtUrl(title: string): string {
        var starIdx = title.indexOf("url=");
        var fontEnd = title.indexOf(">", starIdx);
        var str: string = title.substring(starIdx + 4, fontEnd).trim();
        var next = str.indexOf("\'", 1);
        return str.substring(1, next);
    }
    /**
     * 解析文本里面自带的img
     * @param title 文本类容
     * @returns {string} 返回img图片地址
     */
    public static parseTxtImg(title: string): Array<string> {
        //<img src=\"http://120.24.154.210:8080/images/cyhch5/map/field/103.gif\" align=\"middle\" alt=\".\" />
        var urls: Array<string> = [];
        var firstIdx: number = 0;//文本段开始位置
        var length: number = title.length;
        while (firstIdx < length) {
            var starIdx: number = title.indexOf("<img", firstIdx);
            //var starIdx:number = title.indexOf("<img src=", firstIdx);
            if (starIdx < 0) {
                firstIdx = length;
            } else {
                var fontEnd: number = title.indexOf(".", starIdx + 36);
                var url: string = "";
                if (fontEnd != -1) {
                    var extend: string = title.substring(fontEnd, fontEnd + 4);//扩展名
                    url = title.substring(starIdx + 10, fontEnd) + extend;
                    //if((title.indexOf("gif",fontEnd)!= -1)||(title.indexOf("jpg",fontEnd)!= -1))
                    //{
                    //    url = title.substring(starIdx + 10, fontEnd) + ".jpg";
                    //}
                    //if(title.indexOf("png",fontEnd)!= -1)
                    //{
                    //    url = title.substring(starIdx + 10, fontEnd) + ".png";
                    //}
                    urls.push(url.trim());
                    firstIdx = fontEnd;
                }
                //var fontEnd:number = title.indexOf("gif",starIdx);
                //var url:string="";
                //if(fontEnd != -1)
                //{
                //    url = title.substring(starIdx + 10, fontEnd) + "jpg";
                //    urls.push(url.trim());
                //    firstIdx = fontEnd;
                //    continue;
                //}
                //fontEnd = title.indexOf("jpg",starIdx);
                //if(fontEnd != -1)
                //{
                //    url = title.substring(starIdx + 10, fontEnd) + "jpg";
                //    urls.push(url.trim());
                //    firstIdx = fontEnd;
                //    continue;
                //}
                //fontEnd = title.indexOf("png",starIdx);
                //if(fontEnd != -1)
                //{
                //    url = title.substring(starIdx + 10, fontEnd) + "jpg";
                //    urls.push(url.trim());
                //    firstIdx = fontEnd;
                //    continue;
                //}
            }
        }
        return urls;
    }

    /**
     * 替换掉颜色值
     * @param oldStr  旧的颜色值
     * @param newStr  新的颜色值
     * @param con       文字内容
     * @returns {string}  替换后的文字内容
     */
    public static replaceColor(oldStr: string, newStr: string, con: string): string {
        var firstIdx: number = 0;//文本段开始位置
        var length: number = con.length;
        var tempStr: string = con;
        while (firstIdx < length) {
            var starIdx: number = tempStr.indexOf(oldStr, firstIdx);
            if (starIdx < 0) {
                firstIdx = length;
            } else {
                tempStr = tempStr.replace(oldStr, newStr);
                firstIdx = starIdx + newStr.length;
            }
        }
        return tempStr;
    }

    /***
     * 根据num关键字创建一个Bitmap
     */
    //    public static createNum2(num:number,json:string):egret.Bitmap
    //    {
    //        var res:egret.SpriteSheet = RES.getRes(json);
    //        var numImage:egret.Bitmap = new egret.Bitmap();
    //        if(numImage)
    //        {
    //
    //                numImage.texture = res.getTexture("num"+num);
    //
    //            return numImage;
    //        }
    //        return null;
    //    }


    /**
     * 创建全屏幕遮罩
     * @param color 遮罩颜色（默认黑色）
     * @param alpha 透明度（默认0.5）
     * @param stageW 屏幕宽度（默认480）
     * @param stageH 屏幕高度（默认800）
     * @returns {egret.Sprite}
     */
    public static createStageMask(color: number = 0, alpha: number = 0.5, stageW: number = 480, stageH: number = 800): egret.Shape {
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(color, alpha);
        shape.graphics.drawRect(0, 0, stageW, stageH);
        shape.graphics.endFill();
        return shape;
    }

    /**
     * 是否是手机浏览器
     * @returns {boolean}
     */
    public static isPhone(): boolean {
        return (egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE);
    }
    /**
     * 是否是android手机浏览器
     * @returns {boolean}
     */
    public static isAndroidPhone(): boolean {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('android') != -1) {
            return true;
        }
        return false;
    }

    /**
     * 获取url 里面的参数值
     * @param url
     * @param name 参数名称
     * @returns {string} 返回值
     */
    //public static getUrlPrm(url:string,name:string):string
    //{
    //    var urlString=url;
    //    if (urlString.indexOf(name) != -1) {
    //        var str = urlString.substring(urlString.indexOf(name)+name.length);
    //        if(str.indexOf("&") != -1)
    //        {
    //            return str.substring(0,str.indexOf("&"));
    //        }
    //    }
    //    return "";
    //}

    /**
     * 根据名字和属性名获取该属性的数值
     * @param result 数据数组
     * @param type  类型
     * @param key   属性名
     * @returns {any} 属性的数值
     */
    //public static getStrValueByKey(result:Array<any>,type:number,key:string):string
    //{
    //    var data:any = this.getGroupByName(result,type);
    //    return data ? data[key] : "";
    //}

    /**
     * 根据名称获取该的基础数据
     * @param result 数据数组
     * @param type  类型
     * @returns {*} 基础数据
     */
    //public static getGroupByName(result:Array<any>,type:number):any
    //{
    //    for(var i:number=0;i< result.length;i++)
    //    {
    //        var obj:any = result[i];
    //        if(obj["id"] == type.toString())
    //        {
    //            return obj;
    //        }
    //    }
    //    return null;
    //}
    public static splitStrToArray(str: string, keyChar: string): Array<string> {
        var vt: Array<string> = [];//怪物基础数据
        var count: number = 0;
        var end: boolean = false;
        var pos: number = 0;
        var countRun: number = 0;
        while (!end) {
            pos = str.indexOf(keyChar, count);
            if (pos == -1) {
                pos = str.length;
                end = true;
            }
            vt[countRun] = str.substring(count, pos);
            count = pos + keyChar.length;
            // console.log("******countRun="+countRun+"  vt[countRun]="+vt[countRun]);
            countRun++;
            if (countRun >= 50) {
                return;
            }
        }
        return vt;
    }

    /**
     * 根据标志查找多语言
     * @param sign 标示
     * @returns {any}
     */
    public static getWordBySign(sign: string): string {
        return GameConfig.WORD_CONFIG_DATA[sign];
    }
  

    /**
     * 是否空字符串
     * @param str
     * @returns {boolean}
     */
    public static isBlank(str: string): boolean {
        return str == null || str.trim().length == 0;
    }

    /**
     * 指定元素插入随机数组（前提是插入的数值在当前数组中也有）
     * @param index     要插入的位置
     * @param valueNum  要插入的数值
     * @param targetArray  当然数组
     * @returns {Array<number>}  返回随机数组
     */
    //public static randomOrderByIndex(index:number,valueNum:number,targetArray:Array<number>):Array<number>
    //{
    //    var randomArray:Array<number>= Util.randomArrayOrder(targetArray);
    //    var arrayLength:number = randomArray.length;
    //    var valueIndex:number = 0;
    //    for (var j:number = 0; j < arrayLength; j++)
    //    {
    //        if(randomArray[j] == valueNum)
    //        {
    //            valueIndex = j;
    //            break;
    //        }
    //    }
    //    var beforeNum:number = randomArray[index];
    //    var afterNum:number = randomArray[valueIndex];
    //    randomArray[index] = afterNum;
    //    randomArray[valueIndex] = beforeNum;
    //    //返回最后得出的数组
    //    return randomArray;
    //}

    /**
     * 打印输出信息
     * @param message
     * @param optionalParams
     */
    //public static logInfo(message?: any, ...optionalParams: any[]):void
    //{
    //    console.log(message,optionalParams);
    //}
    /**
     * 打印输出信息
     * @param optionalParams
     */
    public static logInfo(...optionalParams: any[]): void {
        // if (App.DebugUtils.isDebug) {
        optionalParams[0] = "[DebugLog]" + optionalParams[0];
        console.log.apply(console, optionalParams);
        // }
    }

    /**
     * 格式化时间为 天 小时 分钟 秒
     * @param time
     * @returns {string}
     */
    //public static formatTimeToWord(time:number):string
    //{
    //    var str:string = "在线";
    //    if(time != 0)
    //    {
    //        var d = new Date();
    //        d.setTime(time);
    //        if(time > 86400000)
    //        {
    //            var day:number = Math.round(time/86400000);//d.getUTCDay();
    //            if(day >0)
    //            {
    //                str = day + "天";
    //                return str;
    //            }
    //        }
    //        var hour:number = d.getUTCHours();
    //        if(hour >0)
    //        {
    //            str = hour + "小时";
    //            return str;
    //        }
    //        var minute:number = d.getUTCMinutes();
    //        if(minute >0)
    //        {
    //            str = minute + "分钟";
    //            return str;
    //        }
    //        var second:number = d.getUTCSeconds();
    //        if(second >0)
    //        {
    //            str = second + "秒";
    //            return str;
    //        }
    //        else
    //        {
    //            str = time + "秒";
    //            return str;
    //        }
    //    }
    //    return str;
    //}
    //public static GetXY(value,width,height)
    //{
    //    var x:number = 0;
    //    var y:number = 0;
    //    var xalign:string = value[0];
    //    var yalign:string = value[1];
    //    var xoffset:number = Number(value[2]);
    //    var yoffset:number = Number(value[3]);
    //    if(xalign=="left")
    //        x = 0;
    //    else if(xalign=="center")
    //        x = App.StageUtils.getWidth()*0.5-width*0.5;
    //    else
    //        x = App.StageUtils.getWidth()-width;
    //    if(yalign=="top")
    //        y = 0;
    //    else if(yalign=="middle")
    //        y = App.StageUtils.getHeight()*0.5-height*0.5;
    //    else
    //        y = App.StageUtils.getHeight()-height;
    //    x += xoffset;
    //    y += yoffset;
    //    return [x,y];
    //}

    /**
     * 获取向下取整的随机数 例如: 4.9 取到的值是4
     * @param max 最大值
     * @returns {number}
     */
    public static getRandom(max: number): number {
        var rand = Math.random() * max;
        return Math.floor(rand);
    }

    /**
     * 获取四舍五入后的随机数
     * @param max 最大值
     * @returns {number}
     */
    public static getRandomRound(max: number): number {
        var rand = Math.random() * max;
        return Math.round(rand);
    }

    /**
     * 获取最小值到最大值区间的随机数
     * @param min  最小值
     * @param max  最大值
     * @returns {number}
     */
    public static getRandomRange(min: number, max: number): number {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    }


    /**
     * 随机改变数组的排序
     * @param targetArray 原始数组
     * @returns {Array<number>}
     */
    public static randomArrayOrder(targetArray: Array<number>): Array<number> {
        var arrayLength: number = targetArray.length;
        //先创建一个正常顺序的数组
        var tempArray1: Array<number> = [];
        for (var i: number = 0; i < arrayLength; i++) {
            tempArray1[i] = i;
        }
        //
        //再根据上一个数组创建一个随机乱序的数组
        var tempArray2: Array<number> = [];
        for (var k: number = 0; k < arrayLength; k++) {
            //从正常顺序数组中随机抽出元素
            tempArray2[k] = Number(tempArray1.splice(Math.floor(Math.random() * tempArray1.length), 1));

        }
        //
        //最后创建一个临时数组存储 根据上一个乱序的数组从targetArray中取得数据
        var tempArray3: Array<number> = [];
        for (var m: number = 0; m < arrayLength; m++) {
            tempArray3[m] = targetArray[tempArray2[m]];
        }
        //
        //返回最后得出的数组
        return tempArray3;
    }


    //public static getAngle(bx,by,ex,ey):number
    //{
    //    var x = ex-bx;
    //    var y = ey-by;
    //    var angle = (Math.atan2(y,x)/Math.PI)*180;
    //    if(angle==0 || angle==180)
    //        return angle;
    //    return angle;
    //}

    //解析字符串
    //public static parseStr(srcstring, sflag)
    //{
    //    var array = new Array();
    //    var index = srcstring.indexOf(sflag);
    //    while(index>=0)
    //    {
    //        var sub = srcstring.substring(0,index);
    //        array[array.length] = sub;
    //        srcstring = srcstring.substring(index+1,srcstring.length);
    //        index = srcstring.indexOf(sflag);
    //    }
    //    if(srcstring!="")
    //        array[array.length] = srcstring;
    //    return array;
    //}

    //获取两点之间的距离
    //public static getLength(bx,by,ex,ey)
    //{
    //    var dx = ex-bx;
    //    var dy = ey-by;
    //    var len = Math.pow((dx*dx+dy*dy),0.5);
    //    return len;
    //}
    public static isHit(aimrect:egret.DisplayObject, hitrect:egret.DisplayObject,needTrans:boolean = false ,aimSeffX: number = 0, hitSeffX: number = 0): boolean//判断是否碰撞
    {
        let aimrectPoint = new egret.Point(aimrect.x,aimrect.y);
        let hitrectPoint = new egret.Point(hitrect.x,hitrect.y);
        if(needTrans)
        {
            if(aimrect.parent)
            {
                aimrect.parent.localToGlobal(aimrect.x,aimrect.y,aimrectPoint);
            }
            if(hitrect.parent)
            {
                hitrect.parent.localToGlobal(hitrect.x,hitrect.y,hitrectPoint);
            }
        }

        var aim_cx = aimrectPoint.x - aimrect.anchorOffsetX + aimSeffX + aimrect.width * 0.5;
        var aim_cy = aimrectPoint.y - aimrect.anchorOffsetY + aimrect.height * 0.5;
        var hit_cx = hitrectPoint.x - hitrect.anchorOffsetX + hitSeffX + hitrect.width * 0.5;
        var hit_cy = hitrectPoint.y - hitrect.anchorOffsetX + hitrect.height * 0.5;

        var dx = Math.abs(aim_cx - hit_cx);
        var dy = Math.abs(aim_cy - hit_cy);
        if (dx <= Math.abs(hitrect.width * 0.5 + aimrect.width * 0.5) && dy <= Math.abs(hitrect.height * 0.5 + aimrect.height * 0.5)) {
                    //    console.log(aim_cx,aim_cy,hit_cx,hit_cy,hitrect.width*0.5+aimrect.width*0.5,hitrect.height*0.5+aimrect.height*0.5)
                    //    var shp = Util.drawLineRectangle(aimrect.x+aimSeffX,aimrect.y,aimrect.width,aimrect.height);
                    //    aimrect.addChild(shp);
                    //    var shp2 = Util.drawLineRectangle(hitrect.x+hitSeffX,hitrect.y,hitrect.width,hitrect.height);
                    //    hitrect.addChild(shp2);
            return true;
        }
        return false;
    }

        /** 圆碰撞 */
    public static isCircleHit(obj1:egret.DisplayObject, obj2:egret.DisplayObject,needTrans:boolean =  false )
    {
        let obj1R = Math.sqrt(obj1.width * obj1.width + obj1.height * obj1.height);
        let obj2R = Math.sqrt(obj2.width * obj2.width + obj2.height * obj2.height);
        let obj1Point = new egret.Point(obj1.x,obj1.y);
        let obj2Point = new egret.Point(obj2.x,obj2.y);
        if(needTrans)
        {
            if(obj1.parent)
            {
                obj1.parent.localToGlobal(obj1.x,obj1.y,obj1Point);
            }
            if(obj2.parent)
            {
                obj2.parent.localToGlobal(obj2.x,obj2.y,obj2Point);
            }
        }
        let distance = egret.Point.distance(new egret.Point(obj1Point.x, obj1Point.y), new egret.Point(obj2Point.x, obj2Point.y));
        if(obj1R + obj2R > distance)
            return true;
        return false;
    }

    public static drawRectangle(x: number, y: number, width: number, height: number): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        //shp.graphics.beginFill( 0x00ff00 );
        shp.graphics.lineStyle(1, 0x00ff00);
        shp.graphics.drawRect(x, y, width, height);
        //shp.graphics.endFill();
        return shp;
    }

    /**
     * 绘制矩形框
     * @param x
     * @param y
     * @param width
     * @param height
     * @param color
     * @param lineW  线的宽度
     * @returns {egret.Shape}
     */
    public static drawLineRectangle(x: number, y: number, width: number, height: number, color: number, lineW: number = 1): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        //shp.graphics.beginFill( color );
        shp.graphics.lineStyle(lineW, color);
        shp.graphics.drawRect(x, y, width, height);
        //shp.graphics.endFill();
        return shp;
    }

    /**
     *  改变线的大小
     * @param shp
     * @param width
     * @param height
     * @param color
     * @param lineW
     */
    //public static changeLine(shp:egret.Shape,width:number,height:number,color:number=0x2e2d2d,lineW:number=1):void
    //{
    //    if(shp)
    //    {
    //        shp.graphics.clear();
    //        shp.graphics.lineStyle(lineW, color);
    //        shp.graphics.drawRect( shp.x, shp.y, width, height );
    //    }
    //}

    //    public static drawLine(lineWidth:number,startX:number,startY:number,endX:number,endY:number,color:number = 0xffffff):egret.Sprite
    //    {
    //        var dotLine:egret.Sprite = new egret.Sprite();
    //        dotLine.graphics.lineStyle(lineWidth,color);
    //        dotLine.graphics.moveTo(startX,startY);
    //        dotLine.graphics.lineTo(endX,endY);
    //        dotLine.graphics.endFill();
    //        return dotLine;
    //
    ////        var line:egret.Shape = new egret.Shape();
    ////        line.height = 2;
    ////        line.width = lineWidth;
    ////        line.x = startX;
    ////        line.y = startY;
    ////        line.graphics.beginFill(0x5f0934,1);
    ////        line.graphics.drawRect(0,0,line.width,line.height * 0.5);
    ////        line.graphics.endFill();
    ////        line.graphics.beginFill(0xb53b79,1);
    ////        line.graphics.drawRect(0,line.height * 0.5,line.width,line.height * 0.5);
    ////        line.graphics.endFill();
    ////        return line;
    //    }

    /**
     * 绘制矩形块
     * @param width
     * @param height
     * @param color
     * @param lineColor
     * @param lineWidth
     * @param alpha
     * @returns {egret.Shape}
     */
    public static drawFillR(width: number, height: number, color: number = 0,
        lineColor: number = 0xffffff, lineWidth: number = 2, alpha: number = 1): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.lineStyle(lineWidth, lineColor);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }

    /**
     * 绘制带圆周的矩形线
     * @param x
     * @param y
     * @param width
     * @param height
     * @param color
     * @param lineW
     * @param ellipseWidth
     * @param ellipseHeight
     * @returns {egret.Shape}
     */
    public static drawLineRoundRect(x: number, y: number, width: number, height: number, color: number, lineW: number = 1,
        ellipseWidth: number = 10, ellipseHeight: number = 10): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(lineW, color);
        shp.graphics.drawRoundRect(x, y, width, height, ellipseWidth, ellipseHeight);
        return shp;
    }

    /**
     * 绘制圆形
     * @param r
     * @param lineColor
     * @param lineWidth
     * @returns {egret.Shape}
     */
    public static drawCircle(r: number, lineColor: number = 0xffffff, lineWidth: number = 2): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(lineWidth, lineColor);
        shp.graphics.drawCircle(0, 0, r);
        return shp;
    }

    /**基于矩形的碰撞检测*/
    //public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
    //{
    //    var rect1:egret.Rectangle = obj1.getBounds();
    //    var rect2:egret.Rectangle = obj2.getBounds();
    //    rect1.x = obj1.x;
    //    rect1.y = obj1.y;
    //    rect2.x = obj2.x;
    //    rect2.y = obj2.y;
    //    return rect1.intersects(rect2);
    //}




    // public static isHitObject(aobject: egret.Bitmap, bobject: egret.Bitmap): boolean//判断是否碰撞
    // {
    //     var b1Rect: egret.Rectangle = aobject.getBounds();
    //     var b2Rect: egret.Rectangle = bobject.getBounds();
    //     b1Rect.x = aobject.x; b1Rect.y = aobject.y;
    //     b2Rect.x = bobject.x; b2Rect.y = bobject.y;
    //     return b1Rect.intersects(b2Rect) || b2Rect.intersects(b1Rect);
    // }
    /**判断点是否在矩形框内 */
    public static isInRect(x: number, y: number, rect: any): boolean {
        var left = rect.x;
        var top = rect.y;
        var right = left + rect.width;
        var bottom = top + rect.height;
        if (x >= left && x <= right && y >= top && y <= bottom)
            return true;
        return false;
    }

    /**
     * 夹角碰撞
     * @param ponit1 起始点
     * @param rect 要碰撞的矩形
     * @param angle  要碰撞的线的角度
     * @returns {boolean}
     */

    //public static isLineInRect1(ponit1:egret.Point,rect:any,angle:number):boolean {
    //
    //    if((ponit1.y>rect.y+rect.height))
    //    {
    //        return false;
    //    }
    //    //  var angle0:number=Math.atan2(ponit1.x-ponit2.x,ponit1.y-ponit2.y)*180/Math.PI;//要碰撞的角度
    //    var angle1:number=Math.atan2(ponit1.x-rect.x,ponit1.y-rect.y)*180/Math.PI;//和矩形左上角的角度
    //    var angle2:number=Math.atan2(ponit1.x-(rect.x+rect.width),ponit1.y-rect.y)*180/Math.PI;//要和矩形右上角的角度
    //    if(angle1<0)
    //    {
    //        angle1=-angle1-180;
    //    }
    //    if(angle2<0)
    //    {
    //        angle2=-angle2-180;
    //    }
    //    if(angle1>0)
    //    {
    //        angle1=180-angle1;
    //    }
    //    if(angle2>0)
    //    {
    //        angle2=180-angle2;
    //    }
    //    // console.log("angle="+angle+"  angle1="+angle1+"  angle2="+angle2);
    //    if(angle>=angle2&&angle<=angle1)//如果要碰撞的角度 在起始点和矩形两个左上角和右上角 组成的角度中间 就算碰撞成功
    //        return true;
    //
    //    return false;
    //
    //    /* var w:number=5;
    //     var count:number=Math.abs(ponit2.x-ponit1.x)/w;
    //     for(var i=0;i<count;i++ )
    //     {
    //     var length = Math.di
    //     var xw = -Math.sin(Math.PI*this.angle/180)*this.laserSp1.height;
    //     var yh = Math.cos(Math.PI*this.angle/180)*this.laserSp1.height;
    //     this.rotationPoint.x=this.laserSp1.x+xw;
    //     this.rotationPoint.y=this.laserSp1.y+yh;
    //     }
    //     var linePointX1:number = ponit1.x;
    //     var linePointY1:number = ponit1.y;
    //     var linePointX2:number = ponit2.x;
    //     var linePointY2:number = ponit2.x;
    //     var rectangleLeftTopX:number = rect.x;
    //     var rectangleLeftTopY:number = rect.y;
    //     var rectangleRightBottomX:number = rect.x + rect.width;
    //     var rectangleRightBottomY:number = rect.y + rect.height;*/
    //    return false;
    //}

    //public static MoveObject(oobject:any,posx:number,posy:number,angle:number):Array<number>
    //{
    //    var bound0 =  oobject.getBounds();
    //    var width  = oobject.width;
    //    var height = oobject.height;
    //    oobject.x = posx+width/2;
    //    oobject.y = posy+height/2;
    //    oobject.rotation = angle;
    //    oobject.anchorOffsetX = width/2;
    //    oobject.anchorOffsetY = height/2;
    //
    //    //angle = ((angle)/180*Math.PI);
    //    //var offxlen = Math.abs(Math.sin(angle)*width/2)+Math.abs(Math.cos(angle)*height/2);
    //    // var offylen = Math.abs(Math.cos(angle)*width/2)+Math.abs(Math.sin(angle)*height/2);
    //    //var shp = CPublic.drawRectangle(this.actorobject.x-offxlen,this.actorobject.y-offylen,2*offxlen,2*offylen);
    //
    //    var r = Math.sqrt(width/2*width/2+height/2*height/2);
    //    var dos0 = [width/2,height/2,Math.atan(height/width)];
    //    var dos1 = [-width/2,height/2,Math.atan(-height/width)];
    //    var dos2 = [-width/2,-height/2,Math.atan(height/width)];
    //    var dos3 = [width/2,-height/2,Math.atan(-height/width)];
    //    var x0 = r*Math.cos(dos0[2])*Math.cos(angle)-r*Math.sin(dos0[2])*Math.sin(angle);
    //    var y0 = r*Math.cos(dos0[2])*Math.sin(angle) + r*Math.sin(dos0[2])*Math.cos(angle);
    //
    //    var x1 = r*Math.cos(dos0[2])*Math.cos(angle)-r*Math.sin(dos0[2])*Math.sin(angle);
    //    var y1 = r*Math.cos(dos0[2])*Math.sin(angle) + r*Math.sin(dos0[2])*Math.cos(angle);
    //
    //    var x2 = r*Math.cos(dos0[2])*Math.cos(angle)-r*Math.sin(dos0[2])*Math.sin(angle);
    //    var y2 = r*Math.cos(dos0[2])*Math.sin(angle) + r*Math.sin(dos0[2])*Math.cos(angle);
    //
    //    var x3 = r*Math.cos(dos0[2])*Math.cos(angle)-r*Math.sin(dos0[2])*Math.sin(angle);
    //    var y3 = r*Math.cos(dos0[2])*Math.sin(angle) + r*Math.sin(dos0[2])*Math.cos(angle);
    //    var minx = Math.min(x0,x1,x2,x3);
    //    var miny = Math.min(y0,y1,y2,y3);
    //    var maxx = Math.max(x0,x1,x2,x3);
    //    var maxy = Math.max(y0,y1,y2,y3);
    //    //return [minx,miny,Math.abs(maxx-minx),Math.abs(maxy-miny)];
    //    return [posx+width/2-width/3,posy+height/2-height/3,width*2/3,height*2/3];
    //}

    /**
     *文本设置颜色前缀
     * @param color
     * @return
     */
    public static fontOpenTagByColor(color: number): string {
        return "<font color='" + String(color) + "'>";
    }

    /**
     *文本设置颜色后缀
     * @return
     */
    public static fontCloseTag(): String {
        return "</font>";
    }

    //全局字体颜色表--可以扩展
    public static s_colors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xfbf1af,//乳白色
        grayWhite: 0xceb6a2,//灰白色
        w_1: 0xfcfcfc,//灰白色
        gray: 0x808080,//灰色
        coffee: 0x6d0000,//咖啡色
        yellow: 0xffff00,//金黄色
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
        red: 0xf11300,//红色
        green: 0x00e500,//绿色
        blue: 0x1a94d7,//蓝色
        blue_1: 0x5083a9,//现在用的蓝色1
        blue_2: 0x00c7eb,//现在用的蓝色2
        grayBlue: 0x2f5177,//墨蓝色
        deepBlue: 0x0000ff,//深蓝色
        lightBlue: 0x002aff,//亮蓝色
        purple: 0xe938f2,//紫色
        pink: 0xFF3030,//粉色
        black: 0x252525,//黑色
        b_1: 0x373737,//黑色
        golden: 0xFFD700, //金色
        brown: 0x964B00, //褐色
        purpleGray: 0x800080 //紫色
    };

    //全局字体大小表--可以扩展
    //public static s_size = {
    //    littleSize: 12,//小型字体大小
    //    middleSize: 18,//中型字体大小
    //    normalSize: 24,//正常字体大小
    //    bigSize: 36//大型字体大小
    //};

    /**
     * 创建平常文字
     * @param text      文字内容
     * @param x         坐标X
     * @param y         坐标Y
     * @param size      尺寸
     * @param color     颜色
     * @param bold      是否是粗体
     * @param align     文本对齐方式
     * @returns {egret.TextField}
     */
    public static createText(text: string, x: number, y: number, size: number = 22, color: number = 0, bold: boolean = false,
        align: string = egret.HorizontalAlign.CENTER): egret.TextField {
        var font: egret.TextField = new egret.TextField();
        font.text = text;
        font.x = x;
        font.y = y;
        font.size = size;
        font.textColor = color;
        font.bold = bold;
        font.textAlign = align;
        return font;
    }

    /**
     * 创建帧动画
     * @param dataName 数据名称
     * @param imgName  图片名称
     * @param name     动画名称
     * @param frameRate 帧播放频率
     * @param loops    播放次数 循环播放，默认值 0
     * @param fun       回调函数
     * @param funParent 回调函数作用域
     * @returns {egret.MovieClip}
     */
    public static createMC(dataName: string, imgName: string, name: string, frameRate: number, loops: number = 0, fun: any = null, funParent: egret.DisplayObject = null):
        egret.MovieClip {
        var data: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes(dataName), RES.getRes(imgName));
        var mc: egret.MovieClip = new egret.MovieClip(data.generateMovieClipData(name));
        mc.frameRate = frameRate;
        mc.play(loops);
        if (fun != null) {
            mc.addEventListener(egret.Event.COMPLETE, fun, funParent);
        }
        return mc;
    }

    /**
     * 保存数据到本地浏览器
     * @param key
     * @param value
     */
    public static saveDataToLocal(key: string, value: string): void {
        egret.localStorage.setItem(key, value);
    }

    /**
     * 根据key获取本地浏览器数据
     * @param key
     * @returns {string}
     */
    public static getDataToLocal(key: string): string {
        return egret.localStorage.getItem(key);
    }

    /**
     * 根据key删除本地浏览器数据
     * @param key
     */
    public static removeDataToLocal(key: string): void {
        egret.localStorage.removeItem(key);
    }

    /**
     * 清空本地浏览器所有存储的数据
     */
    public static clearDataToLocal(): void {
        egret.localStorage.clear();
    }

    /**
     * 是否是微信浏览器
     * @returns {boolean}
     */
    public static isWeiXinBrowser(): boolean {
        var ua: string = navigator.userAgent.toString();
        //        alert("ua="+ua);
        var str: any = ua.match(/MicroMessenger/i);
        if (str == "MicroMessenger") {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 是否是QQ浏览器
     * @returns {boolean}
     */
    //public static isQQBrowser():boolean
    //{
    //    var u = navigator.userAgent;
    //    if(u.indexOf('QQ') > -1)
    //    {
    //        return true;
    //    }
    //    return false;
    //}
    //获取网页链接传递来的参数
    //public static GetRequestCode(msg:string,key:string) :string {
    //    var url = location.search; //获取url中"?"符后的字串
    //
    //    var ssnum:number = url.search(msg+"=");//获取url关键字
    //    var starnum:number = ssnum + msg.length + 1;//开始位置
    //    var newstr :string = "";
    //    for(var i:number = starnum ; i <= url.length - 1 ; i ++ )
    //    {
    //
    //        if(url[i] != key){
    //            Util.logInfo("url[i]--="+url[i]);
    //            newstr+= url[i];
    //            Util.logInfo("newstr--="+newstr);
    //        }else{
    //            return decodeURIComponent(newstr);
    //        }
    //    }
    //    return newstr;
    //}

    //TODO 长按识别图中二维码
    //private WWcode():void{
    //    var gameDiv = document.getElementById("gameDiv");
    //    var myImg:HTMLImageElement = document.createElement("img");
    //    myImg.src = "resource/assets/shareimg/share_code.png";
    //    myImg.style.width = "100%";
    //    myImg.style.height = "100%";
    //    myImg.style.position = "absolute";
    //    myImg.style.opacity = "0";
    //    gameDiv.appendChild(myImg);
    //}

    //    s_userName =   this.GetRequestdddd("name","?");
    //    s_userNum = Number(this.GetRequestdddd("code","?"));

    //public static GAMEOVER:boolean = false;
    //public static CHECKUSERBOOL:boolean = false;
    //public static CHECKLOGINBOOL:boolean = false;
    //public static CHECKIPBOOL:boolean = true;
    //
    //public static creataBool:boolean = false;
}
//class CPoint
//{
//    public x:number = 0;
//    public y:number = 0;
//    public constructor(x:number,y:number)
//    {
//        this.x = x;
//        this.y = y;
//    }
//}
//class CRect
//{
//    public x:number = 0;
//    public y:number = 0;
//    public width:number = 0;
//    public height:number = 0;
//    public constructor(x:number,y:number,width:number,height:number)
//    {
//        this.x = x;
//        this.y = y;
//        this.width  = width;
//        this.height = height;
//    }
//}
//class CGroundObject//地面物体对象
//{
//    public objectname:string;//物体名称
//    public objectskin:egret.Bitmap;//物体皮肤
//    public x:number = 0;//物体显示的x坐标
//    public y:number = 0;//物体显示的y坐标
//    public offsetx:number = 0;
//    public offsety:number = 0;
//    public constructor(name:string,ob:egret.Bitmap,x:number,y:number)
//    {
//        this.objectname = name;
//        this.x = x;
//        this.y = y;
//        this.objectskin  = ob;
//    }
//}
//class WWchecksystem{
//    public static Me:WWchecksystem = null;
//    public static WWgetInstance():WWchecksystem{
//        if(WWchecksystem.Me==null)
//        {
//            WWchecksystem.Me = new WWchecksystem();
//        }
//        return WWchecksystem.Me;
//    }
//
//    public WWversions(){
//        var u = navigator.userAgent;
//        //var app = navigator.appVersion;
//        return { //移动终端浏览器版本信息
//            trident: u.indexOf('Trident') > -1, //IE内核
//            presto: u.indexOf('Presto') > -1, //opera内核
//            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
//            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
//            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
//            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
//            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
//            iPad: u.indexOf('iPad') > -1, //是否iPad
//            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
//            //language: (navigator.browserLanguage || navigator.language).toLowerCase()
//        };
//    }
//}
//创建星星
//class createStart extends egret.Sprite{
//    private star:egret.Sprite;
//    private coner:number = 5;
//    private ratio:number = 2;
//    private thiswh:number = 50;
//    private color:number;
//    public constructor(coner:number,ratio:number,thiswh:number,color:number){
//        super();
//        this.coner = coner;
//        this.ratio = ratio;
//        this.thiswh = thiswh;
//        this.color = color;
//        this.createUI();
//    }
//
//    private createUI():void{
//        this.star = new egret.Sprite();
//        this.star.graphics.beginFill(this.color);
//        this.star.graphics.moveTo(this.thiswh / 2, 0);
//        for (var i = 0; i < this.coner; i++) {
//            var rad = Math.PI / this.coner * (2 * i + 1);
//            this.star.graphics.lineTo(this.thiswh/ 2 * (1 + Math.sin(rad) * this.ratio), this.thiswh / 2 * (1 - Math.cos(rad) * this.ratio));
//            rad = Math.PI / this.coner * (2 * i + 2);
//            this.star.graphics.lineTo(this.thiswh / 2 * (1 + Math.sin(rad)), this.thiswh / 2 * (1 - Math.cos(rad)));
//        }
//        this.star.graphics.endFill();
//        this.addChild(this.star);
//    }
//}
//创建渐变填充
//this.effSpr = new egret.Sprite();
////        effSpr.graphics.beginFill(0xff00ff);
////        this.effSpr.graphics.lineStyle(2,0xff00ff)
////        this.effSpr.graphics.beginGradientFill(fillType, colors, alphas, ratios, matr);
//this.effSpr.graphics.drawEllipse(0,0,50,20);
////        effSpr.graphics.drawRoundRect(0,0,this.drumArry[0].width + 30,60,60);
//this.effSpr.graphics.endFill();
//
//this.effSpr.anchorOffsetX = this.effSpr.x + this.effSpr.width * 0.5;
//this.effSpr.anchorOffsetY = this.effSpr.y + this.effSpr.height * 0.5;
//
//this.effSpr.x = 0;
//this.effSpr.y = this.thiswh * 0.5 ;
//var WW_CS:WWchecksystem = WWchecksystem.WWgetInstance();
//var WWurldata = [];
