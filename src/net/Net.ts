
//http请求和相应的响应函数

/**
 * fun ：回调函数
 * obj ：回调函数的this指针
 * params ：发送给服务器的参数
 */



// ===== http 请求基础代码 start =====

function post(cur_url: string, params: any, fun: Function, obj) {
    //参数转换JSON
    params = JSON.stringify(params);
    console.log(" ===== post cur_url : " + cur_url + "  params : " + params + " =====");
    var request = new egret.HttpRequest();
    request.responseType = egret.HttpResponseType.TEXT;
    request.open(cur_url, egret.HttpMethod.POST);
    //设置响应头
    request.setRequestHeader("Content-Type", "application/json");
    //发送参数
    request.send(params);
    request.addEventListener(egret.Event.COMPLETE, function (event) {
        var request2 = event.currentTarget;
        var retsult = request2.response;
        console.log(" ===== post retsult : " + retsult + " =====");
        fun.call(obj, retsult);
    }, this);
    request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
        console.error(" ***** post error ***** " + event);
    }, this);
    request.addEventListener(egret.ProgressEvent.PROGRESS, function (event) {
        console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }, this);
}

// ===== http 请求基础代码 end =====