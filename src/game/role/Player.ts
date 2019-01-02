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
	public relifeTimer: egret.Timer//复活倒计时时间控制器
	
	private popPanel;//复活面板
	public constructor() {
		super();
		this.attribute.speed = 5;
		this.attribute.angle = 0;
		this.id = 0;
	}

	protected createChildren() {
		this.skinName = "RoleSkin";
		this.radius = this.width;
		if (!this.attribute.hpTube) {
			this.attribute.hpTube = new HPTube(this, "HPTubeSkin");
		}
		this.attribute.maxHp = 50;
		this.attribute.hp = 50;
		this.attribute.hpTube.anchorOffsetX = this.attribute.hpTube.width * 0.5;
		this.attribute.hpTube.anchorOffsetY = this.attribute.hpTube.height * 0.5;
		this.anchorOffsetX = this.width * 0.5;
		this.anchorOffsetY = this.height * 0.5;
		this.attribute.hpTube.x = this.anchorOffsetX;
		this.attribute.hpTube.y = -37;
		this.addChild(this.attribute.hpTube);
		this.attribute.hpTube.showHp();
		this.attribute.hpTube.showHpLine();
		this.attribute.hpTube.visible = true;
	}
	//根据角度设置x~y轴的速率
	public moveToByAngle(angle: number): void {
		if (angle <= Math.PI) {
			this.xSpeed = Math.cos(angle) * this.attribute.speed;
			this.ySpeed = Math.sin(angle) * this.attribute.speed;
		} else if (this.attribute.angle <= Math.PI) {
			this.frictionX = Math.cos(this.attribute.angle) * this.friction;
			this.frictionY = Math.sin(this.attribute.angle) * this.friction;
			//this.xSpeed = 0;
			//this.ySpeed = 0;
		}
		this.attribute.angle = angle;
		this.role_img.rotation = angle * 180 / Math.PI + 90;
		this.arrow.rotation = this.role_img.rotation - 90;
	}

	public attack(): void {
		let bg = Main.instance.gameView.gameBg;
		let group = bg.arrowGroup;

		let rotations = new Array<number>();
		let tmpRot: number = this.arrow.rotation + 90;
		let mid = Math.floor(this.attribute.arrowNum / 2);//找中间的弓箭的位置
		for (let i = 0; i < this.attribute.arrowNum; i++) {
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
			arrow.damage = this.attribute.power;
			arrow.whos = WhosArrow.PLAYER;
			arrow.texture = RES.getRes(this.attribute.res);

			let point = new egret.Point();
			this.parent.localToGlobal(this.x, this.y, point);
			let targetPoint = new egret.Point();
			group.parent.globalToLocal(point.x, point.y, targetPoint);
			// group.addChild(arrow);
			arrow.index = bg.addArrow(arrow, WhosArrow.PLAYER);
			arrow.x = targetPoint.x;
			arrow.y = targetPoint.y;
			arrow.rotation = rotations[i];
			arrow.moveFrom(targetPoint.x, targetPoint.y, (arrow.rotation - 90) * Math.PI / 180, this.attribute.range);
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

		this.tempX = this.x + xAxis * this.attribute.speed;
		this.tempY = this.y + (-yAxis * this.attribute.speed);

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
		if (StageUtils.WIN_WIDTH / 2 - this.attribute.speed <= this.x && this.x <= StageUtils.WIN_WIDTH / 2 + this.attribute.speed)
			this.movableX = false;
		if (StageUtils.WIN_HEIGHT / 2 - this.attribute.speed <= this.y && this.y <= StageUtils.WIN_HEIGHT / 2 + this.attribute.speed)
			this.movableY = false;
	}

	public doDamage(damage: number) {
		super.doDamage(damage);
		if (this.attribute.hp == 0) {
			Main.instance.gameView.addMsg("'你被别人干死了");
			let reliveHint: string = Util.getWordBySign('reliveHint');
			let reliveWord: string = Util.getWordBySign('reliveWord');
			let freeRelive: string = Util.getWordBySign('freeRelive');
			if(!this.popPanel)
			{
				this.popPanel = Main.instance.crePop(reliveHint,()=>{this.onRelifeBtnClick(true);},()=>{this.onRelifeBtnClick(false);}, reliveWord, freeRelive);
			}
			//let pop: PopWindow = Main.instance.crePop(reliveHint,()=>{ this.reSatrt(),this.removeTimer();},()=>{this.removeTimer()}, reliveWord, freeRelive);

			this.creTimer();

			this.destroy();
		}
	}
	private creTimer(): void {
		this.lifeNum = new egret.Bitmap(RES.getRes('red_num' + this._lifeCount))
		this.lifeNum.x = (this.popPanel.width - this.lifeNum.width) * 0.5;
		this.lifeNum.y = this.popPanel.height * 0.2;
		this.popPanel.addChild(this.lifeNum)

		//倒计时
		this.relifeTimer = new egret.Timer(1000, 10)
		this.relifeTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this)
		this.relifeTimer.once(egret.TimerEvent.TIMER_COMPLETE,this.onTimeEnd, this)
		this.relifeTimer.start()
	}

	private onTimeEnd()
	{
		this.removeTimer();
		if (this.popPanel) {
			if (this.popPanel.parent) {
				this.popPanel.parent.removeChild(this.popPanel);
			}
		}
		this.popPanel = null;
		Main.instance.changeToMain();
	}

	private onRelifeBtnClick(isSure:boolean)
	{
		if(isSure)
		{
			//点击确定
			this.reSatrt();
		}
		else
		{
			//点击取消
		}
		this.popPanel = null;
		this.removeTimer();
	}

	private lifeNum: egret.Bitmap;
	private _lifeCount: number = 9;
	private onTimer(e: egret.TimerEvent): void {
		this._lifeCount--;
		this.lifeNum.texture = RES.getRes('red_num' + this._lifeCount)
	}

	private removeTimer(): void {
		if (this.relifeTimer) 
		{
			if(this.relifeTimer.hasEventListener(egret.TimerEvent.TIMER))
			{
				this.relifeTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this)
			}
			if(this.relifeTimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE))
			{
				this.relifeTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimeEnd,this);
			}
			this.relifeTimer = null;
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

	public reSatrt()
	{
		this.hp = this.MaxHP * 0.5;
		this.hpTube.showHp();
		this.die = false;
		this.hpTube.showHp();
	}
}

window["Player"] = Player;