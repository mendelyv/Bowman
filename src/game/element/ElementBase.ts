/**
 * 元素基类（包括年货，道具）
 */
class ElementBase extends egret.DisplayObjectContainer{
    /**元素的id，用于获取纹理*/
    private elementID:number;
    /**体重*/
    private weight:number;
    /**事件类型*/
    private eventType:number;
    /**是否可以碰撞自己*/
    public isCanColliseSelf:boolean;
    /**行列*/
    public row:number;
    public col:number;

    /**纹理*/
    private img:egret.Bitmap;
    /**泡泡*/
    private paopao:egret.Bitmap;

    constructor(){
        super();
        this.img = new egret.Bitmap;
        this.addChild(this.img);
        this.paopao = Util.createBitmap("element_penshe_png");
        this.addChild(this.paopao);
    }

    /**根据id获得纹理*/
    static WWgetBitmapByID(id:number):string{
        var fn:string = null;
        switch (id){
            case ELEMENT_ID.id_common://普通吞噬物
                var rand:number = Util.getRandomRange(0,3);
                fn = "element_common_"+rand+"_png";
                break;
            case ELEMENT_ID.id_juzi://橘子
                fn = "element_juzi_png";
                break;
            case ELEMENT_ID.id_guazi://瓜子
                fn = "element_guazi_png";
                break;
            case ELEMENT_ID.id_weight://体重增加
                fn = "element_weight_png";
                break;
            case ELEMENT_ID.id_penshe://喷射物
                fn = "element_penshe_png";
                break
        }
        return fn;
    }

    /**设置数据(事件=-1代表没事件发生)*/
    public WWsetData(elementID:number,weight:number,eventType:number):void{
        this.elementID = elementID;
        this.weight = weight;
        this.eventType = eventType;
        this.isCanColliseSelf = false;


         this.img.texture = RES.getRes(ElementBase.WWgetBitmapByID(elementID));

        //获得半径
        var radius:number = 200//attributeconfig.WWgetRadiusByWeight(weight);
        this.img.width = radius*0.15;
        this.img.height = radius*0.15;
        this.paopao.width = radius*0.15;
        this.paopao.height = radius*0.15;
        this.width = radius*0.15;
        this.height = radius*0.15;
         //WWsetAnchor(this);
    }

    /**获得事件编号*/
    public WWgetEventID():number{
        return this.eventType;
    }

    /**获得类型id*/
    public WWgetTypeID():number{
        return this.elementID;
    }

    /**死亡*/
    public WWdie():void{
        this.WWhide();
    }

    /**喷射移动*/
    public WWmoveFrom(xPos:number, yPos:number, angle:number,Dis:number):void{
        this.isCanColliseSelf = false;
        xPos += Math.cos(angle)*Dis;
        yPos += Math.sin(angle)*Dis;
        var self = this;
        egret.Tween.get(this).to({ x: xPos,y: yPos },GameConfig .jetTime,egret.Ease.quadOut).call(function():void{
            //var width:number = sceneconfig.mapwidth/sceneconfig.scenewidth;
            //var height:number = sceneconfig.mapheight/sceneconfig.sceneheight;
            //var row:number = Math.floor(xPos/height);
            //var col:number = Math.floor(xPos/width);
            // ElementManage.WWgetInstance().WWpush(self);
            //self.row = row;
            //self.col = col;
            // self.isCanColliseSelf = true;
            // if(self.x < 0){
            //     self.x = 0;
            // }else if(self.x > this.mapWidth){
            //     self.x = this.mapWidth;
            // }
            // if(self.y < 0){
            //     self.y = 0;
            // }else if(self.y > this.mapHeight){
            //     self.y = this.mapHeight;
            // }
        },this);
    }

    /**显示*/
    public WWshow(parent:egret.DisplayObjectContainer):void{
        if(!this.parent)
        {
            parent.addChild(this);
        }
    }

    /**隐藏*/
    public WWhide():void{
        this.parent && this.parent.removeChild(this);
    }
}

