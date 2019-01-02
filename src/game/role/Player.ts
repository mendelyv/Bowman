// TypeScript file/**玩家类 */


class Player extends Role {
	public movableX: boolean = false;
	public movableY: boolean = false;

	public arrow: eui.Image;
	public role_img: eui.Image;
	public bubble_img: eui.Image;
	public xSpeed: number = 0;
	public ySpeed: number = 0;
	public radius: number = 0;      //半径
	// public range: number = 300;//射程

	//循环
	private tempX: number;
	private tempY: number;

	public friction: number = 0.1;//摩擦力
	public frictionX: number = 0;
	public frictionY: number = 0;

	public constructor() {
		super();
		this.speed = 5;
		this.angle = 0;
		this.id = 0;
	}

	protected createChildren() {
		this.skinName = "RoleSkin";
		this.radius = this.width;
		if (!this.hpTube) {
			this.hpTube = new HPTube(this, "HPTubeSkin");
		}
		this.maxHp = 70;
		this.hp = 70;
		this.hpTube.anchorOffsetX = this.hpTube.width * 0.5;
		this.hpTube.anchorOffsetY = this.hpTube.height * 0.5;
		this.anchorOffsetX = this.width * 0.5;
		this.anchorOffsetY = this.height * 0.5;
		this.hpTube.x = this.anchorOffsetX;
		this.hpTube.y = -37;
		this.addChild(this.hpTube);
		this.hpTube.showHp();
		this.hpTube.showHpLine();
		this.hpTube.visible = true;
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
		this.role_img.rotation = angle * 180 / Math.PI + 90;
		this.arrow.rotation = this.role_img.rotation - 90;
	}

	public attack(): void {
		if(this.die)
		{
			return;
		}
		let bg = Main.instance.gameView.gameBg;
		let group = bg.arrowGroup;

		let rotations = new Array<number>();
		let tmpRot: number = this.arrow.rotation + 90;
		let mid = Math.floor(this.ability.arrowNum / 2);//找中间的弓箭的位置
		for (let i = 0; i < this.ability.arrowNum; i++) {
			let times = Math.abs(mid - i);
			if (i < mid) rotations.push(tmpRot - 15 * times);
			else if (i > mid) rotations.push(tmpRot + 15 * times);
			else rotations.push(tmpRot);
		}
		if (mid % 2 == 0)//如果是偶数再偏一次
		{
			for (let i = 0; i < rotations.length; i++) {
				rotations[i] += 15 / 2;
			}
		}
		for (let i = 0; i < rotations.length; i++) {
			let arrow: Arrow = ObjectPool.instance.getObj("arrow");
			arrow.id = this.id;
			arrow.damage = this.ability.power;
			arrow.whos = WhosArrow.PLAYER;
			arrow.texture = RES.getRes(this.ability.res);

			let point = new egret.Point();
			this.parent.localToGlobal(this.x, this.y, point);
			let targetPoint = new egret.Point();
			group.parent.globalToLocal(point.x, point.y, targetPoint);
			// group.addChild(arrow);
			arrow.index = bg.addArrow(arrow, WhosArrow.PLAYER);
			arrow.x = targetPoint.x;
			arrow.y = targetPoint.y;
			arrow.rotation = rotations[i];
			arrow.moveFrom(targetPoint.x, targetPoint.y, (arrow.rotation - 90) * Math.PI / 180, this.ability.range);
		}

	}

	public move(xAxis, yAxis, angle, offset): void {

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

		this.tempX = this.x + xAxis * this.speed;
		this.tempY = this.y + (-yAxis * this.speed);

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
		this.verifyLimit();
	}

	private verifyLimit() {
		if (StageUtils.WIN_WIDTH / 2 - this.speed <= this.x && this.x <= StageUtils.WIN_WIDTH / 2 + this.speed)
			this.movableX = false;
		if (StageUtils.WIN_HEIGHT / 2 - this.speed <= this.y && this.y <= StageUtils.WIN_HEIGHT / 2 + this.speed)
			this.movableY = false;
	}

	public doDamage(damage: number) {
		super.doDamage(damage);
		if (this.hp == 0) {
			Main.instance.gameView.showGameEndReLife();
			this.destroy();
		}
	}

	public levelUp() {
		super.levelUp();
		Main.instance.gameView.showSkills();
	}

	public addExp(expValue: number)
	{
		super.addExp(expValue);
		Main.instance.gameView.showPlayerLvExp();
	}

	public reLife()
	{
		this.hp = this.MaxHP * 0.5;
		this.hpTube.showHp();
		this.die = false;
		this.hpTube.showHp();
	}
}

window["Player"] = Player;