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
        let ac = this.list.dataProvider as eui.ArrayCollection;
        ac.removeAll();
        let heroConfig = GameConfig.playerConfig.hero;
        let config: Array<any> = heroConfig.config;
        let index = 0;
     
        let items: any[] = [];
        if (config.length > 2) {
        	this.scroller.scrollPolicyV = "on";
        } else {
        	this.scroller.scrollPolicyV = "off";
        }
        for (let i = 0; i < config.length; i++) {
            let obj = {
                index: i, name: config[i].work, hp: config[i].hp, isSelect: (i == 0), gold: config[i].gold
            }
            if (index < 4) {
                items.push(obj)
                index++;
            } else {
                ac.addItem({ items: items })
                items = [];
                items.push(obj)
                index = 1;
            }
        }
        if (items.length > 0) {
            ac.addItem({ items: items })
        }

    }
}
window["HeroView"] = HeroView;