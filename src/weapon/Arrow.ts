// TypeScript file

/**
 * class name : Arrow
 * description : 箭
 * time : 2018.12.26
 * @author : 杨浩然
 */
class Arrow extends Bullet
{
    public display: egret.Bitmap;
    public damage: number;//伤害量
    // public id: number;//弓箭ID，使用这个变量知道这是谁发射的
    // public whos: WhosArrow = WhosArrow.NONE;//谁的弓箭
    // public index: number = -1;//在数组的下标
    public speed: number = 240;

    public constructor()
    {
        super();
        this.display = new egret.Bitmap();
        this.poolName = "arrow";
        this.activeTime = -1;
    }

    //根据弓箭id生成不同的弓箭
    public enable(arrowID: number)
    {

    }

    //喷射移动
    public moveFrom(xPos:number, yPos:number, angle:number,Dis:number):void{
        // this.isCanColliseSelf = false;
        xPos += Math.cos(angle)*Dis;
        yPos += Math.sin(angle)*Dis;
        // console.log("xPos=",xPos);
        // console.log("yPos===",yPos);
        var self = this;
        // console.log("Dis===",Dis);
        let time = Math.abs(Dis) / this.speed * 100;
        // console.log("time===",time);
        egret.Tween.get(this).to({ x: xPos,y: yPos }, time).call(function():void{
            egret.Tween.removeTweens(this);
            ObjectPool.instance.pushObj("arrow", this);
        },this);
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

    /** 检测可否造成伤害
     * @param obj ：碰撞的对象
     * @param needTrans ：是否需要转换坐标系
     */
    public canDamage(obj: Role, needTrans: boolean)
    {
        if(Util.isCircleHit(obj,this,true))
        {
            if(Util.isHit(obj,this,true))
            {
                return true;
            }
        }
        return false;
    }

    /** 箭与墙的碰撞 */
    public  isHitObstacal():boolean
    {
        let hitPoints = MapManager.getHitItem(this,[MapItemType.OBSTACAL],false);
        if(hitPoints)
        {
            for(let i = 0 ; i < hitPoints.length ; i++)
            {
                let hitPoint = hitPoints[i];
                let hitPointPos = MapManager.getMapItemPos(hitPoint.x,hitPoint.y);
                hitPointPos = Main.instance.gameView.gameBg.obstacalGroup.localToGlobal(hitPointPos.x,hitPointPos.y);
                let pos = new egret.Point(this.x,this.y);
                pos = this.parent.localToGlobal(this.x,this.y);
            
                let obj1R = Math.sqrt(this.width * this.width + this.height * this.height);
                let obj2R = Math.sqrt(MapManager.cellPix * MapManager.cellPix + MapManager.cellPix * MapManager.cellPix);

                let distance = egret.Point.distance(pos, hitPointPos);
                if(obj1R + obj2R > distance)
                {
                    let aim_cx = pos.x - this.anchorOffsetX  + this.width * 0.5;
                    let aim_cy = pos.y - this.anchorOffsetY + this.height * 0.5;
                    let hit_cx = hitPointPos.x;
                    let hit_cy = hitPointPos.y;

                    let dx = Math.abs(aim_cx - hit_cx);
                    let dy = Math.abs(aim_cy - hit_cy);
                    if (dx <= Math.abs(MapManager.cellPix * 0.5 + this.width * 0.5) && dy <= Math.abs(MapManager.cellPix * 0.5  + this.height * 0.5)) 
                    {
                        return true;
                    }
                }
            }
        }
        return false;
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