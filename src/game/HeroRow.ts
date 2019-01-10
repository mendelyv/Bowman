/**
 * 商城英雄界面一行英雄
*/

class HeroRow extends eui.ItemRenderer {

    public constructor() {
        super();
    }

    protected createChildren() {
        super.createChildren();
        for (let i = 0; i < 4; i++) {
            let item: HeroItem = this[`item${i}`];
            item.visible = false;
        }
    }
    private onItem(e: egret.TouchEvent): void {
        let i: number = Number(e.currentTarget.name);
        let tempData = this.data.items[i];
        if (tempData) {
            HeroView.s_defSel = tempData.index;
            // Main.instance.uiEvent.dispatchEventWith('refreshHeroList');
            // this.dataChanged();
            let list: eui.List = this.parent as eui.List;
            for (let i = 0; i < list.numChildren; i++) {
                let row:HeroRow = list.getChildAt(i) as HeroRow;
                row.dataChanged();
            }
        }
    }
    public data: { items: any[] };
    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data) return;
        if (!this.data.items) return;
        for (let i = 0; i < this.data.items.length; i++) {
            let item: HeroItem = this[`item${i}`];
            item.visible = true;
            item.data = this.data.items[i];
            if (!item.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                item.name = i.toString();
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem, this);
            }
        }
    }
}
window["HeroRow"] = HeroRow;