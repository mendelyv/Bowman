/**
 * 商城英雄界面
*/

class HeroView extends eui.Component{
    private goldLabel: eui.Label; //金币文本
    private gemLabel: eui.Label; //钻石文本
    private closeBtn:eui.Image;  //返回按钮
    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        super.createChildren();
        this.skinName = "HeroViewSkin";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,Main.instance.releaseHeroView,Main.instance);
    }
}
window["HeroView"] = HeroView;