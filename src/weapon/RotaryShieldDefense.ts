/**
 * class name : RotaryShieldBullet
 * 旋转盾子弹
*/
class RotaryShieldDefense extends Shield {

     //盾的防御距离
    public range: number;


    public speed: number = 5;
    private _darts: egret.Bitmap;

    public constructor(range: number) {
        super();
        this.range = range;
        this.tag = WeaponType.ROTARY_SHIELD;
        let c_width: number = Main.instance.gameView.player.width * 0.5 + range;
        //绘制圆圈
        var circle_img: egret.Shape = new egret.Shape();
        circle_img.graphics.lineStyle(2, Util.s_colors.red);
        circle_img.graphics.drawCircle(0, 0, c_width);
        circle_img.graphics.endFill();
        this.addChild(circle_img);
        //绘制盾
        this._darts = new egret.Bitmap(RES.getRes("game_rotary_shield_png"));
        this.addChild(this._darts);
        egret.Tween.get(this._darts,{loop:true}).to({rotation:360},3000); 
    }
    //盾与子弹碰撞
    public isCollsion(obj: Bullet,startCoord?: boolean, endCoord?: boolean){
        //判断碰撞
        if(Util.isCircleHit(obj,this,true,obj.width*0.5,this.range)){
            if(Util.isHit(obj,this,true)){
                return true;
            }
        } 
        return false;
    }
    
    public destructor(){
        egret.Tween.removeTweens(this._darts);
        if(this.parent){
            this.parent.removeChild(this);
        }
        if(this.whos != WhosShield.NONE){
            switch(this.whos){
                case WhosShield.PLAYER:
                {
                    let arr = Main.instance.gameView.battleMgr.shieldPlayer;
                    arr[this.index] = null;
                } break;
                case WhosShield.ENEMY:{
                    let arr = Main.instance.gameView.battleMgr.bulletsEnemy;
                    arr[this.index] = null;
                } break;
            }
        }
    }
}