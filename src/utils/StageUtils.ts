/**
 * Stage相关工具类
 */
class StageUtils /*extends BaseClass */{

    /**
     * 构造函数
     */
    public constructor() {
        // super();
    }

    static fit_scale: number;//适配缩放值
    static fit_scaleX: number;//宽度适配值
    static fit_scaleY: number;//高度适配值

    static GAME_WIDTH: number = 1334;//480;//游戏的宽
    static GAME_HEIGHT: number = 750;//800;//游戏的高

    static WIN_WIDTH: number;//屏幕实际宽
    static WIN_HEIGHT: number;//屏幕实际高

    /**
     * 初始化缩放比例
     * @param game_width  设置游戏宽度
     * @param game_height 设置游戏高度
     */
    public static initScale(game_width: number, game_height: number) {
        StageUtils.WIN_WIDTH = game_width;
        StageUtils.WIN_HEIGHT = game_height;
        if (game_width > 1500) {
            game_width = StageUtils.GAME_WIDTH;
        }
        StageUtils.fit_scaleX = game_width / StageUtils.GAME_WIDTH;
        StageUtils.fit_scaleY = game_height / StageUtils.GAME_HEIGHT;
        if (StageUtils.fit_scaleX > StageUtils.fit_scaleY) {
            StageUtils.fit_scale = StageUtils.fit_scaleY;
        }
        else {
            StageUtils.fit_scale = StageUtils.fit_scaleX;
        }
        Util.logInfo('WIN_WIDTH=', StageUtils.WIN_WIDTH, ' WIN_H=', StageUtils.WIN_HEIGHT, ' fit_scale=', StageUtils.fit_scale, ' fit_scaleX=', StageUtils.fit_scaleX, ' fit_scaleY=', StageUtils.fit_scaleY);
    }

    /**
     * @method 根据屏幕的宽高比例设置对象的位置以及缩放适配
     * @param {egret.DisplayObject} obj - 需要适配的对象
     * @param {number} x - 需要赋值的x
     * @param {number} y - 需要赋值的y
     */
    public static setPos(obj: egret.DisplayObject, x: number = null, y: number = null) {
        //var fit_x = x/GAME_WIDTH;
        //var fit_y = y/GAME_HEIGHT;
        //obj.x = fit_x*game.width;
        //obj.y = fit_y*game.height;
        var pt;
        if (x == null || y == null) {
            pt = StageUtils.getFitPos(obj.x, obj.y);
        }
        else {
            pt = StageUtils.getFitPos(x, y);
        }

        obj.x = pt.x;
        obj.y = pt.y;

        obj.scaleX = obj.scaleY = StageUtils.fit_scale;
    }

    /**
     * @method 根据屏幕的宽高比例获得一个点的适合的比例位置
     * @param {number} x - 需要赋值的x
     * @param {number} y - 需要赋值的y
     */
    public static getFitPos(x: number, y: number) {
        var fit_x: number = x / StageUtils.GAME_WIDTH;
        var fit_y: number = y / StageUtils.GAME_HEIGHT;

        var fx: number = fit_x * StageUtils.WIN_WIDTH;
        var fy: number = fit_y * StageUtils.WIN_HEIGHT;

        return { x: fx, y: fy };
    }
    /**
     * return 获取屏幕宽度减去游戏定义宽度的距离
     */
    public static getWidthDisWG(): number {
        let win_width: number = StageUtils.WIN_WIDTH;
        let game_width: number = StageUtils.GAME_WIDTH;
        let dis: number = win_width - game_width;
        return dis;
    }
    /**
     * return 获取屏幕高度减去游戏定义高度的距离
     */
    public static getHeightDisWG(): number {
        let win_height: number = StageUtils.WIN_HEIGHT;
        let game_height: number = StageUtils.GAME_HEIGHT;
        let dis: number = win_height - game_height;
        return dis;
    }
    /**
     * @method 设置锚点为中心点
     * @param {egret.DisplayObject} obj - 需要缩放的对象
     * @param {number} x - 需要赋值的缩放x
     * @param {number} y - 需要赋值的缩放y
     */
    public static setAnchor(obj: egret.DisplayObject, x: number = 0.5, y: number = null) {
        if (y == null) {
            obj.anchorOffsetX = obj.width * x;
            obj.anchorOffsetY = obj.height * x;
        }
        else {
            obj.anchorOffsetX = obj.width * x;
            obj.anchorOffsetY = obj.height * y;
        }
    }
    /**
     * @method 根据已计算好的缩放适配去比例设置缩放
     * @param {egret.DisplayObject} obj - 需要缩放的对象
     * @param {number} x - 需要赋值的缩放x
     * @param {number} y - 需要赋值的缩放y
     */
    public static setScale(obj: egret.DisplayObject, x: number, y: number = null) {
        if (y == null) {
            obj.scaleX = obj.scaleY = x * StageUtils.fit_scale;
        }
        else {
            obj.scaleX = x * StageUtils.fit_scale;
            obj.scaleY = y * StageUtils.fit_scale;
        }
    }
    /**
     * 显示视窗
     * @method windowName {F.WindowName} 要显示的视窗名称
     * @param parentName {F.WindowName} 目标视窗，默认为UI_LAYER
     * @param modal {boolean} 是否使用遮罩层，默认为false
     * @param modalAlpha {number} 遮罩层透明度，默认为0.5
     * @param isRemove {boolean} 点击遮罩是否关闭当前视窗，默认为true
     * @param windowWidth {boolean} 弹窗宽度（仅用于弹窗动画定位），默认为0
     * @param windowHeight {boolean} 弹窗高度（仅用于弹窗动画定位），默认为0
     * @param effectType {boolean} 弹窗效果（0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上），默认为0
     * @param isAlert {boolean} 是否为弹窗（仅用于弹窗动画），默认为false
     * */
    //public addPopUp(windowName:F.WindowName, parentName:F.WindowName = F.WindowName.UI_LAYER, modal:boolean = false, modalAlpha:number = 0.5, isRemove:boolean = true, windowWidth:number = 0, windowHeight:number = 0, effectType:number = 0, isAlert:boolean = false):boolean {
    //    var window:WindowEntity = this.windowMap.get(windowName);
    //    var parent:WindowEntity = this.windowMap.get(parentName);
    //    if(window && parent){
    //        if(!this.hasPopUp(windowName) && parent.controller.getElementIndex(window.controller) == -1){// 重复判断显示列表是为了避免界面延迟隐藏造成的连击bug
    //            var entity = this.popUpPool.length > 0 ? this.popUpPool.shift() : new PopUpEntity();
    //            entity.windowName = windowName;
    //            entity.parentName = parentName;
    //            entity.batchRemove = window.batchRemove;
    //            this.popUpMap.set(windowName, entity);
    //            if(modal){
    //                this.addModal(entity, modalAlpha, isRemove);
    //            }
    //            parent.controller.addElement(window.controller);
    //
    //            if(windowWidth != 0){
    //                window.controller.x = Global.stageWidth/2 - windowWidth/2;
    //                window.controller.y = Global.stageHeight/2 - windowHeight/2;
    //            }else{
    //                windowWidth = window.controller.width;
    //                windowHeight = window.controller.height;
    //            }
    //
    //            // 标示界面动画中状态
    //            window.controller.isAnimFinish = false;
    //            egret.setTimeout(function() {
    //                window.controller.isAnimFinish = true;
    //            }, this, effectType > 0 ? 500 : 10);
    //
    //            //以下是弹窗动画
    //            var leftX:number = Global.stageWidth/2 - windowWidth/2;
    //            var upY:number = Global.stageHeight/2 - windowHeight/2;
    //            var panel = window.controller;
    //            switch(effectType){
    //                case 0:
    //                    break;
    //                case 1:
    //                    panel.scaleX = 0.5;
    //                    panel.scaleY = 0.5;
    //                    panel.x = panel.x + windowWidth/4;
    //                    panel.y = panel.y + windowHeight/4;
    //                    egret.Tween.get(panel).to({scaleX:1,scaleY:1,x:panel.x - windowWidth/4,y:panel.y - windowHeight/4},300,egret.Ease.backOut);
    //                    break;
    //                case 2:
    //                    panel.scaleX = 0.5;
    //                    panel.scaleY = 0.5;
    //                    panel.x = panel.x + windowWidth/4;
    //                    panel.y = panel.y + windowHeight/4;
    //                    egret.Tween.get(panel).to({scaleX:1,scaleY:1,x:panel.x - windowWidth/4,y:panel.y - windowHeight/4},600,egret.Ease.elasticOut);
    //                    break;
    //                case 3:
    //                    if(isAlert){
    //                        panel.x = - windowWidth;
    //                        egret.Tween.get(panel).to({x:leftX},500,egret.Ease.cubicOut);
    //                    }else{
    //                        panel.x = - windowWidth;
    //                        egret.Tween.get(panel).to({x:0},500,egret.Ease.cubicOut);
    //                    }
    //                    break;
    //                case 4:
    //                    if(isAlert){
    //                        panel.x = windowWidth;
    //                        egret.Tween.get(panel).to({x:leftX},500,egret.Ease.cubicOut);
    //                    }else{
    //                        panel.x = windowWidth;
    //                        egret.Tween.get(panel).to({x:0},500,egret.Ease.cubicOut);
    //                    }
    //                    break;
    //                case 5:
    //                    if(isAlert){
    //                        panel.y = - windowHeight;
    //                        egret.Tween.get(panel).to({y:upY},500,egret.Ease.cubicOut);
    //                    }else{
    //                        panel.y = - windowHeight;
    //                        egret.Tween.get(panel).to({y:0},500,egret.Ease.cubicOut);
    //                    }
    //                    break;
    //                case 6:
    //                    if(isAlert){
    //                        panel.y = Global.stageHeight;
    //                        egret.Tween.get(panel).to({y:upY},500,egret.Ease.cubicOut);
    //                    }else{
    //                        panel.y = windowHeight;
    //                        egret.Tween.get(panel).to({y:0},500,egret.Ease.cubicOut);
    //                    }
    //                    break;
    //                default:
    //                    break;
    //            }
    //            return true;
    //        }
    //    }
    //    return false;
    //}
    ///**
    // * 关闭视窗
    // * */
    //public removePopUp(windowName:F.WindowName, effectType:number = 0):boolean {
    //    var value = this.popUpMap.get(windowName);
    //    this.popUpMap.delete(windowName);
    //    if(value != null && value instanceof PopUpEntity){
    //        this.removeModal(value, effectType > 0);
    //        var window:WindowEntity = this.windowMap.get(value.windowName);
    //        var parent:WindowEntity = this.windowMap.get(value.parentName);
    //        egret.setTimeout(function() {
    //            if(window != null && parent != null){
    //                parent.controller.removeElement(window.controller);
    //                if(window.controller instanceof F.ViewController){
    //                    window.controller.clear();
    //                    // 恢复
    //                    window.controller.scaleX = 1;
    //                    window.controller.scaleY = 1;
    //                    window.controller.alpha = 1;
    //                }
    //            }
    //            value.clear();
    //            this.popUpPool.push(value);
    //        }, this, effectType > 0 ? 500 : 10);
    //
    //        var panel = window.controller;
    //        //以下是弹窗动画
    //        switch(effectType){
    //            case 0:
    //                break;
    //            case 1:
    //                egret.Tween.get(panel).to({alpha:0,scaleX:0,scaleY:0,x:panel.x + panel.width/2,y:panel.y + panel.height/2},300);
    //                break;
    //            case 2:
    //                break;
    //            case 3:
    //                egret.Tween.get(panel).to({x:panel.width},500,egret.Ease.cubicOut);
    //                break;
    //            case 4:
    //                egret.Tween.get(panel).to({x:-panel.width},500,egret.Ease.cubicOut);
    //                break;
    //            case 5:
    //                egret.Tween.get(panel).to({y:panel.height},500,egret.Ease.cubicOut);
    //                break;
    //            case 6:
    //                egret.Tween.get(panel).to({y:-panel.height},500,egret.Ease.cubicOut);
    //                break;
    //            default:
    //                break;
    //        }
    //        return true;
    //    }
    //    return false;
    //}
    ///**
    // * 关闭所有视窗（不受批量控制的视窗除外）
    // * */
    //public removeAllPopUp() {
    //    this.popUpMap.forEach(function(value, key){
    //        if(value != null && value.batchRemove){
    //            this.removePopUp(key);
    //        }
    //    }, this);
    //}
    ///**
    // * 视窗是否显示
    // * */
    //public hasPopUp(windowName:F.WindowName) {
    //    return this.popUpMap.has(windowName);
    //}
    //private addModal(popUp:PopUpEntity, modalAlpha:number, isRemove:boolean) {
    //    var modal = this.modalPool.length > 0 ? this.modalPool.shift() : new F.Modal();
    //    modal.alpha = modalAlpha;
    //    modal.touchRemove = isRemove;
    //    var parent:WindowEntity = this.windowMap.get(popUp.parentName);
    //    if(parent){
    //        modal.setWindowName(popUp.windowName);
    //        modal.setModalSize(parent.controller.width, parent.controller.height);
    //        modal.alpha = modalAlpha > 0.1 ? 0.1 : 0;
    //        parent.controller.addElement(modal);
    //        egret.Tween.get(modal).to({alpha: modalAlpha}, 150);
    //        popUp.modal = modal;
    //    }
    //}
    //设置水平居中屏幕位置。
    //public setCenterV(spr:egret.DisplayObjectContainer):number{
    //    return (StageUtils.WIN_WIDTH - spr.width) * 0.5 ;
    //}
    //设置垂直居中屏幕位置。
    //public setCenterH(spr:egret.DisplayObjectContainer):number{
    //    return (StageUtils.WIN_HEIGHT - spr.height) * 0.5 ;
    //}
    //public static setCenterV(obj1:any,obj2:any):number{
    //    return obj1.x + (obj1.width - obj2.width) * 0.5;
    //}
    //public static setCenterH(obj1:any,obj2:any):number{
    //    return obj1.y + (obj1.height - obj2.height) * 0.5;
    //}
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    //public setTouchChildren(value:boolean):void {
    //    egret.MainContext.instance.stage.touchChildren = value;
    //}
    /**
     * 指定此对象是否接收鼠标/触摸事件
     * @param value
     */
    //public setTouchEnabled(value:boolean):void {
    //    egret.MainContext.instance.stage.touchEnabled = value;
    //}
    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    //public setMaxTouches(value:number):void {
    //    egret.MainContext.instance.touchContext.maxTouches = value;
    //}
    /**
     * 设置帧频
     * @param value
     */
    //public setFrameRate(value:number):void {
    //    egret.MainContext.instance.stage.frameRate = value;
    //}
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    //public getStage():egret.Stage {
    //    return egret.MainContext.instance.stage;
    //}
    /**
     * 设置游戏帧频
     * @param timeScale
     */
    //public setTimeScale(timeScale:number):void {
    //    egret.Ticker.getInstance().setTimeScale(timeScale);
    //}
}
