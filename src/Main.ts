//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    // public uiEvent = new egret.EventDispatcher();
    private static _instance: Main;//主类单例
    public static get instance(): Main { return Main._instance; }
    public isLoadCom: boolean = false;//是否加载完资源
    public isLoginCom: boolean = false;//是否登录成功
    private sceneState: SceneState = SceneState.LOGIN;//当前场景

    private _gameView: GameView;
    public get gameView(): GameView { return this._gameView; }
    private _mainView: MainView;
    private _heroView: HeroView;
    private _oldTime: number = 0;//记录离开小程序时间
   
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        Main._instance = this;
    
        this.stage.maxTouches = 2;//设置最多触摸点 只能有2个
        StageUtils.WIN_WIDTH = this.stage.stageWidth;
        StageUtils.WIN_HEIGHT = this.stage.stageHeight;
        egret.log("stageW=", StageUtils.WIN_WIDTH, " stageH=", StageUtils.WIN_HEIGHT);
        //资源加载完成
        await this.loadResource();
        GameConfig.skillConfig = RES.getRes("skillConfig_json");        
        await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
        let login = await platform.login(); //微信小游戏登录
        if (login) {
            console.log("login=", login);
            UserData.setCode(login.code);
            // this.reqServerLogin();
        }
        else {
            let hint: string = Util.getWordBySign('networkError');
            TipsUtils.showTipsDownToUp(hint, true, 30, 5000);
        }
        // this._userInfo = await platform.getUserInfo();
        // if (this._userInfo) {
        //     console.log("userInfo====", this._userInfo);

        //     UserData.setAvatar(this._userInfo.avatarUrl);
        //     UserData.setNickName(this._userInfo.nickName);
        //     console.log("avater=", UserData.getAvatar());
        //     console.log("nickName=", UserData.getNickeName());
        // }
        // else {
        //     console.log("用户点击了授权按钮");
        //     let authInfo = await platform.createUserInfoButton();//授权
        //     console.log("authInfo=", authInfo);
        //     if (authInfo) {
        //         this._userInfo = authInfo.userInfo;
        //         UserData.setAvatar(this._userInfo.avatarUrl);
        //         UserData.setNickName(this._userInfo.nickName);
        //     }
        // }
        if (GameConfig.VER_CONTROL == "test") {
            this.changeToMain();
        }
        else {
            if (Main.instance.isLoginCom) {
                if (this.isLoadCom) {
                    this.changeToMain();
                }
            }
            else {
                this.parseErrorNet();
            }
        }

    }

    /**请求自己的服务器登录 */
    private reqServerLogin(): void {
        // this.changeToGame();//TODO:测试代码
        NetMgr.instance.nomalEvent.addEventListener('login', this.parseLogin, this);
        let code: string = UserData.getCode();
        console.log("发送code到服务器=", code);
        NetMgr.instance.reqWeixinLogin(code, this.parseErrorNet);//*登录或者注册新的微信用户
    }
    /**解析登录成功返回 -- 进入游戏 */
    private parseLogin(): void {
        this.weixin();//微信处理
        this.isLoginCom = true;
        if (this.isLoadCom && this.isLoginCom) {
            this.changeToGame();
        }
    }
    /**登录失败继续登录 */
    private async parseErrorNet() {
        Main.instance.isLoginCom = false;
        if (Main.instance.isLoadCom) {
            let hint: string = Util.getWordBySign('networkError');
            var SELF = Main.instance;
            let login = await platform.login(); //微信小游戏登录
            if (login) {
                console.log("login=", login);
                UserData.setCode(login.code);
                var code: string = UserData.getCode();
                // let popup: ComPopup = new ComPopup(hint,
                //     function () {
                //         NetMgr.instance.reqServerConfig();//请求版本信息
                //         NetMgr.instance.reqWeixinLogin(code, SELF.parseErrorNet);
                //     },
                //     function () {
                //         NetMgr.instance.reqServerConfig();//请求版本信息
                //         NetMgr.instance.reqWeixinLogin(code, SELF.parseErrorNet);
                //     });
                // SELF.addChild(popup);
            }
        }
    }
    /**微信处理 */
    private weixin(): void {
        platform.sendShareData({ command: "load" });
        this.setDefaultShare();//设置微信右上角默认分享
        platform.setKeepScreenOn();//设置屏幕常亮
        let sync = platform.getLaunchOptionsSync();
        console.log("sync00=", sync);
        if (sync) {
            console.log("sync=", sync);
            if (sync.query) {
                if (sync.query.openId) {
                    let openId: string = sync.query.openId;//邀请人ID
                    console.log("获取启动参数openId=", openId);
                    // NetMgr.instance.reqInvite(openId);
                }
            }
        }
        //微信监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
        platform.getOnHide(res => {
            // Main.instance.stopAllSound();
            console.log("进入后台res=", res);
            this._oldTime = egret.getTimer();
            console.log("进入后台this._oldTime=", this._oldTime);
        });
        //微信监听小游戏回到前台的事件
        platform.getOnShow(res => {
            console.log("进入前台了res=", res);
            console.log("进入前台了时间=", egret.getTimer());
            let subTime: number = (egret.getTimer() - this._oldTime);
            console.log("进入前台了时间差值=", subTime);
            // let gameUI: GamePanel = Main.instance.getGameUI();
            // gameUI.playOrdSound();
            console.log("进入前台了GameConfig.getShareType()=", GameConfig.getShareType());
            // if (subTime > 3500)//大于3.5秒
            // {
            //     if (!GameConfig.IS_SHARE) {
            //         GameConfig.IS_SHARE = true;
            //         if (GameConfig.getShareType() == 2) {
            //             gameUI.doAD2x();
            //         }
            //         else if (GameConfig.getShareType() == 3) {
            //             Main.instance.addAward();
            //         }
            //         else if (GameConfig.getShareType() == 4) {
            //             gameUI.dobleAward();
            //         }
            //         else if (GameConfig.getShareType() == 5) {
            //             Main.instance.douSignA();
            //         }
            //         else if (GameConfig.getShareType() == 6) {//6分享得钻石
            //             NetMgr.instance.reqViewad();
            //         }
            //     }
            // }
            GameConfig.setShareType(1);
            // else {
            // let shareHintStr: string = Util.getWordBySign("shareHint1");
            // if (GameConfig.getShareType() == 2) {
            //     shareHintStr = Util.getWordBySign("shareHint2");
            // }
            // TipsUtils.showTipsDownToUp(shareHintStr, false, 30, 5000);
            // }

            // if (res) {
            //     console.log("res=", res);
            //     if (res.query) {
            //         if (res.query.openId) {
            //             let openId: string = res.query.openId;//邀请人ID
            //             NetMgr.instance.reqInvite(openId);
            //             return;
            //         } else {

            //         }
            //     }
            // }
        });
    }
    /**
   * 设置转发 
   */
    public setDefaultShare() {
        //主动点击了转发 
        if (GameConfig.VER_CONTROL == "wechat") {
            let shareData: ShareData = GameConfig.getShareData();
            let title: string = shareData.title;
            let imgurl: string = shareData.imgurl;
            GameConfig.setShareType(1);
            let type: number = GameConfig.getShareType();//主动分享到微信
            platform.setDefaultShare(title, imgurl, `share=${type}`);
        }
    }

    /**加载资源 */
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            await this.loadlocalConfig();
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadlocalConfig() {
        GameConfig.scenceConfig = RES.getRes("scence_json");
        let index = Util.getRandomRange(1, 2);
        GameConfig.obstacalsConfig = RES.getRes("obstacals" + index + "_json");
        GameConfig.playerConfig = RES.getRes("playerConfig_json");
        GameConfig.enemyConfig = RES.getRes("enemyConfig_json");
        GameConfig.nameConfig = RES.getRes("nameConfig_json");
        GameConfig.WORD_CONFIG_DATA = RES.getRes("wordConfig_json");
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    //创建登录
    private createLogin(): void {
        // if(!this._gameView)
        // {
        //     this._gameView = new GameView();
        //     this.addChild(this._gameView);
        // }
    }
    //删除登录
    public releaseLogin(): void {
        // if (this._gameView) {
        //     if(this._gameView.parent){
        //         this._gameView.parent.removeChild(this._gameView);
        //     }
        //     this._gameView = null;
        // }
    }
    //创建主界面
    private createMain() {
        if (!this._mainView) {
            this._mainView = new MainView();
            this.addChild(this._mainView);
            this._mainView.width = StageUtils.WIN_WIDTH;
            this._mainView.height = StageUtils.WIN_HEIGHT;
        }

    }
    //释放主界面
    private releaseMain() {
        if (this._mainView) {
            if (this._mainView.parent) {
                this._mainView.parent.removeChild(this._mainView);
            }
            this._mainView = null;
        }
    }
    //创建英雄商城界面
    public createHeroView():void{
        if(!this._heroView){
            this._heroView = new HeroView();
            this.addChild(this._heroView);
            this._heroView.width = StageUtils.WIN_WIDTH;
            this._heroView.height = StageUtils.WIN_HEIGHT;
        }
    }
    //释放英雄商城界面
    public releaseHeroView(): void{
        if(this._heroView){
            if(this._heroView.parent){
                this._heroView.parent.removeChild(this._heroView);    
            }
            this._heroView = null;
        }
    }
    //创建游戏
    public createGameV(): void {
        if (!this._gameView) {
            this._gameView = new GameView();
            this.addChild(this._gameView);
            this._gameView.width = StageUtils.WIN_WIDTH;
            this._gameView.height = StageUtils.WIN_HEIGHT;
        }
    }
    //删除游戏
    public releaseGame(): void {
        if (this._gameView) {
            this._gameView.destructor();
            if (this._gameView.parent) {
                this._gameView.parent.removeChild(this._gameView);
            }
            this._gameView = null;
        }
    }
    /** 创建弹窗
     * @param message ：提示信息
     * @param confirmEvent ：非取消按钮的事件
     * @param cancelEvent ：非取消按钮的事件
     * @param confirmTxt ：确定按钮替换文本(缺省)
     * @param cancelTxt ：取消按钮替换文本(缺省)
     */
    public crePop(message: string, confirmEvent?: Function, cancelEvent?: Function, confirmTxt?: string, cancelTxt?: string): PopWindow {
        let popup: PopWindow = new PopWindow();
        this.addChild(popup);
        popup.enable(message, confirmEvent, cancelEvent, confirmTxt, cancelTxt);
        popup.x = (StageUtils.WIN_WIDTH - popup.width)*0.5;
        popup.y = (StageUtils.WIN_HEIGHT - popup.height)*0.5;
        return popup;
    }

    private changeScene(targetState: SceneState): void {
        if (this.sceneState != targetState) {
            this.releaseAll();
            this.sceneState = targetState;
            switch (this.sceneState) {
                case SceneState.LOGIN:
                    this.createLogin();
                    break;
                case SceneState.MAIN:
                    this.createMain();
                    break;
                case SceneState.GAMEING:
                    this.createGameV();
                    break;
            }
        }
    }
    /**切换到游戏界面 */
    public changeToGame(): void {
        this.releaseHeroView();
        this.changeScene(SceneState.GAMEING);
    }
    /**切换到主界面 */
    public changeToMain() {
        this.changeScene(SceneState.MAIN);
    }
    /**
    * 释放所有场景
    */
    private releaseAll(): void {
        this.releaseLogin();
        this.releaseGame();
        this.releaseMain();
    }
}
