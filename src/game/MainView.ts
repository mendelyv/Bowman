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
    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        super.createChildren();
        this.skinName = "MainViewSkin";
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.changeToGame, Main.instance);
        
    }


//class end
}