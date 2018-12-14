var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 闪烁类
*/
var BitmapBlink = (function () {
    /**
     * @param target 目标位图
     * @param rate 射击频率 不能低于20
     * @param time 闪啊闪的时间 -1表示循环 （单位毫秒）
     * @param call 回调方法
     */
    function BitmapBlink(target, rate, time, call) {
        if (rate === void 0) { rate = 80; }
        if (time === void 0) { time = -1; }
        this._count = 0;
        this._ordLevel = 0; //武器等级
        this._target = target;
        this._time = time;
        this._callFun = call;
        this._target.visible = false;
        this._timer = new egret.Timer(rate);
    }
    /**设置等级 */
    BitmapBlink.prototype.setLevel = function (lv) {
        this._ordLevel = lv;
    };
    /**获取武器等级 */
    BitmapBlink.prototype.getLevel = function () {
        return this._ordLevel;
    };
    BitmapBlink.prototype.start = function (ordLv) {
        if (ordLv === void 0) { ordLv = 0; }
        this._ordLevel = ordLv;
        if (!this._timer.running) {
            this._target.visible = true;
            this._currTime = egret.getTimer();
            // console.log("this._currTime = ",this._currTime);
            this._timer.start();
            // this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.runDown, this);
        }
    };
    BitmapBlink.prototype.stop = function () {
        this._target.visible = false;
        // this._target.alpha = 0;
        this._timer.stop();
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.runDown, this);
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
    };
    BitmapBlink.prototype.runDown = function (e) {
        // this._target.alpha -= 0.045;
        this._count++;
        if (this._count % 2 == 0) {
            this._target.visible = true;
        }
        else {
            this._target.visible = false;
        }
        if (this._count > 1000) {
            this._count = 0;
        }
        if (this.checkOver()) {
            return;
        }
        // if (this._target.alpha <= 0.6) {
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        // this._target.addEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
        // }
    };
    // private runUp(e: egret.Event): void {
    //     this._target.alpha += 0.045;
    //     if (this.checkOver()) {
    //         return;
    //     }
    //     if (this._target.alpha >= 1) {
    //         this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
    //         this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
    //     }
    // }
    BitmapBlink.prototype.checkOver = function () {
        if (this._time == -1) {
            return false;
        }
        var nowTime = egret.getTimer();
        // console.log("nowTime = ",nowTime);
        if (nowTime - this._currTime >= this._time) {
            this.destroy();
            return true;
        }
        return false;
    };
    BitmapBlink.prototype.destroy = function () {
        // this._target.alpha = 1;
        this._timer.stop();
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.runDown, this);
        this._timer = null;
        // console.log("this.timer",this._timer);
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
        if (this._callFun) {
            this._callFun();
        }
        this._target = null;
    };
    return BitmapBlink;
}());
__reflect(BitmapBlink.prototype, "BitmapBlink");
