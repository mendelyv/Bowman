  /**
	* tips特效汇总
    */
module TipsUtils {

    //从下到上弹出
    export function showTipsDownToUp(str:string = "",isWarning:boolean = false,e_size:number=26,disTime:number =1000):void{
        var effectTips = new egret.TextField();
        effectTips.size = e_size;
        effectTips.y = StageUtils.WIN_HEIGHT*0.5;
        if(isWarning){
            effectTips.textColor = Util.s_colors.red;
        }else{
            effectTips.textColor = Util.s_colors.lightBlue;//0x2dac00;
        }
        effectTips.alpha = 0;
        effectTips.width = StageUtils.WIN_WIDTH;
        effectTips.text = str;
        //effectTips.strokeColor = 0x000000;
        effectTips.x = StageUtils.WIN_WIDTH*0.5 - effectTips.width*0.5;
        //effectTips.stroke  = 2;
        //effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;
        if(!Main.instance.contains(effectTips)){
            Main.instance.addChild( effectTips );
        }

        var onComplete2:Function = function(){
            if(Main.instance.contains(effectTips)){
                Main.instance.removeChild( effectTips );
            }
            egret.Tween.removeTweens(effectTips);//清空Tween
            effectTips = null;
        };
        var onComplete1:Function = function(){
            egret.Tween.get(effectTips).to({alpha:0},disTime).call(onComplete2,this);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({y:effectTips.y - 120,alpha:1},1000,egret.Ease.backOut).call(onComplete1,this);
    }    

    //从左至右 或者 从右至左
//    export function showTipsLeftOrRight(str:string = "",isWarning:boolean = false,isFromeLeft:boolean = true):void{
//        var effectTips = new egret.TextField();
//
//        effectTips.size = 24;
//        effectTips.y = StageUtils.WIN_HEIGHT*0.5;
//        if(isWarning){
//            effectTips.textColor = Util.s_colors.red;
//        }else{
//            effectTips.textColor = Util.s_colors.green;
//        }
//        effectTips.alpha = 0;
//
//        effectTips.text = str;
////        effectTips.strokeColor = 0x000000;
//        if(isFromeLeft){
//            effectTips.x = - effectTips.width;
//        }else{
//            effectTips.x = StageUtils.WIN_WIDTH;
//        }
////        effectTips.stroke  = 2;
////        effectTips.bold = true;
//        effectTips.textAlign = egret.HorizontalAlign.CENTER;
//
//        //if(!SceneMgr.instance.getUILayer().contains(effectTips)){
//        //    SceneMgr.instance.getUILayer().addChild(effectTips);
//        //}
//        var midW:number = StageUtils.WIN_WIDTH*0.5;
//        if(isFromeLeft){
//            egret.Tween.get(effectTips).to({x:midW - effectTips.width*0.5 - 50,alpha:1},300,egret.Ease.sineInOut);
//        }else{
//            egret.Tween.get(effectTips).to({x:midW - effectTips.width*0.5 + 50,alpha:1},300,egret.Ease.sineInOut);
//        }
//
//        egret.setTimeout(function () {
//            if(isFromeLeft){
//                egret.Tween.get(effectTips).to({x:effectTips.x + 100},500);
//            }else{
//                egret.Tween.get(effectTips).to({x:effectTips.x - 100},500);
//            }
//        }, this, 300);
//
//        egret.setTimeout(function () {
//            if(isFromeLeft){
//                egret.Tween.get(effectTips).to({x:StageUtils.WIN_WIDTH},300,egret.Ease.sineIn);
//            }else{
//                egret.Tween.get(effectTips).to({x:-effectTips.width},300,egret.Ease.sineIn);
//            }
//        }, this, 800);
//
//        egret.setTimeout(function () {
//            //if(SceneMgr.instance.getUILayer().contains(effectTips)){
//            //    SceneMgr.instance.getUILayer().removeChild( effectTips);
//            //}
//            effectTips = null;
//        }, this, 1100);
//    }
//    //从里到外
//    export function showTipsFromCenter(str:string = "",isWarning:boolean = false):void{
//        var effectTips = new egret.TextField();
//
//        effectTips.size = 24;
//        effectTips.y = StageUtils.WIN_HEIGHT*0.5;
//        if(isWarning){
//            effectTips.textColor = Util.s_colors.red;
//        }else{
//            effectTips.textColor = Util.s_colors.green;
//        }
//        effectTips.alpha = 0;
//
//        effectTips.text = str;
//        effectTips.strokeColor = 0x000000;
//        effectTips.x = StageUtils.WIN_WIDTH/2;
//        effectTips.stroke  = 2;
//        effectTips.bold = true;
//        effectTips.textAlign = egret.HorizontalAlign.CENTER;
////        if(!GameLayerManager.gameLayer().effectLayer.contains(effectTips)){
////            GameLayerManager.gameLayer().effectLayer.addChild( effectTips );
////        }
//
//        effectTips.anchorOffsetX = effectTips.width/2;
//        effectTips.anchorOffsetY = effectTips.height/2;
//        effectTips.scaleX = 0;
//        effectTips.scaleY = 0;
//
//        var onComplete2:Function = function(){
////            if(GameLayerManager.gameLayer().effectLayer.contains(effectTips)){
////                GameLayerManager.gameLayer().effectLayer.removeChild( effectTips );
////            }
//            effectTips = null;
//        };
//        egret.Tween.get(effectTips).to({scaleX:1,scaleY:1,alpha:1},200);
//        egret.setTimeout(function () {
//            egret.Tween.get(effectTips).to({alpha:0},500).call(onComplete2,this);
//        }, this, 1000);
//    }
//    //从外到里
//    export function showTipsBigToSmall(str:string = "",isWarning:boolean = false):void{
//        var effectTips = new egret.TextField();
//
//        effectTips.size = 24;
//        effectTips.y = StageUtils.WIN_HEIGHT*0.5;
//        if(isWarning){
//            effectTips.textColor = Util.s_colors.red;
//        }else{
//            effectTips.textColor = Util.s_colors.green;
//        }
//        effectTips.alpha = 0;
//
//        effectTips.text = str;
//        effectTips.strokeColor = 0x000000;
//        effectTips.x = StageUtils.WIN_WIDTH*0.5;
//        effectTips.stroke  = 2;
//        effectTips.bold = true;
//        effectTips.textAlign = egret.HorizontalAlign.CENTER;
////        if(!GameLayerManager.gameLayer().effectLayer.contains(effectTips)){
////            GameLayerManager.gameLayer().effectLayer.addChild( effectTips );
////        }
//
//        effectTips.anchorOffsetX = effectTips.width *0.5;
//        effectTips.anchorOffsetY = effectTips.height*0.5;
//        effectTips.scaleX = 4;
//        effectTips.scaleY = 4;
//
//        var onComplete2:Function = function(){
////            if(GameLayerManager.gameLayer().effectLayer.contains(effectTips)){
////                GameLayerManager.gameLayer().effectLayer.removeChild( effectTips );
////            }
//            effectTips = null;
//        };
//        egret.Tween.get(effectTips).to({scaleX:1,scaleY:1,alpha:1},200);
//        egret.setTimeout(function () {
//            egret.Tween.get(effectTips).to({alpha:0},500).call(onComplete2,this);
//        }, this, 1000);
//    }
}