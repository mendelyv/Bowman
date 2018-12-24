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
    private static _instance: Main;//主类单例
    public static get instance(): Main { return Main._instance; }
    private static S_LOGIN: number = 0;//菜单-登录界面
    private static S_GAMING: number = 2;//游戏
    private static S_MAIN: number = 1;//主界面
    private _selIndex: number = -1;//当前选择的场景

    private _gameView: GameView;
    public get gameView(): GameView { return this._gameView; }
    private _mainView: MainView;
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
        await this.loadResource()
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        this.changeToMain();

    }



    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);

        }
        catch (e) {
            console.error(e);
        }
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
    private createMain()
    {
        if(!this._mainView)
            this._mainView = new MainView();
        this.addChild(this._mainView);
        
    }
    //释放主界面
    private releaseMain()
    {
        if (this._mainView) {
            if (this._mainView.parent) {
                this._mainView.parent.removeChild(this._mainView);
            }
            this._mainView = null;
        }
    }
    //创建游戏
    private createGameV(): void {
        if (!this._gameView) {
            this._gameView = new GameView();
            this.addChild(this._gameView);
       
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
    /** 切换到登录-菜单界面 */
    public changeToLogin(): void {
        this.changeScene(Main.S_LOGIN);
    }
    /**切换到游戏界面 */
    public changeToGame(): void {
        GameConfig.scenceConfig = RES.getRes("scence_json");
        sceneconfig.WWinit();
        GameConfig.elementConfig = RES.getRes("element_json");
        elementconfig.WWinit();
        GameConfig.obstacalsConfig = RES.getRes("obstacals_json");
        obstacalsconfig.WWinit();
        this.changeScene(Main.S_GAMING);
    }
    /**切换到主界面 */
    public changeToMain(){
        this.changeScene(Main.S_MAIN);
    }
    /**
    * 释放所有场景
    */
    private releaseAll(): void {
        this.releaseLogin();
        this.releaseGame();
        this.releaseMain();
    }

    /**
    * 改变场景
    * @param index
    */
    private changeScene(index: number): void {
        if (this._selIndex != index) {
            this.releaseAll();
            this._selIndex = index;
            switch (this._selIndex) {
                case Main.S_LOGIN:
                    this.createLogin();
                    break;
                case Main.S_MAIN:
                    this.createMain();
                    break;
                case Main.S_GAMING:
                    this.createGameV();
                    break;
            }
        }
    }
}
