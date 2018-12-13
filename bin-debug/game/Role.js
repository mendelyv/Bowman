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
/**角色类 */
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.speed = 5;
        _this.angle = 0; //如果等于-100代表停止
        _this.xSpeed = 0;
        _this.ySpeed = 0;
        _this.radius = 0; //半径
        _this.friction = 0.1; //摩擦力
        _this.frictionX = 0;
        _this.frictionY = 0;
        return _this;
    }
    Role.prototype.createChildren = function () {
        this.skinName = "RoleSkin";
        this.radius = this.width;
    };
    //根据角度设置x~y轴的速率
    Role.prototype.moveToByAngle = function (angle) {
        if (angle <= Math.PI) {
            this.xSpeed = Math.cos(angle) * this.speed;
            this.ySpeed = Math.sin(angle) * this.speed;
        }
        else if (this.angle <= Math.PI) {
            this.frictionX = Math.cos(this.angle) * this.friction;
            this.frictionY = Math.sin(this.angle) * this.friction;
            //this.xSpeed = 0;
            //this.ySpeed = 0;
        }
        this.angle = angle;
    };
    Role.prototype.move = function (xAxis, yAxis, angle, offset) {
        //获得速度
        // if(this.angle > Math.PI) {
        //     if(this.xSpeed == 0) {
        //     }else if(Math.abs(this.xSpeed) <= Math.abs(this.frictionX)) {
        //         this.xSpeed = 0;
        //     } else {
        //         this.xSpeed -= this.frictionX;
        //     }
        //     if(this.ySpeed == 0) {
        //     }else if(Math.abs(this.ySpeed) <= Math.abs(this.frictionY)) {
        //         this.ySpeed = 0;
        //     } else{
        //         this.ySpeed -= this.frictionY;
        //     }
        // }
        this.tempX = this.x + xAxis * this.speed * offset;
        this.tempY = this.y + (-yAxis * this.speed * offset);
        // console.log(this.xSpeed);
        // console.log(this.ySpeed);
        //左右碰边判断
        // if(this.tempX-this.radius > 0 && this.tempX+this.radius < this.mapWidth) {
        this.x = this.tempX;
        // } else {
        //     if(this.tempX-this.radius < 0 && this.xSpeed>0)
        //     {
        //         this.x = this.tempX;
        //     }
        //     else if(this.tempX+this.radius > this.mapWidth && this.xSpeed<0)
        //     {
        //         this.x = this.tempX;
        //     }
        //     else
        //     {
        //         this.xSpeed = 0;
        //     }
        // }
        //上下碰边判断
        // if(this.tempY-this.radius > 0 && this.tempY+this.radius < this.mapHeight) {
        this.y = this.tempY;
        // } else {
        //     if(this.tempY-this.radius < 0 && this.ySpeed>0)
        //     {
        //         this.y = this.tempY;
        //     }
        //     else if(this.tempY+this.radius > this.mapHeight && this.ySpeed<0)
        //     {
        //         this.y = this.tempY;
        //     }
        //     else
        //     {
        //         this.ySpeed = 0;
        //     }
        // }
    };
    return Role;
}(eui.Component));
__reflect(Role.prototype, "Role");
window["Role"] = Role;
//# sourceMappingURL=Role.js.map