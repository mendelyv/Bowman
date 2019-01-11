/**
 * 商城单个英雄
*/

class HeroItem extends eui.ItemRenderer {
    public bg_rect: eui.Rect;
    public name_txt: eui.Label;//职业名称
    public role_img: eui.Image;//英雄图片
    public work_img: eui.Image;//职业小图标
    public select_img: eui.Image;//选中图片显示
    public hp_txt: eui.Label;//血量
    public hero_info_img: eui.Image;//点击查看英雄简介
    public buy_btn: eui.Button;//购买按钮
    public select_btn: eui.Button;//选择按钮
    public hero_gp: eui.Group;

    public info_gp: eui.Group;
    public info_txt: eui.Label;//职业简介
    public info_name_txt: eui.Label;
    public info_bg_rect: eui.Rect;

    public constructor() {
        super();
    }
    protected createChildren() {
        super.createChildren();
        this.hero_gp.visible = true;
        this.info_gp.visible = false;
        if (!this.hero_info_img.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.hero_info_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeroInfo, this);
        }
        if (!this.info_gp.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.info_gp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInfo, this);
        }
        if (!this.select_btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.select_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectBtn, this);
        }
    }

    private onHeroInfo(e: egret.TouchEvent): void {
        this.hero_gp.scaleX = 1;
        this.info_gp.scaleX = -1;

        var self = this;
        egret.Tween.get(this.hero_gp).to({ scaleX: -1 }, 200).call(function (): void {
            egret.Tween.removeTweens(self.hero_gp);
            self.hero_gp.visible = false;
            self.info_gp.visible = true;
            self.info_gp.scaleX = 1;
        });
    }
    private onInfo(e: egret.TouchEvent): void {
        var self = this;
        this.hero_gp.scaleX = -1;
        this.info_gp.scaleX = 1;
        egret.Tween.get(this.info_gp).to({ scaleX: -1 }, 200).call(function (): void {
            egret.Tween.removeTweens(self.info_gp);
            self.info_gp.visible = false;
            self.hero_gp.visible = true;
            self.hero_gp.scaleX = 1;
        });
    }
    private onSelectBtn(e: egret.TouchEvent): void {
        UserData.s_selRole = this.data.index;
        
        let list: eui.List = this.parent.parent.parent as eui.List;
        for (let i = 0; i < list.numChildren; i++) {
            let row: HeroRow = list.getChildAt(i) as HeroRow;
            row.dataChanged();
        }

    }
    public data: { index: number, name: string, hp: number, gold: number, info: string };
    protected dataChanged(): void {
        super.dataChanged();
        this.name_txt.text = this.data.name;
        this.info_name_txt.text = this.data.name;
        this.role_img.source = "role_" + this.data.index + "_png";
        this.work_img.source = "workIcon_" + this.data.index + "_png";
        this.hp_txt.text = this.data.hp.toString();
        if (UserData.s_selRole == this.data.index) {
            this.select_img.visible = true;
            this.buy_btn.visible = false;
            this.bg_rect.fillColor = Util.s_colors.blue;
            this.info_bg_rect.fillColor = Util.s_colors.blue;
            this.select_btn.visible = false;
        }
        else {
            this.select_img.visible = false;
            this.bg_rect.fillColor = 0xcbdbfd;
            this.info_bg_rect.fillColor = 0xcbdbfd;
            this.select_btn.visible = true;
        }
        if (this.data.gold > 0) {
            this.select_btn.visible = false;
            this.buy_btn.visible = true;
            this.buy_btn.label = this.data.gold.toString();
        }
        let styleParser = new egret.HtmlTextParser();
        this.info_txt.textFlow = styleParser.parser(this.data.info);
    }

}
window["HeroItem"] = HeroItem;