
//http请求和相应的响应函数
// ===== http 请求基础代码 start =====
//获取服务器版本 参数：
function postServicesConfig(fun, obj, params: any) {
    var str = GameConfig.getHeadUrl() + "/api/config";
    post(str, params, fun, obj);
}
//登录或者注册新的微信用户 参数：code，avatar，nickName
function postWeixinLogin(fun, obj, params: any, errorFun: Function) {
    var str = GameConfig.getHeadUrl() + "/api/get";
    post(str, params, fun, obj, errorFun);
}

/**
 * fun ：回调函数
 * obj ：回调函数的this指针
 * params ：发送给服务器的参数
 */
function post(cur_url: string, params: any, fun: Function, obj, errorFun: Function = null) {
    //拼接参数
    // params = "p1=postP1&p2=postP2";
    var request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    // request.open("http://httpbin.org/post",egret.HttpMethod.POST);
    request.open(cur_url, egret.HttpMethod.POST);
    //设置响应头
    // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-Type", "application/json");
    //发送参数
    request.send(params);
    // console.log("******************post cur_url=" + cur_url + "  params=" + params);
    request.addEventListener(egret.Event.COMPLETE, function (event) {
        // var data=eval("("+urlloader.data+")");
        var request2 = event.currentTarget;
        var retsult = request2.response;
        //   retsult = decodeURI(retsult);//没有这一步中文会乱码
        //   decodeURIComponent()
        // console.log("******************post retsult=   " + retsult);
        fun.call(obj, retsult);
    }, this);
    request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
        // var data=eval("("+urlloader.data+")");
        console.error("post error ");
        let hint: string = Util.getWordBySign('networkError');
        TipsUtils.showTipsDownToUp(hint, true, 30, 5000);
        if (GameConfig.VER_CONTROL == "wechat") {
            platform.hideLoading();
        }
        if (errorFun) {
            errorFun();
        }
    }, this);
    request.addEventListener(egret.ProgressEvent.PROGRESS, function (event) {
        // var data=eval("("+urlloader.data+")");
        // console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }, this);
}

// ===== http 请求基础代码 end =====