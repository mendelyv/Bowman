/**
 * class name : RotaryDartsBullet
 * description : 旋转镖子弹
 */
class RotaryDartsBullet extends Bullet {
    //动画
    public mc: egret.MovieClip;
    //武器攻击距离
    public range: number;


    public speed: number = 5;
    private _darts: egret.Bitmap;

    public constructor(range: number) {
        super();
        this.range = range;
  
        let c_width: number = Main.instance.gameView.player.width * 0.5 + range;
        //绘制圆圈
        var circle_img: egret.Shape = new egret.Shape();
        circle_img.graphics.lineStyle(2, Util.s_colors.red);
        circle_img.graphics.drawCircle(0, 0, c_width);
        circle_img.graphics.endFill();
        this.addChild(circle_img);
        //绘制镖
        this._darts = new egret.Bitmap(RES.getRes("game_handle_circle_png"));
        this.addChild(this._darts);
        egret.Tween.get(this._darts,{loop:true}).to({rotation:360},3000); 

    }
 

    public canDamage(obj: Role, needTrans: boolean) {
        super.canDamage(obj, needTrans);
        //如果圆形碰撞了
        if (Util.isCircleHit(obj, this.parent, true, obj.width *0.5, this.range)) {
            //计算前的准备工作
            // let obj1Point = new egret.Point(obj.x, obj.y);
            // let selfPoint = new egret.Point(this.x, this.y);
            // if (needTrans) {
            //     if (obj.parent) obj.parent.localToGlobal(obj.x, obj.y, obj1Point);
            //     if (this.parent) this.parent.localToGlobal(this.x, this.y, selfPoint);
            // }
            if(Util.isHit(obj,this._darts,true))
            {
                return true;
            }
        }
        return false;
    }
   
    public destructor() {
        // console.log(this.hashCode + "  destructor  ");
        egret.Tween.removeTweens(this._darts);
        if (this.parent)
            this.parent.removeChild(this);
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