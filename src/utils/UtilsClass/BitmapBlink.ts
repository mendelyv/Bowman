/**
* 闪烁类
*/
class BitmapBlink {
    private _target: egret.DisplayObject;
    private _time: number;
    private _currTime: number;
    private _callFun: any;
    private _count: number = 0;
    private _timer: egret.Timer;
    private _ordLevel: number = 0; //武器等级
    /**
     * @param target 目标位图
     * @param rate 射击频率 不能低于20
     * @param time 闪啊闪的时间 -1表示循环 （单位毫秒）
     * @param call 回调方法
     */
    public constructor(target: egret.DisplayObject, rate: number = 80, time: number = -1, call?: any) {
        this._target = target;
        this._time = time;
        this._callFun = call;
        this._target.visible = false;
        this._timer = new egret.Timer(rate);
      
    }
    /**设置等级 */
    public setLevel(lv:number):void{
        this._ordLevel = lv;
    }
    /**获取武器等级 */
    public getLevel():number{
        return this._ordLevel;
    }

    public start(ordLv: number = 0): void {
        this._ordLevel = ordLv;
        if (!this._timer.running) {
            this._target.visible = true;
            this._currTime = egret.getTimer();
            // console.log("this._currTime = ",this._currTime);
            
            this._timer.start();
            // this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.runDown, this);
        }
    }
    public stop(): void {
        this._target.visible = false;
        // this._target.alpha = 0;
        this._timer.stop();
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.runDown, this);
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        // this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
    }
    private runDown(e: egret.Event): void {
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
    }

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

    private checkOver(): boolean {
        if (this._time == -1) {
            return false;
        }
        var nowTime: number = egret.getTimer();
        // console.log("nowTime = ",nowTime);
        if (nowTime - this._currTime >= this._time) {
            this.destroy();
            return true;
        }
        return false;
    }

    public destroy(): void {
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
    }
}