/**
 * 旋转盾
 */
class RotaryShield extends egret.DisplayObjectContainer
{
    public static levelMax: number = 5;//最大等级
    public range: number;//武器防御距离
    public level: number;//等级

    private shootDelay: number = 1000;//攻击间隔
    private previousFrameTime: number = 0;
    private shootTime: number = 0;

    private _darts: egret.DisplayObjectContainer;
    private obj: Role;//持有这个武器的对象

    public constructor(obj: Role) {
        super();
        this.obj = obj;
        this.shootDelay = 1000;
        this.range = 50;
        this.level = 1;
        this.previousFrameTime = egret.getTimer();
    }

    public enableDart()
    {
        this.initDart();
        this.obj.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    public initDart()
    {
        //绘制盾
        this.range = this.obj.width * 0.5 + this.range;
        this._darts = new egret.DisplayObjectContainer();
        let dartImage = new egret.Bitmap(RES.getRes("game_rotary_shield_png"));
        dartImage.x = 0;
        dartImage.y = this.range;
        dartImage.width = dartImage.width * 0.5;
        dartImage.height = dartImage.height * 0.5;
        dartImage.anchorOffsetX = dartImage.width * 0.5;
        dartImage.anchorOffsetY = dartImage.height * 0.5;
        this._darts.addChild(dartImage);
        // this.width = this._darts.width;
        // this.height = this._darts.height;
        this._darts.x = this.obj.anchorOffsetX;
        this._darts.y = this.obj.anchorOffsetY;
        this.obj.addChild(this._darts);
        egret.Tween.get(this._darts,{loop:true}).to({rotation:360},this.shootDelay); 
    }

    public update()
    {
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;
        this.previousFrameTime = egret.getTimer();

        if(this.shootTime >= this.shootDelay)
        {
            this.shootTime = 0;
            this.defense();
        }
    }
    //防御
    public defense() 
    {
        
    }

    public upLevel() {
        this.level++;
        if (this.level > RotaryShield.levelMax) {
            this.level = RotaryShield.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv() {
        this.range = (this.level - 1) * 20 + 200;
    }

    public recycle()
    {
        if(this._darts)
        {
            egret.Tween.removeTweens(this._darts);
            if(this._darts.parent)
            {
                this._darts.parent.removeChild(this._darts);
            }
            this._darts = null;
        }
        if(this.obj)
        {
            this.obj.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
    }

    //class end
}