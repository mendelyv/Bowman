/**
 * 游戏场景处理
 */
class GameView extends eui.Component 
{
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
    /**元素层*/
    private elementlayer:egret.DisplayObjectContainer;
    private elementmanger: ElementManger;//元素管理类
    private gamebg:GameBg;//地图背景
    public constructor() {
        super();
        this.init();
    }
    /**初始化*/
    public init(){
        //初始化元素层
        this.elementlayer = new egret.DisplayObjectContainer;
        this.elementlayer.width = sceneconfig.mapwidth;
        this.elementlayer.height = sceneconfig.mapheight;
        this.addChild(this.elementlayer);
        //初始化元素管理
        this.elementmanger = ElementManger.EmgetInstance();
        this.elementmanger.parent =this.elementlayer;
        this.createElement();
        this.gamebg = GameBg.GbInstance();
        // this.gamebg.createObs();
    }
    /**创建游戏元素*/
    public createElement():void{
        //创建道具
        this.elementmanger.createEleBy2D();
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

        let angle:number = this.joyL.Angle;
        let xAxis:number = this.joyL.XAxis;
        let yAxis:number = this.joyL.YAxis;
        let offset:number = this.joyL.Offset;
        
        // ===== 背景和主玩家的移动 start =====
        if(!this.player.movableX)
        {
            this.bg.movableX = true;
            this.bg.move(xAxis, 0);
        }
        if(!this.player.movableY) 
        {
            this.bg.movableY = true;
            this.bg.move(0, yAxis);
        }
        if(!this.bg.movableX)
        {
            this.player.movableX = true;
            this.player.move(xAxis,0,angle,offset);
        }
        if(!this.bg.movableY)
        {
            this.player.movableY = true;
            this.player.move(0,yAxis,angle,offset);
        }
        // ===== 背景和主玩家的移动 end =====

        this.limitplayerMove();
        //玩家转向
        this.player.moveToByAngle((this.joyR.Angle - 90) * Math.PI / 180);
        //控制元素显示
        this.elementShowControl();
        if(this.joyR.active)
        {
            // console.log(" ===== shoot ===== ");
            if(this.shootTime >= this.shootDelay)
            {
                this.player.attack();
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


    /** 限制玩家移动，不允许出界 */
    private limitplayerMove()
    {
        if(this.player.x - this.player.anchorOffsetX <= 0)
        {
            this.player.x = this.player.anchorOffsetX;
        }
        if(this.player.y - this.player.anchorOffsetY <= 0)
        {
            this.player.y = this.player.anchorOffsetY;       
        }
        if(this.player.x + this.player.anchorOffsetX >= StageUtils.WIN_WIDTH)
        {
            this.player.x = StageUtils.WIN_WIDTH - this.player.anchorOffsetX;
        }
        if(this.player.y + this.player.anchorOffsetY >= StageUtils.WIN_HEIGHT)
        {
            this.player.y = StageUtils.WIN_HEIGHT - this.player.anchorOffsetY;
        }
    }


    public destructor()
    {
        this.joyL.destructor();
        this.joyR.destructor();
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToMain, Main.instance);
    }

    /**控制元素的的显示，不在屏幕内删除*/
    private elementShowControl():void{
        var arr:any = this.elementmanger.getElementArr();
        for(var i:number = 0;i<arr.length;i++){
            for(var j:number = 0;j<arr[i].length;j++){
                for(var k:number = 0;k<arr[i][j].length;k++){
                    var ele:ElementBase = arr[i][j][k];
                    var point: egret.Point = new egret.Point;
                    this.elementlayer.localToGlobal(ele.x,ele.y ,point);
                    if(point.x< -ele.width/2*this.scaleX || point.x>this.stage.stageWidth+ele.width/2*this.scaleX 
                    || point.y < -ele.height/2*this.scaleY||point.y>this.stage.stageHeight+ele.height/2*this.scaleY){
                        ele.WWhide();
                    }else{
                        ele.WWshow(this.elementlayer);
                    }
                }
            }
        }
    }
}