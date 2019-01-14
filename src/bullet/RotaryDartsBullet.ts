/**
 * class name : RotaryDartsBullet
 * description : 旋转镖子弹
 */
class RotaryDartsBullet extends Bullet {
    //动画
    public mc: egret.MovieClip;
    //武器攻击距离
    public range: number = 1;

    public speed: number = 5;
    private _darts: egret.Bitmap;
    private _hurtTime: number = 2000;//伤害计时，防止一直伤害
    private _oldTimer: number = 0;//之前记录的碰撞时间
    private _circleWid: number = 5;
    public constructor(range: number) {
        super();
        this.range = range;

        this._circleWid = Main.instance.gameView.player.width * 0.5 + range;
        //绘制圆圈
        var circle_img: egret.Shape = new egret.Shape();
        circle_img.graphics.lineStyle(2, Util.s_colors.red);
        circle_img.graphics.drawCircle(0, 0, this._circleWid);
        circle_img.graphics.endFill();
        this.addChild(circle_img);
        //绘制镖
        this._darts = new egret.Bitmap(RES.getRes("game_handle_circle_png"));
        this.addChild(this._darts);
        // this.init();
        egret.Tween.get(this._darts,{loop:true}).to({rotation:360},this._hurtTime); 
    }
    // private centerX: number = 300;
    // private centerY: number = 200;

    // private degree: number = 0;

    // public init() {
    //     if (!this.hasEventListener(egret.Event.ENTER_FRAME)) {
    //         this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    //     }
    // }

    // private enterFrameHandler(e: egret.Event) {
    //     let pt: egret.Point = egret.Point.polar(this._circleWid, this.degree * Math.PI / 180);
    //     this._darts.x = this.x + pt.x;
    //     this._darts.y = this.y + pt.y;
    //     this.degree += 5;
    // }
    /**碰撞检测 */
    public canDamage(obj: Role, startCoord?: boolean, endCoord?: boolean) {

        if ((egret.getTimer() - this._oldTimer) > this._hurtTime) {
            if (Util.isCircleHit(obj, this.parent, true, obj.width * 0.5, this._circleWid)) {
                if (Util.isCircleHit(obj, this, true)) {
                    this._oldTimer = egret.getTimer();
                    return true;
                }
            }
        }
        return false;
    }
    public isHitObstacal(): boolean {
        return false;
    }
    public destructor() {
        console.log(this.hashCode + " RotaryDartsBullet destructor  ");
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        egret.Tween.removeTweens(this._darts);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.whos != WhosBullet.NONE) {
            switch (this.whos) {
                case WhosBullet.PLAYER:
                    {
                        let arr = Main.instance.gameView.battleMgr.bulletsPlayer;
                        arr[this.index] = null;
                    } break;

                case WhosBullet.ENEMY:
                    {
                        let arr = Main.instance.gameView.battleMgr.bulletsEnemy;
                        arr[this.index] = null;
                    } break;
            }
        }

    }

    //class end
}