class ObjectPool<T> {
    private poolObjs: Array<T>=[]
    private poolSize: number 
    private newPool:{new(id): T }
    //放回池子中所有对象
    /**
     * @param c池子对象
     * @param size池子的对象长度
     * 通过对象的animator的movieClip的visible来判断是否被使用，也可以改为自己的方便实用的
     * 需要给对象设定poolId
     */
    constructor(c:any,size:number){
        this.newPool = c
        this.poolSize = size
    }
    
    public getAllPoolObjs():Array<T>{
        return this.poolObjs
    }
    //初始化池子对象
    public initPool<T>(): void {
        for (let i = 0; i < this.poolSize; i++) {
            this.addPoolObj(i)
        }
    }
    //增加新的对象到对象池
    public addPoolObj(poorId: number): void {
        let poorObj:T =new this.newPool(poorId)
        poorObj['animator'].movieClip.visible = false
        this.poolObjs.push(poorObj)
    }
    //获取一个enemy对象
    public getOnePoolObj(): T {
        for (let i = 0; i < this.poolObjs.length; i++) {
            if (this.poolObjs[i]['animator'].movieClip.visible === false) {
                this.poolObjs[i]['animator'].movieClip.visible = true
                return this.poolObjs[i]
            }
        }
    }
    //回收对象
    public restorePoolObj(poolId: number): void {
        this.poolObjs[poolId]['animator'].movieClip.visible = false
    }

}
