// TypeScript file

/**
 * class name : HPTube
 * description : 血条
 * time : 2018.12.03
 * @author : 杨浩然
 */
class HPTube extends eui.Component
{   
    public hpBox: eui.Image; //血条框
    public hpFlow: eui.Image; //血条
    
    private hpMask: eui.Rect;//血条的遮罩
    private obj: Role;//挂载血条的对象
    private hpTempWid: number;

    public constructor(obj: Role, skinName: string){
        super();
        this.obj = obj;
        this.skinName = skinName;
        this.hpTempWid = this.hpMask.width;
    }

    /** 显示血条 */
    public showHp()
    {
        let rate = this.obj.HP / this.obj.MaxHP;
        this.hpMask.width = this.hpTempWid * rate;
    }
  

    public destructor()
    {
        if(this.parent) this.parent.removeChild(this);
        this.removeChildren();
        this.hpBox = null;
        this.hpFlow = null;
        this.hpMask = null;
        this.obj = null;
    }


//class end
}

window["HPTube"] = HPTube;