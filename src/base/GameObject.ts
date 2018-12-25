class GameObject implements IGD {
    protected _pos: egret.Point;

    protected _monitor: egret.Bitmap;

    protected _map: IMap;

    public speed: number = 3;

    public beFocus: boolean;

    public constructor(map: IMap) {
        this._pos = new egret.Point();
        this._monitor = new egret.Bitmap();
        this._map = map;
    }
    public get posX(): number {
        return this._pos.x;
    }

    public get posY(): number {
        return this._pos.y;
    }

    public get $pos(): egret.Point {
        return this._pos;
    }

    public setPos(px: number, py: number): void {
        px = Math.ceil(px);
        py = Math.ceil(py);

        this._pos.x = px;
        this._pos.y = py;
    }

    public render(t: number): void {

    }

    public run(t: number): void {

    }



    public get monitor(): egret.DisplayObject {
        return this._monitor;
    }

    protected updatePos(offX: number = 0, offY: number = 0): void {
        var tx: number = this._pos.x;
        var ty: number = this._pos.y;



        if (this._map) {
            var wout: boolean = this._map.width > StageUtils.WIN_WIDTH;
            var hout: boolean = this._map.height > StageUtils.WIN_HEIGHT;

            if (this.beFocus && wout && hout) {
                // 地图比屏幕大，需要卷动

                var tw: number = wout ? StageUtils.WIN_WIDTH : this._map.width;
                var th: number = hout ? StageUtils.WIN_HEIGHT : this._map.height;

                tx = tx > this._map.width - (tw >> 1) ? tx - (this._map.width - tw) : tx;
                ty = ty > this._map.height - (th >> 1) ? ty - (this._map.height - th) : ty;

                tx = tx > (tw >> 1) && tx == this._pos.x ? (tw >> 1) : tx;
                ty = ty > (th >> 1) && ty == this._pos.y ? (th >> 1) : ty;
            } else {
                var target: egret.Point = this._map.getScreenPostion(tx, ty);
                tx = target.x;
                ty = target.y;
            }
        }

        if (this._monitor == null) return;

        this._monitor.x = tx + offX;
        this._monitor.y = ty + offY;
    }
    public setSkin(name: string): void {

        var texture: egret.Texture = RES.getRes(name);
        if (texture) {
            this.onResReady(texture);
        }
    }
    protected onResReady(data: egret.Texture): void {
        (<egret.Bitmap>this._monitor).texture = data;
        this._monitor.anchorOffsetX = Math.ceil(data.textureWidth >> 1);
        this._monitor.anchorOffsetY = Math.ceil(data.textureHeight >> 1);
    }
}