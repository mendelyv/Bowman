/**
 * class name : RotaryShieldBullet
 * 旋转盾防具
*/
class RotaryShieldDefense extends Shield {

     //盾的防御距离
    public range: number = 1;

    public static levelMax: number = 5;//最大等级

    private _darts: egret.Bitmap;
    private _circleWid: number = 5;
    private _defenseTime:number = 1000;
    private _oldTime:number = 0;
    private _timeCount:number = 1;
    private _Text:egret.TextField;
	private _textBlink: BitmapBlink;

    public constructor(range: number) {
        super();
        //this.tag = SkillType.ROTARY_SHIELD;
        this.range = range;
        
        this._circleWid = Main.instance.gameView.player.width * 0.5 + range;
        //绘制圆圈
        var circle_img: egret.Shape = new egret.Shape();
        circle_img.graphics.lineStyle(2, Util.s_colors.green);
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
    
    //盾与子弹碰撞无敌
    public isCollsion(obj: Bullet,startCoord?: boolean, endCoord?: boolean){
        //判断碰撞
        if ((egret.getTimer() - this._oldTime) > this._defenseTime) {

            if (Util.isCircleHit(obj, this.parent, true, obj.width, this._circleWid)) {

                if (Util.isCircleHit(obj, this, true)) {
                    this._oldTime = egret.getTimer();
                    this._Text = new egret.TextField();
                    this._Text.text = "格挡";
                    this._Text.size = 20;
                    this._Text.textColor = Util.s_colors.black;
                    this._Text.textAlign = egret.HorizontalAlign.LEFT;
                    this._Text.x = this._darts.x + 20;
                    this._Text.y = this._darts.y + 20;
                    this.addChild(this._Text);
                    let downTimer: egret.Timer = new egret.Timer(1000, 1);
                    downTimer.start();
                    downTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.deleteText, this);
                    console.log("格挡掉一次伤害");
                    return true;
                }
            }
        }
        return false;
    }
    //删除格挡文字
    public deleteText(){
         if(this._Text){
            if(this._Text.parent){
                this._Text.parent.removeChild(this._Text);
            }
        }
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