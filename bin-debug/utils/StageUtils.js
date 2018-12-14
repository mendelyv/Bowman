var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Stage相关工具类
 */
var StageUtils = (function () {
    /**
     * 构造函数
     */
    function StageUtils() {
        // super();
    }
    /**
     * 初始化缩放比例
     * @param game_width  设置游戏宽度
     * @param game_height 设置游戏高度
     */
    StageUtils.initScale = function (game_width, game_height) {
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
    };
    /**
     * @method 根据屏幕的宽高比例设置对象的位置以及缩放适配
     * @param {egret.DisplayObject} obj - 需要适配的对象
     * @param {number} x - 需要赋值的x
     * @param {number} y - 需要赋值的y
     */
    StageUtils.setPos = function (obj, x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
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
    };
    /**
     * @method 根据屏幕的宽高比例获得一个点的适合的比例位置
     * @param {number} x - 需要赋值的x
     * @param {number} y - 需要赋值的y
     */
    StageUtils.getFitPos = function (x, y) {
        var fit_x = x / StageUtils.GAME_WIDTH;
        var fit_y = y / StageUtils.GAME_HEIGHT;
        var fx = fit_x * StageUtils.WIN_WIDTH;
        var fy = fit_y * StageUtils.WIN_HEIGHT;
        return { x: fx, y: fy };
    };
    /**
     * return 获取屏幕宽度减去游戏定义宽度的距离
     */
    StageUtils.getWidthDisWG = function () {
        var win_width = StageUtils.WIN_WIDTH;
        var game_width = StageUtils.GAME_WIDTH;
        var dis = win_width - game_width;
        return dis;
    };
    /**
     * return 获取屏幕高度减去游戏定义高度的距离
     */
    StageUtils.getHeightDisWG = function () {
        var win_height = StageUtils.WIN_HEIGHT;
        var game_height = StageUtils.GAME_HEIGHT;
        var dis = win_height - game_height;
        return dis;
    };
    /**
     * @method 设置锚点为中心点
     * @param {egret.DisplayObject} obj - 需要缩放的对象
     * @param {number} x - 需要赋值的缩放x
     * @param {number} y - 需要赋值的缩放y
     */
    StageUtils.setAnchor = function (obj, x, y) {
        if (x === void 0) { x = 0.5; }
        if (y === void 0) { y = null; }
        if (y == null) {
            obj.anchorOffsetX = obj.width * x;
            obj.anchorOffsetY = obj.height * x;
        }
        else {
            obj.anchorOffsetX = obj.width * x;
            obj.anchorOffsetY = obj.height * y;
        }
    };
    /**
     * @method 根据已计算好的缩放适配去比例设置缩放
     * @param {egret.DisplayObject} obj - 需要缩放的对象
     * @param {number} x - 需要赋值的缩放x
     * @param {number} y - 需要赋值的缩放y
     */
    StageUtils.setScale = function (obj, x, y) {
        if (y === void 0) { y = null; }
        if (y == null) {
            obj.scaleX = obj.scaleY = x * StageUtils.fit_scale;
        }
        else {
            obj.scaleX = x * StageUtils.fit_scale;
            obj.scaleY = y * StageUtils.fit_scale;
        }
    };
    StageUtils.GAME_WIDTH = 1334; //480;//游戏的宽
    StageUtils.GAME_HEIGHT = 750; //800;//游戏的高
    return StageUtils;
}());
__reflect(StageUtils /*extends BaseClass */.prototype, "StageUtils");
