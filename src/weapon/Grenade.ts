// TypeScript file

/**
 * class name : Grenade
 * description : 手雷
 * time : 2019.1.11
 * @author : 杨浩然
 */
class Grenade extends Bullet
{
    public range: number;//范围
    public countDown: number;//倒计时
    public speed: number;
    public damageRange: number;
    
    private active: boolean;
    private timer: egret.Timer;
    private damagedRoleID: Array<number>;

    public constructor(range: number, damageRange: number, countDown: number, speed: number)
    {
        super();
        this.range = range;
        this.countDown = countDown;
        this.speed = speed;
        this.damageRange = damageRange;
        this.display = new egret.Bitmap();
        this.poolName = "grenade";
        this.display = new egret.Bitmap(RES.getRes("grenade_png"));
        this.addChild(this.display);

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        
        this.active = false;
        this.timer = new egret.Timer(this.countDown, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.countDownCB, this);
        this.damagedRoleID = new Array<number>();
    }

    //喷射移动
    public moveFrom(xPos: number, yPos: number, angle: number, Dis: number)
    {
        // this.isCanColliseSelf = false;
        xPos += Math.cos(angle) * Dis;
        yPos += Math.sin(angle) * Dis;
        // console.log("xPos=",xPos);
        // console.log("yPos===",yPos);
        var self = this;
        // console.log("Dis===",Dis);
        let time = Math.abs(Dis) / this.speed * 100;
        // console.log("time===",time);
        egret.Tween.get(this).to({ x: xPos,y: yPos }, time).call(function():void{
            egret.Tween.removeTweens(this);
            this.timer.start();
        },this);
    }


    public canDamage(obj: Role, startCoord: boolean = false, endCoord: boolean = false)
    {
        if(!this.active) return;

        //做一个检测，防止同一个单位多次伤害
        if(this.damagedRoleID.length > 0)
            if(this.damagedRoleID.indexOf(obj.id) >= 0)
                return false;

        if(Util.isCircleHit(obj, this, true, obj.width / 2, this.damageRange))
        {
            this.damagedRoleID.push(obj.id);
            return true;
        }

    }


    public recycle()
    {
        if(this.parent)
            this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        if(this.whos != WhosBullet.NONE)
        {
            switch(this.whos)
            {
                case WhosBullet.PLAYER:
                {
                    let arr = Main.instance.gameView.battleMgr.bulletsPlayer;
                    arr[this.index] = null;
                }break;

                case WhosBullet.ENEMY:
                {
                    let arr = Main.instance.gameView.battleMgr.bulletsEnemy;
                    arr[this.index] = null;
                }break;
            }
        }
    }


    private countDownCB()
    {
        this.active = true;

        if(this.timer)
        {
            this.timer.stop();
            if(this.timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE))
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.countDownCB, this);
        }
        this.timer = null;

        //TODO：播放动画，然后回收
        egret.Tween.get(this).to({alpha: 1}, 500).call(()=>{
            ObjectPool.instance.pushObj(this.poolName, this);
        });
    }

    public destructor()
    {
        super.destructor();
        if(this.parent)
            this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
    }

//class end
}