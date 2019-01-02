// TypeScript file

/**
 * class name : Arrow
 * description : 弓箭
 * time : 2018.12.26
 * @author : 杨浩然
 */
class Arrow extends egret.Bitmap
{
    public damage: number;//伤害量
    public id: number;//弓箭ID，使用这个变量知道这是谁发射的
    public whos: WhosArrow = WhosArrow.NONE;//谁的弓箭
    public index: number = -1;//在数组的下标
    public speed: number = 50;

    public constructor()
    {
        super();
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
        if(this.whos != WhosArrow.NONE)
        {
            switch(this.whos)
            {
                case WhosArrow.PLAYER:
                {
                    let arr = Main.instance.gameView.battleMgr.arrowsPlayer;
                    arr[this.index] = null;
                }break;

                case WhosArrow.ENEMY:
                {
                    let arr = Main.instance.gameView.battleMgr.arrowsEnemy;
                    arr[this.index] = null;
                }break;
            }
        }
    }

    public destructor()
    {
        if(this.parent)
            this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
    }

//class end
}