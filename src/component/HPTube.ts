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
    private hpGroup: eui.Rect;//放置血条线的容器
    private nameLabel:eui.Label;//玩家名字
    private obj: Role;//挂载血条的对象
    private hpTempWid: number;
    private oldHpMax:number=0;

    public constructor(obj: Role, skinName: string){
        super();
        this.obj = obj;
        this.skinName = skinName;
        this.hpTempWid = this.hpMask.width;
    }

    /** 显示血条 */
    public showHp()
    {
        let rate = this.obj.attribute.hp / this.obj.attribute.hpMax;
        this.hpMask.width = this.hpTempWid * rate;
        if(this.oldHpMax != this.obj.attribute.hpMax&&this.obj.attribute.hpMax - this.oldHpMax==100){
            this.oldHpMax = this.obj.attribute.hpMax;
            this.updateHpLine(this.obj.attribute.hpMax);
        }
        // this.showHpLine();
    }
    //显示玩家名字
    public showNickName(){
        this.nameLabel.text = this.obj.nickName;
    }
    /**添加血条分割线*/
    private showHpLine(){
        let start_x:number = 0  ;
        let start_y:number = 0 ;
        let lat_w:number = (this.hpFlow.width-(this.obj.attribute.hpMax/10 - 1)*2)/(this.obj.attribute.hpMax/10);//一格宽度
        for(let i:number = 0;i<this.obj.attribute.hpMax/10 - 1;i++){
             var line: egret.Bitmap = Util.createBitmap("hptube_line_png");
             line.width = 2;
             line.height = this.hpFlow.height;
             this.hpGroup.addChild(line);
             line.x = start_x + (i + 1)*(lat_w + line.width) - line.width;
             line.y = start_y;
        }
    }
    /**根据最大血量刷新血条分割线*/
    public updateHpLine(MaxHP:number){
        let start_x:number = 6 ;
        let start_y:number = 7 ;
        if(this.hpGroup){
        this.hpGroup.removeChildren();
        }
        let lat_w:number = (this.hpFlow.width-Math.floor((MaxHP/(100)) - 1)*2) /(MaxHP/(100));  //一格宽度
        if(MaxHP<200){
            return;
        }
        else{    
            for(let i:number = 0;i< Math.floor(MaxHP/(100)) - 1;i++){
                 var line: egret.Bitmap = Util.createBitmap("hptube_line_png");
                 line.width = 2;
                 line.height = this.hpFlow.height;
                 this.hpGroup.addChild(line);
                 line.x = start_x + (i + 1)*(lat_w + line.width) - line.width;
                 line.y = start_y;
            }
        }
      
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