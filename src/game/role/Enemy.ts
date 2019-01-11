// TypeScript file

/**
 * class name : Enemy
 * description : 敌人
 * time : 2018.12.21
 * @author : 杨浩然
 */
class Enemy extends Role {
    // public birthPoint: egret.Point;
    public enemys: Array<Enemy>;//可以攻击的目标
    // public range: number = 300;//射程

    private ai: EnemyAI;
    public get AI(): EnemyAI { return this.ai; }
    private nav: SilzAstar;//a*导航
    private pathQueue: Array<SilzAstarNode>;//导航的路径
    private pathIndex: number = 0;//导航点队列的下标
    private moveTween: egret.Tween;//移动的tween动作
    private endTarget: egret.Point;//终点，这里存放一个主要是为了看下次导航的点是否相同

    //攻击控制
    private previousFrameTime: number = 0;
    private shootTime: number = 0;
    private shootDelay: number = 1000;

    public constructor() {
        super();
        //this.attribute.speed = 2.5;
        this.ai = new EnemyAI(this);
        this.weapon = new Bow(this);
        this.ai.attackRadius = this.weapon.range;
    }

    public initNav(): void {
        if (MapManager.mapItems) {
            if (MapManager.mapItems.length != 0) {
                if (!this.nav) {
                    this.nav = new SilzAstar(MapManager.mapItems);
                }
            }
            if (!this.pathQueue) {
                this.pathQueue = new Array<SilzAstarNode>();
            }
        }
    }

    protected createChildren() {
        this.skinName = "RoleSkin";
        this.role_img.source = "role_"+Util.getRandomRange(0,8)+"_png"
        this.anchorOffsetX = this.width *0.5;
        this.anchorOffsetY = this.height *0.5;
        this.removeChild(this.arrow);
        delete this.arrow;//删除箭头
        this.ai.start();

        //给敌人添加血条
        if (!this.hpTube) {
            this.hpTube = new HPTube(this, "HPTubeSkin");
        }
        // this.attribute.hpMax = 80;
        // this.attribute.hp = 80;
        this.hpTube.anchorOffsetX = this.hpTube.width * 0.5;
        this.hpTube.anchorOffsetY = this.hpTube.height * 0.5;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.hpTube.x = this.anchorOffsetX;
        this.hpTube.y = -17;
        this.addChild(this.hpTube);
        this.hpTube.showHp();
        this.hpTube.showNickName();
       // this.hpTube.showHpLine();
        this.hpTube.visible = true;

        //知道自己的敌人是谁
        this.enemys = Main.instance.gameView.battleMgr.enemys;
        // this.enemys.push(Main.instance.gameView.player);

        this.attribute.level = 1;
        this.setBaseAttOfLevel();
    }
    /** 转向 */
    public moveToByAngle(angle: number): void {
        this.attribute.angle = angle;
        this.role_img.rotation = angle * 180 / Math.PI + 90;
    }

    /** 移动
     * @param xPos ：起点x
     * @param yPos ：起点y
     * @param angle ：移动的角度
     * @param Dis ：移动的距离
     */
    public move(xPos: number, yPos: number, angle: number, Dis: number) {
        egret.Tween.removeTweens(this);
        let time = (Dis / this.getSpeed()) * 1000 * 2;
        xPos += Math.cos(angle) * Dis;
        yPos += Math.sin(angle) * Dis;
        var self = this;
        egret.Tween.get(this).to({ x: xPos, y: yPos }, time);
    }

    public moveOfPath() {
        if (this.pathQueue.length <= 0) return;
        let point = this.pathQueue[this.pathIndex];
        if (!point) {
            this.pathQueue = [];
            this.pathIndex = 1;//从1开始，忽略掉起点
            if (this.moveTween) {
                this.moveTween.pause();
                egret.Tween.removeTweens(this.moveTween);
            }
            egret.Tween.removeTweens(this);
            this.moveTween = null;
            return;
        }
        let target = MapManager.getMapItemPos(point.y, point.x);
        let dis = egret.Point.distance(new egret.Point(this.x, this.y), target);
        let time = (dis / this.getSpeed()) * 1000 * 2;
        this.moveTween = egret.Tween.get(this).to({ x: target.x, y: target.y }, time)
            .call(function () {
                this.pathIndex++;
                this.moveOfPath();
            }, this);
    }

    /** 停止移动并清空路径队列，置空目标
     * @param needSetTargetNull ：是否需要置空目标
     */
    public stopMove(needSetTargetNull: boolean = true) {
        if (!this.moveTween) return;
        this.pathQueue = [];
        this.pathIndex = 1;//从1开始，忽略掉起点
        if (this.moveTween) {
            this.moveTween.pause();
            egret.Tween.removeTweens(this.moveTween);
        }
        egret.Tween.removeTweens(this);
        this.moveTween = null;
        if (needSetTargetNull)
            this.target = null;
    }

    /** 攻击 */
    public attack() {
        this.weapon.attack(1);
    }

    /** 追寻 */
    public follow() {
        if (!this.target) return;
        let start = MapManager.getRowColOfMap(new egret.Point(this.x, this.y));
        let end = MapManager.getRowColOfMap(new egret.Point(this.target.x, this.target.y), true);

        //判断这次导航的目的地是否跟上次一样，如果一样就跳出
        if (this.endTarget)
            if (end == this.endTarget)
                return;
        this.endTarget = end;

        if (this.moveTween)//如果有tween代表正在追寻，所以需要
        {
            this.pathQueue = [];
            this.pathIndex = 1;//从1开始，忽略掉起点
            if (this.moveTween) {
                this.moveTween.pause();
                egret.Tween.removeTweens(this.moveTween);
            }
            egret.Tween.removeTweens(this);
            this.moveTween = null;
        }

        this.initNav();
        let pathQueue = this.nav.find(start.y, start.x, end.y, end.x);
        if (!pathQueue) return;

        this.pathQueue = pathQueue;
        this.moveOfPath();
    }

    /** 去一个点 */
    public gotoPoint(target: egret.Point) {
        let start = MapManager.getRowColOfMap(new egret.Point(this.x, this.y));
        let end = MapManager.getRowColOfMap(new egret.Point(target.x, target.y), true);

        //判断这次导航的目的地是否跟上次一样，如果一样就跳出
        if (this.endTarget)
            if (end == this.endTarget)
                return;
        this.endTarget = end;

        this.stopMove();
        this.initNav();
        let pathQueue = this.nav.find(start.y, start.x, end.y, end.x);
        if (!pathQueue) return;

        this.pathQueue = pathQueue;
        this.moveOfPath();
    }

    /** 能不能去 */
    public canGoto(target: egret.Point): boolean
    {
        let start = MapManager.getRowColOfMap(new egret.Point(this.x, this.y));
        let end = MapManager.getRowColOfMap(new egret.Point(target.x, target.y), true);
        this.initNav();
        let pathQueue = this.nav.find(start.y, start.x, end.y, end.x);
        if(!pathQueue) return false;
        else return true;
    }

    public lookAtTarget()
    {
        let targetPoint = new egret.Point(this.target.x, this.target.y);
        if(this.target.parent != this.parent)
            this.parent.globalToLocal(targetPoint.x, targetPoint.y, targetPoint);
        //两个直角三角形直角边
        let x = targetPoint.x - this.x;
        let y = -(targetPoint.y - this.y);
        //斜边
        let l = egret.Point.distance(new egret.Point(this.x, this.y), new egret.Point(targetPoint.x, targetPoint.y));
        let sinTheta = x / l;
        let theta = Math.asin(sinTheta) * 180 / Math.PI;
        //判断在哪个象限，即为判断转动角是否是补角
        if (y < 0) {
            if (theta < 0) theta = -180 - theta;
            else theta = 180 - theta;
        }
        this.moveToByAngle(0);//首先回正人物图像
        this.moveToByAngle((theta - 90) * Math.PI / 180);
    }

    public levelUp()
    {
        // 敌人暂时不做升级
        // super.levelUp();
        // this.setBaseAttOfLevel();
       
        this.getOneRandomSkill();
    }

    public getOneRandomSkill()
    {
        let skillArr = this.getRandomSkills();
        if(skillArr.length == 0)
        {
            //没有技能了
        }
        else{
            let skill = skillArr[0];
            switch(skill.skillType)
            {
                case WeaponType.NONE:
                    this.attribute.enable(skill.skill);
                    break;
                case WeaponType.BOW:
                case WeaponType.SHOTGUN:
                    this.weapon.enableSkill(skill.skill);
                    break;
            }
        }
    }

    public getSkillsOfLv()
    {
        if(this.attribute.level == 1)
        {
            //一级的技能
        }   
        else
        {
            let count = this.attribute.level - 1;
            for(let i = 0;i < count;++i)
            {
                this.getOneRandomSkill();
            }
        }
    }

	//根据角色等级设置基础属性
	public setBaseAttOfLevel()
	{	
		let index = this.attribute.level;
		let enemyConfig = GameConfig.enemyConfig["enemy"][index.toString()];
		if(enemyConfig)
		{
			this.attribute.exp = 0;
			this.attribute.expMax = enemyConfig.experience;
			this.attribute.speed = enemyConfig.speed;
			this.attribute.power = enemyConfig.power;
			let lastHpMax = this.attribute.HpMax;
			this.attribute.HpMax = enemyConfig.hp;

			//设置当前血量
			let resumeValue = this.attribute.HpMax - lastHpMax;
			this.resumeBlood(resumeValue,true);
		}
		else
		{
			console.log("setBaseAttOfLevel error");
		}
	}

    public destroy() {
        super.destroy();
        ObjectPool.instance.pushObj("enemy", this);

        Main.instance.gameView.mapMgr.pushEnemyToArr(egret.getTimer());
    }



    public recycle()
    {
        this.ai.stop();
    }

    public reset()
    {
        this.ai.start();
        this.attribute.clearAllSkills();
        let lvMin = Main.instance.gameView.player.attribute.level - 1;
        if(lvMin<0)
        {
            lvMin = 0;
        }
        let lvMax = Main.instance.gameView.player.attribute.level + 1;
        this.attribute.level = Util.getRandomRange(lvMin,lvMax);
        this.getSkillsOfLv();
        this.setBaseAttOfLevel();

        this.attribute.hp = this.attribute.HpMax;
        this.hpTube.showHp();
        
        this.die = false;
        this.attribute.totalExp = 0;
        this.nickName = Main.instance.gameView.enemyMgr.randomEnemyName();
        this.hpTube.showNickName();
    }

    public destructor()
    {
        this.ai.stop();
    }
    //class end
}