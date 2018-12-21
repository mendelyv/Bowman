// TypeScript file

/**
 * class name : Enemy
 * description : 敌人
 * time : 2018.12.21
 * @author : 杨浩然
 */
class Enemy extends eui.Component
{
    public speed: number = 5;
    public angle: number;

    public arrow: eui.Image;
	public role_img: eui.Image;
	public bubble_img: eui.Image;

    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        this.skinName = "RoleSkin";
        this.removeChild(this.arrow);
        delete this.arrow;//删除箭头
    }

    public moveToByAngle(angle: number): void {
		// if (angle <= Math.PI) {
		// 	this.xSpeed = Math.cos(angle) * this.speed;
		// 	this.ySpeed = Math.sin(angle) * this.speed;
		// } else if (this.angle <= Math.PI) {
		// 	this.frictionX = Math.cos(this.angle) * this.friction;
		// 	this.frictionY = Math.sin(this.angle) * this.friction;
		// 	//this.xSpeed = 0;
		// 	//this.ySpeed = 0;
		// }
		this.angle = angle;
		this.role_img.rotation = angle * 180 / Math.PI + 90;
	}

    public move(xPos:number, yPos:number, angle:number,Dis:number)
    {
        egret.Tween.removeTweens(this);
        let time = (Dis / this.speed) * 1000 * 0.02;
        xPos += Math.cos(angle)*Dis;
        yPos += Math.sin(angle)*Dis;
        var self = this;
        egret.Tween.get(this).to({ x: xPos,y: yPos }, time);
    }

    public attack()
    {
        let element = new ElementBase();
		let gameView = Main.instance.gameView;
		element.x = this.x;
		element.y = this.y;
		element.scaleX = element.scaleY = 0.1;
		element.WWmoveFrom(this.x, this.y, this.rotation, 2000);
		gameView.elementGroup.addChild(element);
    }

//class end
}