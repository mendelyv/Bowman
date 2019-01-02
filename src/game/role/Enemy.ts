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
    public arrow: eui.Image;
    public role_img: eui.Image;
    public bubble_img: eui.Image;
    public target: Role;//追寻的目标
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
        this.attribute.speed = 2.5;
        this.ai = new EnemyAI(this);
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
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.removeChild(this.arrow);
        delete this.arrow;//删除箭头
        this.ai.start();

        //给敌人添加血条
        if (!this.attribute.hpTube) {
            this.attribute.hpTube = new HPTube(this, "HPTubeSkin");
        }
        this.attribute.maxHp = 80;
        this.attribute.hp = 80;
        this.attribute.hpTube.anchorOffsetX = this.attribute.hpTube.width * 0.5;
        this.attribute.hpTube.anchorOffsetY = this.attribute.hpTube.height * 0.5;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.attribute.hpTube.x = this.anchorOffsetX;
        this.attribute.hpTube.y = -17;
        this.addChild(this.attribute.hpTube);
        this.attribute.hpTube.showHp();
        this.attribute.hpTube.showHpLine();
        this.attribute.hpTube.visible = true;

        //知道自己的敌人是谁
        this.enemys = Main.instance.gameView.battleMgr.enemys;
        // this.enemys.push(Main.instance.gameView.player);
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
        let time = (Dis / this.attribute.speed) * 1000 * 0.02;
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
        let time = (dis / this.attribute.speed) * 1000 * 0.02;
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
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;

        let group, arrow: Arrow;

        //旋转人物
        if (this.target) {
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

        if (this.shootTime >= this.shootDelay) 
        {
            this.shootTime = 0;
            let rotations = new Array<number>();
            let tmpRot: number = this.role_img.rotation;
            let mid = Math.floor(this.attribute.arrowNum / 2);//找中间的弓箭的位置
            for(let i = 0; i < this.attribute.arrowNum; i++)
            {
                let times = Math.abs(mid - i);
                if(i < mid) rotations.push(tmpRot - 15 * times);
                else if(i > mid) rotations.push(tmpRot + 15 * times);
                else rotations.push(tmpRot);
            }
            if(mid % 2 == 0)//如果是偶数再偏一次
            {
                for(let i = 0; i < rotations.length; i++)
                {
                    rotations[i] += 15 / 2;
                }
            }

            //先实例化一支弓箭
            group = Main.instance.gameView.gameBg.arrowGroup;
            for(let i = 0; i < rotations.length; i++)
            {
                arrow = ObjectPool.instance.getObj("arrow") as Arrow;
                arrow.id = this.id;
                arrow.damage = this.attribute.power;
                arrow.whos = WhosArrow.ENEMY;
                arrow.texture = RES.getRes(this.attribute.res);
                //添加显示，设置位置和角度，增加tween
                let bg = Main.instance.gameView.gameBg;
                arrow.index = bg.addArrow(arrow, WhosArrow.ENEMY);
                arrow.x = this.x;
                arrow.y = this.y;
                arrow.rotation = rotations[i];
                arrow.moveFrom(this.x, this.y, (arrow.rotation - 90) * Math.PI / 180, this.attribute.range);
            }
        }
        this.previousFrameTime = egret.getTimer();
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

    ////扣血类型，0是玩家，1是敌人
    public doDamage(damage: number) {
        super.doDamage(damage);
        if (this.attribute.hp == 0) {
            Main.instance.gameView.addMsg("'你干死了别人");
            this.destroy();
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
        this.attribute.hp = 80;
        this.attribute.maxHp = 80;
        this.attribute.hpTube.showHp();
      //  this.attribute.hpTube.updateHpLine();
        this.die = false;
    }

    //class end
}