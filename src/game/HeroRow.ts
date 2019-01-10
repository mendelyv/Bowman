/**
 * 商城英雄界面
*/

class HeroRow extends eui.Component{

    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        super.createChildren();
        this.skinName = "HeroRowSkin";
       
    }
}
window["HeroRow"] = HeroRow;