// /**
//  * 数字类
//  */
// class NumObj extends egret.DisplayObjectContainer{
//    private numImage:egret.SpriteSheet;//集合位图
//    private idStr:string;//数字索引
//    private spaceX:number;//数字X轴间隔
//    private numArr:Array<egret.Bitmap>;//数字图片集合

//    /**
//     * 初始化数字图片
//     * @param id        数字位数
//     * @param numStr    纹理名称
//     * @param idStr     数字索引
//     * @param space_x   数字X轴间隔
//     */
//    public constructor(id:number,numStr:string,idStr:string,space_x:number=0){
//        super();
//        this.numArr=[];
//        this.numImage = RES.getRes(numStr);
//        this.idStr=idStr;
//        this.spaceX=space_x;
//        for(var i=0;i<id;i++){
//            var numObj:egret.Bitmap = new egret.Bitmap();
//            numObj.texture = this.numImage.getTexture(this.idStr+i);
//            numObj.visible=false;
//            numObj.x=(numObj.width+space_x)*i;
//            this.numArr.push(numObj);
//            this.addChild(numObj);
//        }
//    }

//    /**
//     * 数字字符串转成数字显示
//     * @param str    数字索引
//     */
//    public setNum(str:string):void{
//        var num=this.numArr.length;
//        var hasNum=str.length;
//        for(var i:number=0;i<num;i++){
//            var numObj=this.numArr[i];
//            if(i<hasNum){
//                var id:string=str.substr(i,1);
//                numObj.texture = this.numImage.getTexture(this.idStr+id);
//                numObj.visible=true;
//            }else{
//                numObj.visible=false;
//            }
//        }
//    }

// }