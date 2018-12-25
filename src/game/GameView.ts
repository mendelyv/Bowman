/**
 * 游戏场景处理
 */
class GameView extends eui.Component {
    public joyL: Joystick;
    public joyR: Joystick;
    public player: Player;
    public uiGroup: eui.Group;
    public elementGroup: eui.Group;

    private bg: GameBg;
    private closeBtn: eui.Image;

    private previousFrameTime: number = 0;
    private shootTime: number = 0;
    private shootDelay: number = 1000;
    private gamebg: GameBg;//地图背景
    public constructor() {
        super();
        this.init();
    }
    /**初始化*/
    public init() {
        this.gamebg = GameBg.GbInstance();
    }

    protected createChildren() {
        this.skinName = "GameViewSkin";
        this.initEvents();
        this.joyL.resetON = true;//打开左手手柄重置数据的开关
    }

    private initEvents(): void {
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToMain, Main.instance);
    }

    /**每帧循环处理 */
    private update(): void {
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;

        this.playerMoveAttack();
     
        this.previousFrameTime = egret.getTimer();
         this.limitplayerMove();
        //玩家转向
        this.player.moveToByAngle((this.joyR.Angle - 90) * Math.PI / 180);

        if(this.joyR.active)
        {
            // console.log(" ===== shoot ===== ");
            if(this.shootTime >= this.shootDelay)
            {
                this.player.attack();
                this.shootTime = 0;
            }
        }
    
    }
    

    private playerMoveAttack()
    {
        // ===== 背景和主玩家的移动 start =====
        let angle:number = this.joyL.Angle;
        let xAxis:number = this.joyL.XAxis;
        let yAxis:number = this.joyL.YAxis;
        let offset:number = this.joyL.Offset;

        if (!this.player.movableX) {
            this.bg.movableX = true;
            this.bg.move(xAxis, 0);
        }
        if (!this.player.movableY) {
            this.bg.movableY = true;
            this.bg.move(0, yAxis);
        }
        if (!this.bg.movableX) {
            this.player.movableX = true;
            this.player.move(xAxis, 0, angle, offset);
        }
        if (!this.bg.movableY) {
            this.player.movableY = true;
            this.player.move(0, yAxis, angle, offset);
        }
        // ===== 背景和主玩家的移动 end =====
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


    /** 限制玩家移动，不允许出界 */
    private limitplayerMove() {
        if (this.player.x - this.player.anchorOffsetX <= 0) {
            this.player.x = this.player.anchorOffsetX;
        }
        if (this.player.y - this.player.anchorOffsetY <= 0) {
            this.player.y = this.player.anchorOffsetY;
        }
        if (this.player.x + this.player.anchorOffsetX >= StageUtils.WIN_WIDTH) {
            this.player.x = StageUtils.WIN_WIDTH - this.player.anchorOffsetX;
        }
        if (this.player.y + this.player.anchorOffsetY >= StageUtils.WIN_HEIGHT) {
            this.player.y = StageUtils.WIN_HEIGHT - this.player.anchorOffsetY;
        }
    }


    public destructor() {
        this.joyL.destructor();
        this.joyR.destructor();
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToMain, Main.instance);
    }
}