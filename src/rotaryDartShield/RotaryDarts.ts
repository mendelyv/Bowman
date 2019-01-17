/**
 * class name : RotaryDarts
 * description : 旋转镖
 */
class RotaryDarts extends egret.DisplayObjectContainer {
    public static levelMax: number = 5;//最大等级
    public range: number;//武器攻击距离
    public level: number;//等级
    public damage: number;//伤害值

    private shootDelay: number = 1000;//攻击间隔
    private previousFrameTime: number = 0;
    private shootTime: number = 0;

    public mc: egret.MovieClip;
    private _darts: egret.DisplayObjectContainer;//旋转镖
    private obj: Role;//持有对象

    public constructor(obj: Role) {
        super();
        this.obj = obj;
        this.shootDelay = 1000;
        this.range = 100;
        this.level = 1;
        this.damage = this.obj.attribute.power;
        this.previousFrameTime = egret.getTimer();
    }

    public enableDart() {
        this.initDart();
        this.obj.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    public initDart() {
        //let circleWid = this.obj.width * 0.5 + this.range;
        //绘制圆圈
        // var circle_img: egret.Shape = new egret.Shape();
        // circle_img.graphics.lineStyle(2, Util.s_colors.red);
        // circle_img.graphics.drawCircle(0, 0,circleWid);
        // circle_img.graphics.endFill();
        // this.obj.addChild(circle_img);
        //绘制镖
        this.range = this.obj.width * 0.5 + this.range;
        this._darts = new egret.DisplayObjectContainer();
        let dartImage = new egret.Bitmap(RES.getRes("game_handle_circle_png"));
        dartImage.anchorOffsetX = dartImage.width * 0.5;
        dartImage.anchorOffsetY = dartImage.height * 0.5;
        dartImage.x = 0;
        dartImage.y = this.range;
        this._darts.addChild(dartImage);
        this._darts.x = this.obj.anchorOffsetX;
        this._darts.y = this.obj.anchorOffsetY;
        this.obj.addChild(this._darts);
        egret.Tween.get(this._darts, { loop: true }).to({ rotation: 360 }, this.shootDelay);
    }

    public update() {
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;
        this.previousFrameTime = egret.getTimer();

        if (this.shootTime >= this.shootDelay) {
            this.shootTime = 0;
            this.attack();
        }
    }

    public attack() {
        let aroundRoles: Array<Role> = this.obj.getAroundRoles(this.range);
        for (let i = 0; i < aroundRoles.length; ++i) {
            let role = aroundRoles[i];
            if(role.doDamage(this.damage))
            {
                if (!this.obj.die) {
                    if (this.obj.attribute.Hemophagia) {
                        this.obj.resumeBlood(this.damage * 0.5);
                    }

                    if (role.die) {
                        Main.instance.gameView.battleMgr.removeEnemyById(role.id);
                        this.obj.addExp(30 * (role.attribute.level + 1) * role.attribute.level);
                        //击杀回血
                        if (this.obj.attribute.KillOthenAddBlood) {
                            this.obj.resumeBlood(0.5 * this.obj.attribute.HpMax);
                        }
                    }
                }
            }
        }
    }

    public upLevel() {
        this.level++;
        if (this.level > RotaryDarts.levelMax) {
            this.level = RotaryDarts.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv() {
        this.range = (this.level - 1) * 20 + 200;
    }

    public recycle() {
        if (this._darts) {
            egret.Tween.removeTweens(this._darts);
            if (this._darts.parent) {
                this._darts.parent.removeChild(this._darts);
            }
            this._darts = null;
        }
        if (this.obj) {
            this.obj.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.obj = null;
        }
    }

    //class end
}