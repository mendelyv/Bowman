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
 * 游戏场景处理
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super.call(this) || this;
    }
    GameView.prototype.createChildren = function () {
        this.skinName = "GameViewSkin";
        this.initEvents();
        this.joyL.resetON = true; //打开左手手柄重置数据的开关
    };
    GameView.prototype.initEvents = function () {
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        // this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    /**每帧循环处理 */
    GameView.prototype.update = function () {
        var angle = this.joyL.Angle;
        var xAxis = this.joyL.XAxis;
        var yAxis = this.joyL.YAxis;
        var offset = this.joyL.Offset;
        this.role.move(xAxis, yAxis, angle, offset);
        if (this.joyR.up) {
            console.log(" ===== shoot ===== ");
            var element = new ElementBase();
            element.x = this.role.x;
            element.y = this.role.y;
            element.WWmoveFrom(this.role.x, this.role.y, this.joyR.Angle, 900);
            // element.rotation = this.joyR.Angle;
            this.elementGroup.addChild(element);
            // element.WWsetData();
            this.joyR.up = false;
        }
    };
    GameView.prototype.onTouchBegin = function (event) {
        var touchPoint = new egret.Point(event.stageX, event.stageY);
        if (touchPoint.x < (StageUtils.WIN_WIDTH * 0.5)) {
            if (this.joyL.active)
                return;
            // console.log(" ===== onViewTouchBegin left ===== ");
            this.joyL.x = touchPoint.x;
            this.joyL.y = touchPoint.y;
            this.joyL.alpha = 1;
            this.joyL.enable(event);
        }
        else {
            if (this.joyR.active)
                return;
            // console.log(" ===== onViewTouchBegin right ===== ");
            this.joyR.x = touchPoint.x;
            this.joyR.y = touchPoint.y;
            this.joyR.alpha = 1;
            this.joyR.enable(event);
        }
        this.touchEnabled = false;
    };
    return GameView;
}(eui.Component));
__reflect(GameView.prototype, "GameView");
