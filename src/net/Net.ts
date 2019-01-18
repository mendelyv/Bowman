/**
 * name : Net
 * description : net 请求
 */
// //请求签到 参数：用户openId 签到天sign
// function postSign(fun, obj, params: any) {
//     var str = GameConfig.getHeadUrl() + "/api/game/sign";
//     post(str, params, fun, obj);
// }
// //请求邀请有礼 参数：用户openId  url name
// function postInvite(fun, obj, params: any) {
//     var str = GameConfig.getHeadUrl() + "/api/game/invite";
//     post(str, params, fun, obj);
// }
// //用户存储日志 参数：token， gameId， score
// function postSaveLog(fun, obj, params: any) {
//     var str = GameConfig.getHeadUrl() + "/api/game/metric";
//     post(str, params, fun, obj);
// }
// //用户添加游戏分数 参数：token， gameId， score
// function postSaveData(fun, obj, params: any) {
//     var str = GameConfig.getHeadUrl() + "/api/game/setJson";
//     post(str, params, fun, obj);
// }
// var wxLoginUrl = GameConfig.getHeadUrl() +"/api/get";
// // var wxLoginUrl = GameConfig.getHeadUrl() + "/api/game/wxLogin";
// //登录或者注册新的微信用户 参数：code，avatar，nickName
// function postWeixinLogin(fun, obj, params: any, errorFun: Function) {
//     post(wxLoginUrl, params, fun, obj, errorFun);
// }
// //获取服务器版本 参数：
// function postServicesConfig(fun, obj, params: any) {
//     var str = GameConfig.getHeadUrl() + "/api/game/obtainConfig";
//     post(str, params, fun, obj);
// }
// ===== http 请求基础代码 start =====
/** http post 请求
 * @param cur_url ：Uniform Resource Locator
 * @param params ：请求的参数
 * @param callBack ：请求成功的回调
 * @param thisArg ：回调函数的作用域
 */
// function postWithCB(cur_url: string, params: any, callBack: Function, thisArg: any, errorFun: Function = null) {
//     //请求参数转换为JSON
//     params = JSON.stringify(params);
//     var request = new egret.HttpRequest();
//     //设置返回的数据格式为文本
//     request.responseType = egret.HttpResponseType.TEXT;
//     //初始化请求，参数详见API
//     request.open(cur_url, egret.HttpMethod.POST);
//     //给指定的HTTP请求头赋值
//     request.setRequestHeader("Content-Type", "application/json");
//     request.setRequestHeader("Cookie", NetMgr.s_cookie);
    
//     //请求返回 成功
//     request.addEventListener(egret.Event.COMPLETE, function (event) {
//         //获取响应参数
//         var responseData = event.currentTarget.response;
//         if(cur_url == wxLoginUrl)//只有微信登录才能拿到 cookie
//         {
//             NetMgr.s_cookie =  event.currentTarget.getResponseHeader('Set-Cookie');
//         }
//         console.log(" ===== post retsult : " + responseData + " =====");
//         console.log(" ===== post headData : " + NetMgr.s_cookie + " ============");
//         callBack.call(thisArg, responseData);
//     }, this);

//     //请求返回 失败
//     request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
//         console.error("post error ");
//         // let hint: string = Util.getWordBySign('networkError');
//         // TipsUtils.showTipsDownToUp(hint, true, 30, 5000);
//         // if (GameConfig.VER_CONTROL == "wechat") {
//         //     platform.hideLoading();
//         // }
//         if (errorFun) {
//             errorFun();
//         }
//     }, null);

//     //请求进度
//     // request.addEventListener(egret.ProgressEvent.PROGRESS, function (event) {
//     //     console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
//     // }, this);

//     request.send(params);
// }

/** http post 请求
 * @param url ：Uniform Resource Locator
 * @param params ：请求的参数
 */
async function post(url: string, params: any): Promise<any>
{
    return new Promise((resolve, reject) => {

        //请求参数转换为JSON
        params = JSON.stringify(params);
        var request = new egret.HttpRequest();
        //设置返回的数据格式为文本
        request.responseType = egret.HttpResponseType.TEXT;
        //初始化请求，参数详见API
        request.open(url, egret.HttpMethod.POST);
        //给指定的HTTP请求头赋值
        request.setRequestHeader("Content-Type", "application/json");
        if(NetMgr.s_cookie !== "")
            request.setRequestHeader("Cookie", NetMgr.s_cookie);

        //请求返回 成功
        request.addEventListener(egret.Event.COMPLETE, function (event) {
            //设置cookie
            let cookie = event.currentTarget.getResponseHeader("Set-Cookie");
            if(NetMgr.s_cookie === "" && cookie)
            {
                NetMgr.s_cookie = cookie;
                console.log("设置cookie:" + cookie);
            }
            //获取响应参数
            var responseData = JSON.parse(event.currentTarget.response);
            // console.log(responseData);
            resolve(responseData);
        }, this);

        //请求返回 失败
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            reject();
        }, null);

        request.send(params);
        // console.log(" ===== send message " + params + " ===== ");
    });
}
