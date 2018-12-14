var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 元素基类（包括年货，道具）
 */
var ElementBase = (function (_super) {
    __extends(ElementBase, _super);
    function ElementBase() {
        var _this = _super.call(this) || this;
        _this.img = new egret.Bitmap;
        _this.addChild(_this.img);
        _this.paopao = Util.createBitmap("element_penshe_png");
        _this.addChild(_this.paopao);
        return _this;
    }
    /*根据id获得纹理*/
    ElementBase.WWgetBitmapByID = function (id) {
        var fn = null;
        switch (id) {
            case ELEMENT_ID.id_common://普通吞噬物
                var rand = Util.getRandomRange(0, 3);
                fn = "element_common_" + rand + "_png";
                break;
            case ELEMENT_ID.id_juzi://橘子
                fn = "element_juzi_png";
                break;
            case ELEMENT_ID.id_guazi://瓜子
                fn = "element_guazi_png";
                break;
            case ELEMENT_ID.id_weight://体重增加
                fn = "element_weight_png";
                break;
            case ELEMENT_ID.id_penshe://喷射物
                fn = "element_penshe_png";
                break;
        }
        return fn;
    };
    //设置数据(事件=-1代表没事件发生)
    ElementBase.prototype.WWsetData = function (elementID, weight, eventType) {
        this.elementID = elementID;
        this.weight = weight;
        this.eventType = eventType;
        this.isCanColliseSelf = true;
        // this.img.texture = RES.getRes(Element.WWgetBitmapByID(elementID));
        //获得半径
        var radius = 200; //attributeconfig.WWgetRadiusByWeight(weight);
        this.img.width = radius * 2;
        this.img.height = radius * 2;
        this.paopao.width = radius * 2;
        this.paopao.height = radius * 2;
        this.width = radius * 2;
        this.height = radius * 2;
        // WWsetAnchor(this);
    };
    //获得体重
    ElementBase.prototype.WWgetWeight = function () {
        return this.weight;
    };
    //获得事件编号
    ElementBase.prototype.WWgetEventID = function () {
        return this.eventType;
    };
    //获得类型id
    ElementBase.prototype.WWgetTypeID = function () {
        return this.elementID;
    };
    //死亡
    ElementBase.prototype.WWdie = function () {
        this.WWhide();
    };
    //喷射移动
    ElementBase.prototype.WWmoveFrom = function (xPos, yPos, angle, Dis) {
        this.isCanColliseSelf = false;
        xPos += Math.cos(angle) * Dis;
        yPos += Math.sin(angle) * Dis;
        var self = this;
        egret.Tween.get(this).to({ x: xPos, y: yPos }, GameConfig.jetTime, egret.Ease.quadOut).call(function () {
            //var width:number = sceneconfig.mapwidth/sceneconfig.scenewidth;
            //var height:number = sceneconfig.mapheight/sceneconfig.sceneheight;
            //var row:number = Math.floor(xPos/height);
            //var col:number = Math.floor(xPos/width);
            // ElementManage.WWgetInstance().WWpush(self);
            //self.row = row;
            //self.col = col;
            self.isCanColliseSelf = true;
            if (self.x < 0) {
                self.x = 0;
            }
            else if (self.x > this.mapWidth) {
                self.x = this.mapWidth;
            }
            if (self.y < 0) {
                self.y = 0;
            }
            else if (self.y > this.mapHeight) {
                self.y = this.mapHeight;
            }
        }, this);
    };
    //显示
    ElementBase.prototype.WWshow = function (parent) {
        if (!this.parent) {
            parent.addChild(this);
        }
    };
    //隐藏
    ElementBase.prototype.WWhide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return ElementBase;
}(egret.DisplayObjectContainer));
__reflect(ElementBase.prototype, "ElementBase");
/*年货枚举*/
var ELEMENT_ID;
(function (ELEMENT_ID) {
    ELEMENT_ID[ELEMENT_ID["id_juzi"] = 0] = "id_juzi";
    ELEMENT_ID[ELEMENT_ID["id_guazi"] = 1] = "id_guazi";
    ELEMENT_ID[ELEMENT_ID["id_common"] = 2] = "id_common";
    ELEMENT_ID[ELEMENT_ID["id_weight"] = 3] = "id_weight";
    ELEMENT_ID[ELEMENT_ID["id_penshe"] = 4] = "id_penshe"; //喷射物
})(ELEMENT_ID || (ELEMENT_ID = {}));
//# sourceMappingURL=ElementBase.js.map