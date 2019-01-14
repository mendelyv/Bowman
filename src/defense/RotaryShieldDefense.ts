/**
 * class name : RotaryShieldBullet
 * 旋转盾防具
*/
class RotaryShieldDefense extends Shield {

     //盾的防御距离
    public range: number = 1;

    private _darts: egret.Bitmap;
    private _circleWid: number = 5;
    private _defenseTime:number = 2000;
    private _oldTime:number = 0;
    public constructor(range: number) {
        super();
        this.tag = WeaponType.ROTARY_SHIELD;
        this.range = range;
        this._circleWid = Main.instance.gameView.player.width * 0.5 + range;
        //绘制圆圈
        var circle_img: egret.Shape = new egret.Shape();
        circle_img.graphics.lineStyle(2, Util.s_colors.red);
        circle_img.graphics.drawCircle(0, 0, this._circleWid);
        circle_img.graphics.endFill();
        this.addChild(circle_img);
        //绘制盾
        this._darts = new egret.Bitmap(RES.getRes("game_rotary_shield_png"));
        this._darts.width = this._darts.width * 0.5;
        this._darts.height = this._darts.height * 0.5;
        this.addChild(this._darts);
        egret.Tween.get(this._darts,{loop:true}).to({rotation:360},this._defenseTime); 
    }
    
    //盾与子弹碰撞
    public isCollsion(obj: Bullet,startCoord?: boolean, endCoord?: boolean){
        //判断碰撞
        if((egret.getTimer() - this._oldTime) > this._defenseTime){
            if(Util.isCircleHit(obj,this,true,obj.width*0.5,this._circleWid)){
                if(Util.isCircleHit(obj,this,true)){
                return true;
                }
            } 
        }
        return false;
    }
    
    public destructor(){
        egret.Tween.removeTweens(this._darts);
        if(this.parent){
            this.parent.removeChild(this);
        }
        if(this.whos != whosWeapon.NONE){
            switch(this.whos){
                case whosWeapon.PLAYER:
                {
                    let arr = Main.instance.gameView.battleMgr.shieldPlayer;
                    arr[this.index] = null;
                } break;
                case whosWeapon.ENEMY:{
                    let arr = Main.instance.gameView.battleMgr.bulletsEnemy;
                    arr[this.index] = null;
                } break;
            }
        }
    }
}