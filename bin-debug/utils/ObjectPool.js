var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = (function () {
    //放回池子中所有对象
    /**
     * @param c池子对象
     * @param size池子的对象长度
     * 通过对象的animator的movieClip的visible来判断是否被使用，也可以改为自己的方便实用的
     * 需要给对象设定poolId
     */
    function ObjectPool(c, size) {
        this.poolObjs = [];
        this.newPool = c;
        this.poolSize = size;
    }
    ObjectPool.prototype.getAllPoolObjs = function () {
        return this.poolObjs;
    };
    //初始化池子对象
    ObjectPool.prototype.initPool = function () {
        for (var i = 0; i < this.poolSize; i++) {
            this.addPoolObj(i);
        }
    };
    //增加新的对象到对象池
    ObjectPool.prototype.addPoolObj = function (poorId) {
        var poorObj = new this.newPool(poorId);
        poorObj['animator'].movieClip.visible = false;
        this.poolObjs.push(poorObj);
    };
    //获取一个enemy对象
    ObjectPool.prototype.getOnePoolObj = function () {
        for (var i = 0; i < this.poolObjs.length; i++) {
            if (this.poolObjs[i]['animator'].movieClip.visible === false) {
                this.poolObjs[i]['animator'].movieClip.visible = true;
                return this.poolObjs[i];
            }
        }
    };
    //回收对象
    ObjectPool.prototype.restorePoolObj = function (poolId) {
        this.poolObjs[poolId]['animator'].movieClip.visible = false;
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
