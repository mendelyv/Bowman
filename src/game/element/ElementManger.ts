/**
 * 元素管理类
 * 
 */
class ElementManger{
    /**年货道具数组*/
    private eleArray:Array<any>;
    // /**道具对象池*/
     private elePool:ObjectPool;
    /**元素父节点*/
    public parent:egret.DisplayObjectContainer;
    static Em:ElementManger = null;

    static EmgetInstance():ElementManger{
        if(!this.Em){
            this.Em = new ElementManger;
        }
        return this.Em;
    }
    constructor(){
     this.init();
    }
    private init(){
          this.eleArray = [];
       // let element: ElementBase;
        //element = new ElementBase(); 
      this.elePool = ObjectPool.getPool("ElementBase",-1);

       for(var i:number = 0;i<sceneconfig.sceneheight;i++){
           this.eleArray[i] = [];
           for(var j:number = 0;j<sceneconfig.scenewidth;j++){
               this.eleArray[i][j] = [];
           }
       }
    }
    /**创建区域式元素*/
    public createEleBy2D():void{
        var width:number = sceneconfig.mapwidth/sceneconfig.scenewidth;
        var height:number = sceneconfig.mapheight/sceneconfig.sceneheight;
        for(var i:number = 0;i<1000;i++){
            /**年货道具随机数*/
            var variety:number = this.randomNum(0,3);
            //道具类型
            var elem:ElementBase = this.elePool.getObject();
            var data:any = elementconfig.WWgetSpringCargoDataById(variety);
            elem.WWsetData(variety,data.weight,data.event);
            var R:number = elem.width/2;
            elem.x = this.randomNum(R,width - R);
            elem.y = this.randomNum(R,height - R);
            /**随机行和列*/
            var row:number = this.randomNum(0,sceneconfig.sceneheight - 1);
            var col:number = this.randomNum(0,sceneconfig.scenewidth - 1);
            elem.x += col*width;
            elem.y += row*height;
            elem.row = row;
            elem.col = col;
            this.parent.addChild(elem);
            this.eleArray[row][col].push(elem);
        }
    }
    /**重设（重新玩的时候调用）*/
    public againPlay():void{
        var end :number = this.parent.numChildren;
        for(var i:number = 0;i<end;i++){
            this.elePool.returnObject(<ElementBase>this.parent.getChildAt(i));
        }
        for(var i:number = 0;i<sceneconfig.sceneheight;i++){
            this.eleArray[i] = [] ;//清空道具数组
            for(var j:number = 0;j<sceneconfig.scenewidth;j++){
                this.eleArray[i][j] = [];
            }
        }
    }
    /**创建一个元素*/
    public createOneElement():ElementBase{
        return this.elePool.getObject();
    }

    /**元素碰撞事件处理回调*/
    public WWeleCallBack(ele:ElementBase):void{
        switch (ele.WWgetTypeID())
        {
            case ELEMENT_ID.id_weight:/*增加经验道具*/
                this.WWweightCallBack(ele);
                break;
        }
    }
    /**体重道具碰撞回调*/
    private WWweightCallBack(ele:ElementBase):void{
        switch (ele.WWgetEventID())
        {
            // case WEIGHT_EVENT_ID.PROP_EVENT_add_fixed_weight:/*增加固定体重*/
            //     spore.WWeat(ele.WWgetWeight()+10);
            //     break;
            // case WEIGHT_EVENT_ID.PROP_EVENT_add_percent_weight:/*增加百分比体重*/
            //     spore.WWeat(spore.weight*0.01);
            //     break;
        }
    }
    //删除年货
    public WWdelEle(ele:ElementBase):void{
        for(var i:number = 0;i<this.eleArray[ele.row][ele.col].length;i++)
        {
            if(this.eleArray[ele.row][ele.col] == ele)
            {
                ele.WWdie();
                this.elePool.returnObject(ele);
                this.eleArray[ele.row][ele.col].splice(i,1);
                break;
            }
        }
    }
    /**获取元素数组*/
    public getElementArr():any{
        return this.eleArray;
    }
    /**获取一个指定范围的随机数*/
    public randomNum(Min:number,Max:number):number{
        var c = Max-Min+1;
        return Math.floor(Math.random()*c+Min);
    }
}
