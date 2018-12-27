// TypeScript file

/**
 * class name : Enemy
 * description : 敌人
 * time : 2018.12.21
 * @author : 杨浩然
 */
class Enemy extends Role
{  
    public arrow: eui.Image;
	public role_img: eui.Image;
	public bubble_img: eui.Image;
    public target: Role;//追寻的目标

    private ai: EnemyAI;
    private nav: SilzAstar;//a*导航
    private pathQueue: Array<SilzAstarNode>;//导航的路径
    private pathIndex: number = 0;
    private followTween: egret.Tween;
    private endTarget: egret.Point;

    public constructor()
    {
        super();
        this.speed = 5;
        this.ai = new EnemyAI(this);

        if(MapManager.mapItems.length != 0)
            this.nav = new SilzAstar(MapManager.mapItems);
        this.pathQueue = new Array<SilzAstarNode>();
    }

    protected createChildren()
    {
        this.skinName = "RoleSkin";
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.removeChild(this.arrow);
        delete this.arrow;//删除箭头
    }


    /** 转向 */
    public moveToByAngle(angle: number): void {
		this.angle = angle;
		this.role_img.rotation = angle * 180 / Math.PI + 90;
	}

    /** 移动
     * @param xPos ：起点x
     * @param yPos ：起点y
     * @param angle ：移动的角度
     * @param Dis ：移动的距离
     */
    public move(xPos:number, yPos:number, angle:number,Dis:number)
    {
        egret.Tween.removeTweens(this);
        let time = (Dis / this.speed) * 1000 * 0.02;
        xPos += Math.cos(angle)*Dis;
        yPos += Math.sin(angle)*Dis;
        var self = this;
        egret.Tween.get(this).to({ x: xPos,y: yPos }, time);
    }

    public moveOfPath()
    {
        if(this.pathQueue.length <= 0) return;
        let point = this.pathQueue[this.pathIndex];
        if(!point)
        {
            this.pathQueue = [];
            this.pathIndex = 1;//从1开始，忽略掉起点
            this.followTween.pause();
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.followTween);
            this.followTween = null;            
            return;
        }
        let target = MapManager.getMapItemPos(point.y, point.x);
        let dis = egret.Point.distance(new egret.Point(this.x, this.y), target);
        let time = (dis / this.speed) * 1000 * 0.02;
        this.followTween = egret.Tween.get(this).to({x: target.x, y: target.y}, time)
                            .call(function(){
                                this.pathIndex++;
                                this.moveOfPath();
                            }, this);
    }

    /** 攻击 */
    public attack()
    {
        // let element = new ElementBase();
		// let gameView = Main.instance.gameView;
		// element.x = this.x;
		// element.y = this.y;
		// element.scaleX = element.scaleY = 0.1;
		// element.WWmoveFrom(this.x, this.y, this.rotation, 2000);
		// gameView.elementGroup.addChild(element);

        // let arrow = ObjectPool.instance.getObj("arrow");
    }

    /** 追寻 */
    public follow()
    {
        if(!this.target) return;
        let start = MapManager.getRowColOfMap(new egret.Point(this.x, this.y));
        let end = MapManager.getRowColOfMap(new egret.Point(this.target.x, this.target.y), true);

        if(this.endTarget)
            if(end == this.endTarget)
                return;
        this.endTarget = end;

        if(this.followTween)//如果有tween代表正在追寻，所以需要
        {
            this.pathQueue = [];
            this.pathIndex = 1;//从1开始，忽略掉起点
            this.followTween.pause();
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.followTween);
            this.followTween = null;
        }

        
        let pathQueue = this.nav.find(start.y, start.x, end.y, end.x);
        if(!pathQueue) return;

        this.pathQueue = pathQueue;
        this.moveOfPath();
    }

//class end
}