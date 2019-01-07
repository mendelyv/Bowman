// TypeScript file

/**
 * class name : ShotgunBullet
 * description : 散弹枪子弹
 * time : 2019.1.4
 * @author : 杨浩然
 */
class ShotgunBullet extends egret.DisplayObjectContainer
{
    //动画
    public mc: egret.MovieClip;
    public bit: egret.Bitmap;
    //存活时间
    public activeTime: number;
    //扇形范围
    public range: number;
    //扇形角度
    public angle: number;

    private timer: egret.Timer;

    public constructor(range: number, angle: number, time: number)
    {
        super();
        this.range = range;
        this.angle = angle;
        this.activeTime = time;
        this.timer = new egret.Timer(this.activeTime, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.destructor, this);
        this.timer.start();
        this.bit = new egret.Bitmap(RES.getRes("shotgunBullet_png"));
        this.addChild(this.bit);
    }


    public destructor()
    {
        if(this.parent)
            this.parent.removeChild(this);

        if(this.timer)
        {
            this.timer.stop();
            if(this.timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE))
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.destructor, this);
        }
        this.timer = null;
    }

//class end
}