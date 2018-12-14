/**
 * 游戏场景处理
 */
class GameView extends eui.Component {
    public joyL: Joystick;
    public joyR: Joystick;
    public role:Role;
    public uiGroup: eui.Group;
    public elementGroup: eui.Group;

    private previousFrameTime: number = 0;
    private shootTime: number = 0;
    private shootDelay: number = 1000;

    public constructor() {
        super();
    }

    protected createChildren() {
        this.skinName = "GameViewSkin";
        this.initEvents();
        this.joyL.resetON = true;//打开左手手柄重置数据的开关
    }

    private initEvents(): void {
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    /**每帧循环处理 */
    private update(): void {
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;

        let angle:number = this.joyL.Angle;
        let xAxis:number = this.joyL.XAxis;
        let yAxis:number = this.joyL.YAxis;
        let offset:number = this.joyL.Offset;
     
        this.role.move(xAxis,yAxis,angle,offset);
        this.role.moveToByAngle((this.joyR.Angle - 90) * Math.PI / 180);
        this.role.arrow.rotation = this.joyR.Angle - 90;

        if(this.joyR.active)
        {
            // console.log(" ===== shoot ===== ");
            if(this.shootTime >= this.shootDelay)
            {
                let element = new ElementBase();
                element.x = this.role.x;
                element.y = this.role.y;
                element.scaleX = element.scaleY = 0.1;
                element.WWmoveFrom(this.role.x, this.role.y, this.role.angle, 2000);
                this.elementGroup.addChild(element);
                this.shootTime = 0;
            }
        }
     
        this.previousFrameTime = egret.getTimer();
    }
    
    private onTouchBegin(event: egret.TouchEvent) {
        let touchPoint = new egret.Point(event.stageX, event.stageY);
        if (touchPoint.x < (StageUtils.WIN_WIDTH * 0.5)) {
            if (this.joyL.active) return;
            // console.log(" ===== onViewTouchBegin left ===== ");
            this.joyL.x = touchPoint.x;
            this.joyL.y = touchPoint.y;
            this.joyL.alpha = 1;
            this.joyL.enable(event);
        }
        else {
            if (this.joyR.active) return;
            // console.log(" ===== onViewTouchBegin right ===== ");
            this.joyR.x = touchPoint.x;
            this.joyR.y = touchPoint.y;
            this.joyR.alpha = 1;
            this.joyR.enable(event);
        }
        this.touchEnabled = false;
    }
}