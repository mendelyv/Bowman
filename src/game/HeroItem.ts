/**
 * 商城单个英雄
*/

class HeroItem extends eui.ItemRenderer {
    public bg_rect:eui.Rect;
    public name_txt:eui.Label;//职业名称
    public role_img:eui.Image;//英雄图片
    public work_img:eui.Image;//职业小图标
    public select_img:eui.Image;//选中图片显示
    public hp_txt:eui.Label;//血量

    public buy_btn:eui.Button;//购买按钮
    public constructor() {
        super();
    }
     protected createChildren() {
        super.createChildren();
    }
    public data: {index:number,name:string,hp:number,gold:number };
    protected dataChanged(): void {
        super.dataChanged();
        this.name_txt.text = this.data.name;
        this.role_img.source = "role_"+this.data.index+"_png";
        this.work_img.source = "workIcon_"+this.data.index+"_png";
        this.hp_txt.text = this.data.hp.toString();
        if(HeroView.s_defSel == this.data.index)
        {
            this.select_img.visible = true;
            this.buy_btn.visible = false;
            this.bg_rect.fillColor = Util.s_colors.blue;
        }
        else
        {
            this.select_img.visible = false;
            this.bg_rect.fillColor = 0xcbdbfd;
        }
        if(this.data.gold>0)
        {
             this.buy_btn.visible = true;
             this.buy_btn.label = this.data.gold.toString();
        }
    }
   
}
window["HeroItem"] = HeroItem;