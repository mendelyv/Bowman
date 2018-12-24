// TypeScript file

/**
 * class name : ObjectPool
 * description : 对象池
 * time : 2018.11.19
 * @author : 杨浩然
 */
class ObjectPool {
    private static _instance: ObjectPool;
    public static get instance(): ObjectPool {
        if (ObjectPool._instance == null) ObjectPool._instance = new ObjectPool();
        return ObjectPool._instance;
    }
    private static CACHE_COUNT: number = 1000;
    private static MAX_PARAMS_LEN: number = 10;//构造函数参数个数最大值
    private _poolDic: Object = {};
    private _classObjDic: Object = {};
    private _cacheCountDic: Object = {};
    public constructor() {
    }
    public createObjectPool(poolName: string, classObj: any, cacheCount?: number): void {
        if (!this._poolDic[poolName]) {
            this._poolDic[poolName] = [];
            this._classObjDic[poolName] = classObj;
            if (cacheCount > 0) {
                this._cacheCountDic[poolName] = cacheCount;
            }
        }
    }
    public cleanObjectPool(poolName: string): void {
        if (this._poolDic[poolName]) {
            var arr: Array<any> = this._poolDic[poolName];
            var l: number = arr.length;
            for (var i: number = 0; i < l; i++) {
                this.destructObj(arr.pop());
            }
            arr.length = 0;
            delete this._poolDic[poolName];
            delete this._classObjDic[poolName];
            delete this._cacheCountDic[poolName];
        }
    }
    public pushObj(poolName: string, obj: any): void {
        if (obj == null) return;
        if (!this._poolDic[poolName]) {
            this.destructObj(obj);
            return;
        }
        var arr: Array<any> = this._poolDic[poolName];
        var maxCount: number = this._cacheCountDic[poolName] ? this._cacheCountDic[poolName] : ObjectPool.CACHE_COUNT;
        if (arr.length >= maxCount) {
            this.destructObj(obj);
            return;
        }
        if (obj.recycle) {
            obj.recycle();
        }
        if (obj.parent)
        {
            obj.parent.removeChild(obj);
            // console.log(" ===== 回收对象 ===== ");
        } 
        arr.push(obj);
    }
    public getObj(poolName: string, ...params: any[]): any {
        if (!this._poolDic[poolName]) {
            // Utils.showLog("没有创建对象池 " + poolName);
            console.warn(" ----- 未创建 " + poolName + " 对象池 ----- ");
            return;
        }
        var obj = null;
        var arr: Array<any> = this._poolDic[poolName];
        if (arr.length > 0) {
            obj = arr.shift();
            if (obj.reset) {
                obj.reset();
            }
        } else {
            let len = params.length;
            if(len > ObjectPool.MAX_PARAMS_LEN)
            {
                console.error(" ***** 构造函数参数个数过多 ***** ");
                return null;
            }
            switch(len)
            {
                case 0 : obj = new this._classObjDic[poolName].constructor(); break;
                case 1 : obj = new this._classObjDic[poolName].constructor(params[0]); break;
                case 2 : obj = new this._classObjDic[poolName].constructor(params[0], params[1]); break;
                case 3 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2]); break;                    
                case 4 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3]); break;
                case 5 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3], params[4]); break;
                case 6 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3], params[4], params[5]); break;
                case 7 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3], params[4], params[5], params[6]); break;                    
                case 8 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]); break;                    
                case 9 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]); break;                    
                case 10 : obj = new this._classObjDic[poolName].constructor(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9]); break;                                     
            }
        }
        return obj;
    }
    
    private destructObj(obj: any): void {
        if (obj == null) return;
        if (obj.destructor) {
            obj.destructor();
        } else {
            if (obj.stop) {
                obj.stop();
            }
            if (obj.texture) {
                obj.texture = null;
            }
        }
    }
    public printObjCount(poolName: string): void {
        if (this._poolDic[poolName]) {
            // Utils.showLog(poolName + " 对象池中包含对象数量 " + this._poolDic[poolName].length);
        }
    }
}