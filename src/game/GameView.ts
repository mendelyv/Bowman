/**
 * 游戏场景处理
 */
class GameView extends eui.Component {
    public joyL: Joystick;
    public joyR: Joystick;
    public player: Player;
    public uiGroup: eui.Group;
    private closeBtn: eui.Image;

    public gameBg: GameBg;
   
    private previousFrameTime: number = 0;
    private shootTime: number = 0;
    private shootDelay: number = 1000;

    private mapMgr:MapManager;
    public constructor() {
        super();
        this.init();
    }
    /**初始化*/
    public init() {
        //创建弓箭对象池
        let arrow = new Arrow();
        ObjectPool.instance.createObjectPool("arrow", arrow);
    }

    private initMapMgr()
    {
        this.mapMgr = new MapManager();
    }


    protected createChildren() {
        this.skinName = "GameViewSkin";
        this.initEvents();
        this.joyL.resetON = true;//打开左手手柄重置数据的开关


        // this.showDiff();
        this.initMapMgr();
    }
    // /**
    //  * 地图层
    //  */
    // private _mapLayer: egret.DisplayObjectContainer;
    // /**
    //  * 赛车层
    //  */
    // private _carLayer: egret.DisplayObjectContainer;
    // /**
    //  * 特效层
    //  */
    // private _effectLayer: egret.DisplayObjectContainer;
    // /**
    //  * 地图
    //  */
    // private _map: BaseMap;
    // /**
    //  * 渲染列表
    //  */
    // // private _renderList: Array<GameObject>;

    // private _mycar: Car;


    // private _camera: Camera;
    // private showDiff(): void {
    //     this._mapLayer = new egret.DisplayObjectContainer();
    //     this._carLayer = new egret.DisplayObjectContainer();
    //     this._effectLayer = new egret.DisplayObjectContainer();

    //     this.addChild(this._mapLayer);
    //     this.addChild(this._effectLayer);
    //     this.addChild(this._carLayer);
    //     // this._renderList = [];

    //     this._mycar = new Car(this._map);
    //     this._carLayer.addChild(this._mycar.monitor);
    //     this._mycar.setPos(300, 300);
    //     this._mycar.turnRoation = -90;
    //     this._mycar.engineOn(20);
    //     this._mycar.setSkin('car0_png');
    //     // this._renderList.push(this._mycar);

    //     this._map = new BaseMap();
    //     this._map.setContainer(this._mapLayer);
    //     this._map.createLoop(1, 'map_png', this.onMapReady, this);


    // }
    // private onController(angle: number = NaN, length: number = NaN, changeAngle: number = NaN): void {
    //     if (isNaN(angle) && isNaN(length)) {
    //         this._mycar.engineOff();
    //         return;
    //     }
    //     this._mycar.turnRoation = Math.ceil(angle * 180 / Math.PI);
    //     this._mycar.engineOn(20);
    // }

    // private onMapReady(): void {
    //     this._camera = new Camera(this._map);
    //     this._camera.focus = this._mycar;

    //     this.addEventListener(egret.Event.ENTER_FRAME, this.render, this);

    //     //this.x = (this.stage.stageWidth-this._map.width)>>1;
    // }

    // private render(e: egret.Event): void {
    //     var t: number = egret.getTimer();

    //     this._map.render();
    //     this._mycar.run(t);
    //     this._mycar.render(t);
    //     // for (var i: number = this._renderList.length - 1; i >= 0; i--) {
    //     //     this._renderList[i].run(t);
    //     //     this._renderList[i].render(t);
    //     // }

    //     this._camera.update();

    //     // this._particle.render(t);
    // }
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

        if (this.joyR.active) {
            // console.log(" ===== shoot ===== ");
            if (this.shootTime >= this.shootDelay) {
                this.player.attack();
                this.shootTime = 0;
            }
        }

    }


    private playerMoveAttack() {
        // ===== 背景和主玩家的移动 start =====
        let angle: number = this.joyL.Angle;
        let xAxis: number = this.joyL.XAxis;
        let yAxis: number = this.joyL.YAxis;
        let offset: number = this.joyL.Offset;

        if (!this.player.movableX) {
            this.gameBg.movableX = true;
            this.gameBg.move(xAxis, 0);
        }
        if (!this.player.movableY) {
            this.gameBg.movableY = true;
            this.gameBg.move(0, yAxis);
        }
        if (!this.gameBg.movableX) {
            this.player.movableX = true;
            this.player.move(xAxis, 0, angle, offset);
        }
        if (!this.gameBg.movableY) {
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
        this.gameBg.destructor();
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToMain, Main.instance);
    }
}