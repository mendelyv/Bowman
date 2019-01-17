// TypeScript file

/**
 * class name : MainView
 * description : 摇杆
 * time : 2018.12.18
 * @author : 杨浩然
 */
class MainView extends eui.Component {
    private startBtn: eui.Image; //开始战斗按钮
    private rankBtn: eui.Image; //排行榜按钮
    private shareBtn: eui.Image; //分享按钮
    private heroBtn: eui.Image; //英雄商城按钮

    private _rankMask: egret.Shape;//排行榜遮罩
    private _rankBit: egret.Bitmap;//排行榜界面
    private _rankCloseBtn: egret.Bitmap;//排行榜关闭按钮

    public constructor() {
        super();
    }

    protected createChildren() {
        super.createChildren();
        this.skinName = "MainViewSkin";
        //点击开始游戏按钮
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToGame, Main.instance);
        //点击英雄商城按钮
        this.heroBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.createHeroView, Main.instance);
        //点击分享
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtn, this);
        //点击排行榜
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankBtn, this);
    }
    /**点击了分享按钮 */
    private onShareBtn(e: egret.TouchEvent): void {
        let share: ShareData = GameConfig.getShareData();
        Main.shareType = ShareType.None;
        let promCall = platform.shareAppMessage(share.title, share.imgurl, `share=${Main.shareType}`);
    }
    /**点击了排行榜 */
    private onRankBtn(e: egret.TouchEvent): void {
        console.log("点击了 排行榜");
        if (GameConfig.VER_CONTROL == "wechat") {

            this.createRankMask();
            this._rankMask.visible = true;
            platform.sendShareData({ command: "open", type: "friend" });
            this.createRankBit();
        }
        else if (GameConfig.VER_CONTROL == "xiaomi") {
            // if(!NetMgr.instance.nomalEvent.hasEventListener("commonRank"))
            // {
            //     NetMgr.instance.nomalEvent.addEventListener('commonRank', this.showCommonRankPanel, this);
            // }
            // NetMgr.instance.reqCommonRankData();
        }
    }

    // public showCommonRankPanel()
    // {
    //     this.createRankMask();
    //     this._rankMask.visible = true;
    //     let data = [];
    //     for(let i = 0; i< 100 ; ++i)
    //     {
    //         let tempObj = {name:"name" + (i+1),info:i+1};
    //         data.push(tempObj);
    //     }
    //     if(!this.rankCommon)
    //     {
    //         this.rankCommon = new RankCommon();
    //         this.rankCommon.anchorOffsetX = this.rankCommon.width * 0.5;
    //         this.rankCommon.anchorOffsetY = this.rankCommon.height * 0.5;
    //         this.rankCommon.x = Main.stageWid * 0.5;
    //         this.rankCommon.y = Main.stageHei * 0.5;
    //         this.addChild(this.rankCommon);
    //     }
    //     this.rankCommon.showRankPanel(data);
    //     this.rankCommon.parent.setChildIndex(this.rankCommon,this.rankCommon.parent.numChildren - 1);
    // }

    /**创建排行榜遮罩 */
    private createRankMask(): void {
        if (!this._rankMask) {
            this._rankMask = Util.createStageMask(Util.s_colors.black, 0.7, StageUtils.WIN_WIDTH, StageUtils.WIN_HEIGHT);
            this.addChild(this._rankMask);
            this._rankMask.visible = true;
            this._rankMask.touchEnabled = true;
            this._rankMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankMask, this);
        }
    }
    /**点击了排行榜遮罩 */
    private onRankMask(e: egret.TouchEvent): void {
        this.releaseRank();
    }
    /**释放排行榜 */
    public releaseRank(): void {
        if (GameConfig.VER_CONTROL == "wechat") {
            platform.sendShareData({ command: "close" });
        }
        else if (GameConfig.VER_CONTROL == "xiaomi") {
            // if(this.rankCommon)
            // {
            //     this.rankCommon.parent.removeChild(this.rankCommon);
            //     this.rankCommon = null;
            // }
        }
        this.releaseRankClose();
        this.releaseRankMask();
        this.releaseRankBit();
    }
    /**释放排行榜遮罩 */
    private releaseRankMask(): void {
        if (this._rankMask) {
            this._rankMask.touchEnabled = false;
            this._rankMask.visible = false;
            this._rankMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankMask, this);
            if (this._rankMask.parent) {
                this._rankMask.parent.removeChild(this._rankMask);
            }
            this._rankMask = null;
        }
    }


    /**创建排行榜canvas */
    private createRankBit(): void {
        if (!this._rankBit) {
            if (!platform.openDataContext) {
                return;
            }
            this._rankBit = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
            this._rankBit.touchEnabled = true;
            this._rankBit.pixelHitTest = true;
            this.addChild(this._rankBit);
            this.createRankClose()
        }
    }
    /**创建排行榜关闭按钮 */
    private createRankClose(): void {
        if (!this._rankCloseBtn) {
            let stageWidth: number = StageUtils.WIN_WIDTH;
            let stageHeight: number = StageUtils.WIN_HEIGHT;
            this._rankCloseBtn = Util.createBitmap("com_btn_close_png");
            // this._rankCloseBtn.width = stageWidth * 4 / 5;
            // this._rankCloseBtn.height = stageHeight * 4 / 5;
            // this._rankCloseBtn.scaleX = this._rankCloseBtn.scaleY = 0.9;
            // let dis_w: number = StageUtils.getWidthDisWG();
            // console.log('dis_w=', dis_w, " dis_h=", dis_h);

            this._rankCloseBtn.x = stageWidth * 0.77;
            this._rankCloseBtn.y = stageHeight * 0.165;
            let dis_h: number = this.getHeightDisWG();
            if (dis_h < 0) {
                this._rankCloseBtn.scaleX = this._rankCloseBtn.scaleY = 0.6;
                this._rankCloseBtn.x = stageWidth * 0.8;
            }
            this.addChild(this._rankCloseBtn);
            this._rankCloseBtn.touchEnabled = true;
            this._rankCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.releaseRank, this);
        }
    }
    /**
    * return 获取屏幕高度减去游戏定义高度的距离
    */
    private getHeightDisWG(): number {
        let win_height: number = StageUtils.WIN_HEIGHT;
        let game_height: number = 750;
        let dis: number = win_height - game_height;
        return dis;
    }
    /**释放排行榜按钮 */
    private releaseRankClose(): void {
        if (this._rankCloseBtn) {
            this._rankCloseBtn.touchEnabled = false;
            this._rankCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.releaseRank, this);
            if (this._rankCloseBtn.parent) {
                this._rankCloseBtn.parent.removeChild(this._rankCloseBtn);
            }
            this._rankCloseBtn = null;
        }
    }
    /**释放排行榜 */
    private releaseRankBit(): void {
        if (this._rankBit) {
            if (this._rankBit.parent) {
                this._rankBit.parent.removeChild(this._rankBit);
            }
            this._rankBit = null;
        }
    }

    //class end
}