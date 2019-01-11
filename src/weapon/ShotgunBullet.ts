// TypeScript file

/**
 * class name : ShotgunBullet
 * description : 散弹枪子弹
 * time : 2019.1.4
 * @author : 杨浩然
 */
class ShotgunBullet extends Bullet
{
    //动画
    public mc: egret.MovieClip;
    //扇形范围
    public range: number;
    //扇形角度
    public angle: number;

    private timer: egret.Timer;
    private damagedRoleID: Array<number>;

    public constructor(range: number, angle: number, time: number)
    {
        super();
        this.range = range;
        this.angle = angle;
        this.activeTime = time;
        this.timer = new egret.Timer(this.activeTime, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.lifeOut, this);
        this.timer.start();
        this.display = new egret.Bitmap(RES.getRes("shotgunBullet_png"));
        this.addChild(this.display);
        this.poolName = "shotgunBullet";
        this.damagedRoleID = new Array<number>();
    }

    public canDamage(obj: Role, startCoord: boolean = false, endCoord: boolean = false)
    {
        super.canDamage(obj, startCoord, endCoord);

        //做一个检测，防止同一个单位多次伤害
        if(this.damagedRoleID.length > 0)
            if(this.damagedRoleID.indexOf(obj.id) >= 0)
                return false;

        //如果圆形碰撞了
        if(Util.isCircleHit(obj, this, true, obj.width / 2, this.range))
        {
            //计算前的准备工作
            let obj1Point = new egret.Point(obj.x, obj.y);
            let selfPoint = new egret.Point(this.x, this.y);

            if(obj.parent) obj.parent.localToGlobal(obj.x, obj.y, obj1Point);
            if(this.parent) this.parent.localToGlobal(this.x, this.y, selfPoint);

            let l = egret.Point.distance(obj1Point, selfPoint);
            let x = obj1Point.x - selfPoint.x;
            let y = obj1Point.y - selfPoint.y;
            let theta = Math.asin(x / l) * (180 / Math.PI);//碰撞对象的坐标与扇形圆心的坐标夹角
            
            //是否补角判断
            if (y > 0) 
            {
                if (theta < 0) theta = -180 - theta;
                else theta = 180 - theta;
            }

            let limitL = this.rotation - this.angle / 2;
            let limitR = this.rotation + this.angle/ 2;
            
            if(limitL < theta && theta < limitR)
            {
                this.damagedRoleID.push(obj.id);
                return this.checkBarrier(obj, startCoord, endCoord);
            }
            else
                return false;
        }
        return false;
    }

    /** 检测障碍物
     */
    private checkBarrier(obj: Role, startCoord: boolean = false, endCoord: boolean = false)
    {
        let arr = MapManager.getLineItems(new egret.Point(this.x, this.y), new egret.Point(obj.x, obj.y), startCoord, endCoord);
        for(let i = 0; i < arr.length; i++)
        {
            let data = arr[i];
            if(MapManager.mapItems[data.row][data.col] == 1)
                return false;
        }
        return true;
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

    public destructor()
    {
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