// TypeScript file

/**
 * class name : MainView
 * description : 摇杆
 * time : 2018.12.18
 * @author : 杨浩然
 */
class MainView extends eui.Component
{
    private startBtn: eui.Image; //开始战斗按钮
    private rankBtn: eui.Image; //排行榜按钮
    private shareBtn: eui.Image; //分享按钮
    private heroBtn: eui.Image; //英雄商城按钮
    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        super.createChildren();
        this.skinName = "MainViewSkin";
        //点击开始游戏按钮
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToGame, Main.instance);
        //点击英雄商城按钮
        this.heroBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.createHeroView,Main.instance);
        //点击分享

        //点击排行榜

    }


//class end
}