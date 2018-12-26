// TypeScript file

/**
 * class name : Arrow
 * description : 弓箭
 * time : 2018.12.26
 * @author : 杨浩然
 */
class Arrow extends egret.Bitmap
{
    public speed: number = 10;

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
        var self = this;
        let time = Math.abs(Dis) / this.speed * 100;
        egret.Tween.get(this).to({ x: xPos,y: yPos }, time).call(function():void{
            egret.Tween.removeTweens(this);
            ObjectPool.instance.pushObj("arrow", this);
        },this);
    }


    public recycle()
    {
        if(this.parent)
            this.parent.removeChild(this);
    }

//class end
}