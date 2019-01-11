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
        // this.myDrawRect();
        let shp = Util.drawLineRectangle(this.x, this.y, 10, 28, 0xff0000, 2);
        this.addChild(shp);
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
    public canDamage(obj: Role)
    {
        super.canDamage(obj);
        if(Util.isCircleHit(obj,this,true))
        {
            if(Util.isHit(obj,this,true))
            {
                return true;
            }
        }
        return false;
    }

    // ===== test code start =====
    /** 画一个矩形 */
    public myDrawRect()
    {
        let shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawRect(this.x, this.y, 10, 28);
        shape.graphics.endFill();
        this.addChild(shape);
    }
    // ===== test code end =====

    public destructor()
    {
        super.destructor();
        if(this.parent)
            this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
    }

//class end
}