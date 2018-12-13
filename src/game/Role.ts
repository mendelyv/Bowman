/**角色类 */
class Role extends eui.Component {
	public role_img: eui.Image;
	public bubble_img: eui.Image;
	public speed: number = 5;
	public angle: number = 0;        //如果等于-100代表停止
	public xSpeed: number = 0;
	public ySpeed: number = 0;
	public radius: number = 0;      //半径

	//循环
	private tempX: number;
	private tempY: number;

	public friction: number = 0.1;     //摩擦力
	public frictionX: number = 0;
	public frictionY: number = 0;

	public constructor() {
		super();
	}
	protected createChildren() {
		this.skinName = "RoleSkin";
		this.radius = this.width;
	}
	//根据角度设置x~y轴的速率
	public moveToByAngle(angle: number): void {
		if (angle <= Math.PI) {
			this.xSpeed = Math.cos(angle) * this.speed;
			this.ySpeed = Math.sin(angle) * this.speed;
		} else if (this.angle <= Math.PI) {
			this.frictionX = Math.cos(this.angle) * this.friction;
			this.frictionY = Math.sin(this.angle) * this.friction;
			//this.xSpeed = 0;
			//this.ySpeed = 0;
		}
		this.angle = angle;

	}
	public attack():void{
		
	}
	public move(xAxis,yAxis,angle,offset): void {
		//获得速度
		// if(this.angle > Math.PI) {
		//     if(this.xSpeed == 0) {

		//     }else if(Math.abs(this.xSpeed) <= Math.abs(this.frictionX)) {
		//         this.xSpeed = 0;
		//     } else {
		//         this.xSpeed -= this.frictionX;
		//     }
		//     if(this.ySpeed == 0) {

		//     }else if(Math.abs(this.ySpeed) <= Math.abs(this.frictionY)) {
		//         this.ySpeed = 0;
		//     } else{
		//         this.ySpeed -= this.frictionY;
		//     }
		// }

		this.tempX = this.x + xAxis*this.speed;
		this.tempY = this.y + (-yAxis*this.speed);

		// console.log(this.xSpeed);
		// console.log(this.ySpeed);
		//左右碰边判断
		// if(this.tempX-this.radius > 0 && this.tempX+this.radius < this.mapWidth) {
		this.x = this.tempX;
		// } else {
		//     if(this.tempX-this.radius < 0 && this.xSpeed>0)
		//     {
		//         this.x = this.tempX;
		//     }
		//     else if(this.tempX+this.radius > this.mapWidth && this.xSpeed<0)
		//     {
		//         this.x = this.tempX;
		//     }
		//     else
		//     {
		//         this.xSpeed = 0;
		//     }
		// }

		//上下碰边判断
		// if(this.tempY-this.radius > 0 && this.tempY+this.radius < this.mapHeight) {
		this.y = this.tempY;
		// } else {
		//     if(this.tempY-this.radius < 0 && this.ySpeed>0)
		//     {
		//         this.y = this.tempY;
		//     }
		//     else if(this.tempY+this.radius > this.mapHeight && this.ySpeed<0)
		//     {
		//         this.y = this.tempY;
		//     }
		//     else
		//     {
		//         this.ySpeed = 0;
		//     }
		// }
	}
}

window["Role"] = Role;