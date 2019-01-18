/**
 * class name : FireBall
 * description : 火球攻击
 * time ：2019.1.15
 * 
 */
class FireBall extends Bullet {
    public display: egret.Bitmap;
    public damage: number;//伤害量
    // public id: number;//弓箭ID，使用这个变量知道这是谁发射的
    // public whos: WhosArrow = WhosArrow.NONE;//谁的弓箭
    // public index: number = -1;//在数组的下标
    public speed: number = 240;

    private damagedRoleID: Array<number>;
    public constructor() {
        super();
        this.display = new egret.Bitmap();
        this.poolName = "fireball";
        this.display = new egret.Bitmap(RES.getRes("fireball_Bullet_png"));
        this.display.width = this.display.width * 0.2;
        this.display.height = this.display.height * 0.2;
        console.log(this.width+"______"+this.height);
        console.log(this.display.width+"*********"+this.display.height);
        this.addChild(this.display);

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        
        this.activeTime = -1;
        // this.myDrawRect();
        // let shp = Util.drawLineRectangle(this.x, this.y, 10, 28, 0xff0000, 2);
        // this.addChild(shp);
        this.damagedRoleID = new Array<number>();
        this.tag = WeaponType.FIREBALL;
    }

    //根据弓箭id生成不同的弓箭
    public enable(arrowID: number) {

    }

    //喷射移动
    public moveFrom(xPos: number, yPos: number, angle: number, Dis: number): void {
        // this.isCanColliseSelf = false;
        xPos += Math.cos(angle) * Dis;
        yPos += Math.sin(angle) * Dis;
        // console.log("xPos=",xPos);
        // console.log("yPos===",yPos);
        var self = this;
        // console.log("Dis===",Dis);
        let time = Math.abs(Dis) / this.speed * 100;
        // console.log("time===",time);
        egret.Tween.get(this).to({ x: xPos, y: yPos }, time).call(function (): void {
            egret.Tween.removeTweens(this);
            ObjectPool.instance.pushObj(this.poolName, this);
        }, this);
    }


    public recycle() {
        if (this.parent)
            this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        if (this.whos != WhosBullet.NONE) {
            switch (this.whos) {
                case WhosBullet.PLAYER:
                    {
                        let arr = Main.instance.gameView.battleMgr.bulletsPlayer;
                        arr[this.index] = null;
                    } break;

                case WhosBullet.ENEMY:
                    {
                        let arr = Main.instance.gameView.battleMgr.bulletsEnemy;
                        arr[this.index] = null;
                    } break;
            }
        }
        this.damagedRoleID = [];
    }

    /** 检测可否造成伤害
     * @param obj ：碰撞的对象
     * @param needTrans ：是否需要转换坐标系
     */
    public canDamage(obj: Role, startCoord?: boolean, endCoord?: boolean): boolean {
        //做一个检测，防止同一个单位多次伤害
        if (this.damagedRoleID.length > 0)
            if (this.damagedRoleID.indexOf(obj.id) >= 0)
                return false;

        if (Util.isCircleHit(obj, this, true)) {

            if (Util.isHit(obj, this, true)) {

                this.damagedRoleID.push(obj.id);

                return true;
            }
        }
        return false;
    }

     /** 检测障碍物 */
    private checkBarrier(obj: Role, startCoord: boolean = false, endCoord: boolean = false)
    {
        let arr = MapManager.getLineItems(new egret.Point(this.x, this.y), new egret.Point(obj.x, obj.y), startCoord, endCoord);
        for (let i = 0; i < arr.length; i++) {
            let data = arr[i];
            if (MapManager.mapItems[data.row][data.col] == 1)
                return false;
        }
        return true;
    }

    /** 火球与墙的碰撞 */
    public isHitObstacal(): boolean {
        let hitPoints = MapManager.getHitItem(this, [MapItemType.OBSTACAL], false);
        if (hitPoints) {
            for (let i = 0; i < hitPoints.length; i++) {
                let hitPoint = hitPoints[i];
                let hitPointPos = MapManager.getMapItemPos(hitPoint.x, hitPoint.y);
                hitPointPos = Main.instance.gameView.gameBg.obstacalGroup.localToGlobal(hitPointPos.x, hitPointPos.y);
                let pos = new egret.Point(this.x, this.y);
                if (this.parent) {
                    pos = this.parent.localToGlobal(this.x, this.y);
                }

                let obj1R = Math.sqrt(this.width * this.width + this.height * this.height);
                let obj2R = Math.sqrt(MapManager.cellPix * MapManager.cellPix + MapManager.cellPix * MapManager.cellPix);

                let distance = egret.Point.distance(pos, hitPointPos);
                if (obj1R + obj2R > distance) {
                    let aim_cx = pos.x - this.anchorOffsetX + this.width * 0.5;
                    let aim_cy = pos.y - this.anchorOffsetY + this.height * 0.5;
                    let hit_cx = hitPointPos.x;
                    let hit_cy = hitPointPos.y;

                    let dx = Math.abs(aim_cx - hit_cx);
                    let dy = Math.abs(aim_cy - hit_cy);
                    if (dx <= Math.abs(MapManager.cellPix * 0.5 + this.width * 0.5) && dy <= Math.abs(MapManager.cellPix * 0.5 + this.height * 0.5)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }


    // ===== test code start =====
    /** 画一个矩形 */
    // public myDrawRect() {
    //     let shape = new egret.Shape();
    //     shape.graphics.beginFill(0xff0000);
    //     shape.graphics.drawRect(this.x, this.y, 10, 28);
    //     shape.graphics.endFill();
    //     this.addChild(shape);
    // }
    // ===== test code end =====


    public destructor() {
        super.destructor();
        if (this.parent)
            this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        if (this.whos != WhosBullet.NONE) {
            switch (this.whos) {
                case WhosBullet.PLAYER:
                    {
                        let arr = Main.instance.gameView.battleMgr.bulletsPlayer;
                        arr[this.index] = null;
                    } break;
                case WhosBullet.ENEMY: {
                    let arr = Main.instance.gameView.battleMgr.bulletsEnemy;
                    arr[this.index] = null;
                } break;
            }
        }
        this.damagedRoleID = null;
    }
}

