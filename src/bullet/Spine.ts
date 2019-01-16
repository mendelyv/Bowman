// TypeScript file

/**
 * class name : Spine
 * description : 尖刺
 * time : 2019.1.16
 * @author : 杨浩然
 */
class Spine extends Bullet
{
    public rectLong: number;//长
    public rectWid: number;//宽

    private timer: egret.Timer;
    private damagedRoleID: Array<number>;

    public constructor(long: number, width: number, time: number)
    {
        super();
        this.rectLong = long;
        this.rectWid = width;
        this.activeTime = time;
        this.startTimer(this.activeTime);
        this.display = new egret.Bitmap(RES.getRes("spine_png"));
        this.addChild(this.display);
        this.poolName = "spine";
        this.damagedRoleID = new Array<number>();
        this.tag = WeaponType.GROUNDSPINE;
    }

    public isHitObstacal(): boolean
    {
        return false;
    }

    public canDamage(obj: Role, startCoord: boolean = false, endCoord: boolean = false): boolean
    {
        //做一个检测，防止同一个单位多次伤害
        if(this.damagedRoleID.length > 0)
            if(this.damagedRoleID.indexOf(obj.id) >= 0)
                return false;

        //碰撞检测
        let rect = new egret.DisplayObject();
        rect.width = this.rectLong;
        rect.height = this.rectWid;
        rect.anchorOffsetX = rect.width / 2;
        rect.anchorOffsetY = rect.height / 2;
        rect.x = this.x;
        rect.y = this.y;
        rect.rotation = this.rotation;

        if(Util.isHit(obj, rect, false))
        {
            // if(Util.checkBarrier(this, obj, startCoord, endCoord))
            // {
                this.damagedRoleID.push(obj.id);
                return true;
            // }
        }
        return false;
    }


    public startTimer(time: number, count: number = 1)
    {
        if(this.timer)
            this.timer.delay = time;
        else
            this.timer = new egret.Timer(time, count);
        this.timer.once(egret.TimerEvent.TIMER_COMPLETE, this.lifeOut, this);
        this.timer.start();
    }


    /** 存活周期已到 */
    public lifeOut()
    {
        if(this.parent)
            this.parent.removeChild(this);

        if(this.timer)
        {
            this.timer.stop();
            if(this.timer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE))
                this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.lifeOut, this);
        }
        this.timer = null;
        ObjectPool.instance.pushObj(this.poolName, this);
    }


    public recycle()
    {
        if(this.parent)
            this.parent.removeChild(this);
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
        this.damagedRoleID = [];
    }


    public destructor()
    {
        super.destructor();
        // console.log(this.hashCode + "  destructor  ");
        if(this.parent)
            this.parent.removeChild(this);
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
        this.damagedRoleID = null;
    }



//class end
}