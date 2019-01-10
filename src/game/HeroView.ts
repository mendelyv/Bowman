/**
 * 商城英雄界面
*/

class HeroView extends eui.Component {
    private goldLabel: eui.Label; //金币文本
    private gemLabel: eui.Label; //钻石文本
    private closeBtn: eui.Image;  //返回按钮

    public scroller: eui.Scroller;
    public list: eui.List;//列表
    public constructor() {
        super();
    }

    protected createChildren() {
        super.createChildren();
        this.skinName = "HeroViewSkin";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, Main.instance.releaseHeroView, Main.instance);

        // let ac = this.list.dataProvider as eui.ArrayCollection;
        // ac.removeAll();



        let index = 0;
        // let items: ITruegasItemInfoData[] = [];

        // if (truegasList.length > 15) {

        // 	this.scroller.scrollPolicyV = "on";
        // } else {
        // 	this.scroller.scrollPolicyV = "off";
        // }

        // for (let i = 0; i < 11; i++) {
        // 	if (index < 4) {
        // 		items.push(truegasList[i])
        // 		index++;
        // 	} else {
        // 		ac.addItem({ items: items })
        // 		items = [];
        // 		items.push(truegasList[i])
        // 		index = 1;
        // 	}
        // }
        // if (items.length > 0) {
        // 	ac.addItem({ items: items })
        // }

    }
}
window["HeroView"] = HeroView;