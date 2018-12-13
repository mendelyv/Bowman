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
var GameBg = (function (_super) {
    __extends(GameBg, _super);
    function GameBg() {
        return _super.call(this) || this;
    }
    return GameBg;
}(eui.Component));
__reflect(GameBg.prototype, "GameBg");
//# sourceMappingURL=GameBg.js.map