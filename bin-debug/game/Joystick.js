// TypeScript file
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
 * class name : Joystick
 * description : 摇杆
 * time : 2018.12.11
 * @author : 杨浩然
 */
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        _this.ishEnd = false; //是否触发了end事件
        _this.active = false; //是否激活
        _this.resetON = false; //是否需要抬手时清空手柄输出的信号
        _this.up = false; //向外输出一个手柄触摸抬起的信号
        _this.xAxis = 0; //x轴的偏移 [-1 ,1]
        _this.yAxis = 0; //y轴的偏移 [-1, 1]
        _this.angle = 0; //摇杆头相对于中心点的角度 [0, 360)
        _this.offset = 0; //力度偏移 [0, 1]
        return _this;
    }
    Object.defineProperty(Joystick.prototype, "XAxis", {
        get: function () { return this.xAxis; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Joystick.prototype, "YAxis", {
        get: function () { return this.yAxis; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Joystick.prototype, "Angle", {
        get: function () { return this.angle; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Joystick.prototype, "Offset", {
        get: function () { return this.offset; },
        enumerable: true,
        configurable: true
    });
    Joystick.prototype.createChildren = function () {
        this.skinName = "JoystickSkin";
        this.defaultAlpha = 0.3;
        this.defaultPoint = new egret.Point(this.x, this.y);
        this.joyDefaultPoint = new egret.Point(this.joystick.x, this.joystick.y);
        this.joyStartPoint = new egret.Point();
        this.joyMovePoint = new egret.Point();
        this.radius = this.joystickBg.width / 2;
    };
    Joystick.prototype.enable = function (event) {
        if (this.active)
            return;
        this.active = true;
        this.touchID = event.touchPointID;
        this.joyStartPoint.x = event.stageX, this.joyStartPoint.y = event.stageY;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Joystick.prototype.onTouchMove = function (event) {
        if (event.touchPointID != this.touchID)
            return;
        // console.log(" ===== onJoystickTouchMove ===== ");
        this.joyMovePoint.x = event.stageX;
        this.joyMovePoint.y = event.stageY;
        var distance = egret.Point.distance(this.joyStartPoint, this.joyMovePoint);
        if (distance <= this.radius) {
            this.joystick.x = this.joyDefaultPoint.x + (this.joyMovePoint.x - this.joyStartPoint.x);
            this.joystick.y = this.joyDefaultPoint.y + (this.joyMovePoint.y - this.joyStartPoint.y);
        }
        else {
            //joyStartPoint 和 joyMovePoint 是绝对坐标
            var point = egret.Point.interpolate(this.joyMovePoint, this.joyStartPoint, this.radius / distance);
            this.joystick.x = this.joyDefaultPoint.x + (point.x - this.joyStartPoint.x);
            this.joystick.y = this.joyDefaultPoint.y + (point.y - this.joyStartPoint.y);
        }
        //计算数据
        this.offset = (distance / this.radius) > 1 ? 1 : (distance / this.radius); //[0,1]
        this.xAxis = (this.joystick.x - this.joyDefaultPoint.x) / this.radius; //[-1,1]
        this.yAxis = -((this.joystick.y - this.joyDefaultPoint.y) / this.radius); //[-1,1]
        var sinTheta = (this.joystick.x - this.joyDefaultPoint.x) / this.radius;
        var theta = Math.abs(Math.asin(sinTheta) * (180 / Math.PI));
        this.angle = this.verifyAngleOfQuadrant(this.xAxis, this.yAxis, theta); //[0, 360)
        // console.log("joystick :: offset = " + this.offset + "  xAxis = " + this.xAxis + "  yAxis = " + this.yAxis + "  angle = " + this.angle);
    };
    Joystick.prototype.onTouchOutside = function (event) {
        if (event.touchPointID != this.touchID)
            return;
        // console.log(" ===== onJoystickTouchOutside ===== ");
        this.touchEnd();
    };
    Joystick.prototype.onTouchEnd = function (event) {
        if (event.touchPointID != this.touchID)
            return;
        // console.log(" ===== onJoystickTouchEnd ===== ");
        this.up = true; //向外输出一个手柄触摸抬起的信号，使用后记得重置
        this.touchEnd();
    };
    /** 当触摸结束时的处理工作 */
    Joystick.prototype.touchEnd = function () {
        //重置手柄的一些属性
        this.active = false;
        this.alpha = this.defaultAlpha;
        this.touchEnabled = false;
        this.x = this.defaultPoint.x;
        this.y = this.defaultPoint.y;
        this.joystick.x = this.joyDefaultPoint.x;
        this.joystick.y = this.joyDefaultPoint.y;
        //重置向外输出的数据信息
        if (this.resetON) {
            this.angle = 0;
            this.xAxis = 0;
            this.yAxis = 0;
            this.offset = 0;
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOutside, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    Joystick.prototype.verifyAngleOfQuadrant = function (xAxis, yAxis, theta) {
        if (xAxis > 0 && yAxis > 0) {
            return theta;
        }
        else if (xAxis < 0 && yAxis > 0) {
            return 360 - theta;
        }
        else if (xAxis < 0 && yAxis < 0) {
            return 180 + theta;
        }
        else if (xAxis > 0 && yAxis < 0) {
            return 180 - theta;
        }
        else if (xAxis == 0 && yAxis > 0) {
            return 0;
        }
        else if (xAxis == 0 && xAxis < 0) {
            return 180;
        }
        else if (xAxis > 0 && yAxis == 0) {
            return 90;
        }
        else if (xAxis < 0 && yAxis == 0) {
            return 270;
        }
        return 0;
    };
    return Joystick;
}(eui.Component));
__reflect(Joystick.prototype, "Joystick");
window["Joystick"] = Joystick;
