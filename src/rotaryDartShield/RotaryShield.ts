/**
 * 旋转盾
 */
class RotaryShield extends egret.DisplayObjectContainer {

    public static levelMax: number = 5;//最大等级
    public hasDefend: boolean;//是否有盾 

    private obj: Role;//持有对象
    private defendTime:number = 0;//
    private defendDelay: number = 5000;//防御间隔
    private previousFrameTime: number = 0;
    
    private _defend: egret.DisplayObjectContainer;//旋转盾

    public constructor(obj: Role) {
        super();
        this.defendDelay = 5000;
        this.obj = obj;
        this.previousFrameTime = egret.getTimer();
        this.hasDefend = false;
    }

    public enableDefend() {
        this.initDefense();
        this.obj.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    public update()
    {
        if(!this.hasDefend)
        {
            let deltaTime = egret.getTimer() - this.previousFrameTime;
            this.defendTime += deltaTime;
            if(this.defendTime >= this.defendDelay)
            {
                this.setDefend(true);
                this.defendTime = 0;
            }
        }
        this.previousFrameTime = egret.getTimer();
    }

    public setDefend(b:boolean)
    {
        this.hasDefend = b;
        this._defend.visible = this.hasDefend;
    }

    //
    public initDefense()
    {
        this._defend = new egret.DisplayObjectContainer();
        let dartImage = new egret.Bitmap(RES.getRes("game_handle_circle_png"));
        dartImage.anchorOffsetX = dartImage.width * 0.5;
        dartImage.anchorOffsetY = dartImage.height * 0.5;
        dartImage.x = 0;
        dartImage.y = 50;
        this._defend.addChild(dartImage);
        this._defend.x = this.obj.anchorOffsetX;
        this._defend.y = this.obj.anchorOffsetY;
        this.obj.addChild(this._defend);
        egret.Tween.get(this._defend, { loop: true }).to({ rotation: 360 }, 1000);
    }

    public recycle()
    {
        if (this._defend) {
            egret.Tween.removeTweens(this._defend);
            if (this._defend.parent) {
                this._defend.parent.removeChild(this._defend);
            }
            this._defend = null;
        }
        if (this.obj) {
            this.obj.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.obj = null;
        }
    }
}