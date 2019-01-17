/**
 * class name: Shield
 * description: 防御盾基类
*/
abstract class Shield extends egret.DisplayObjectContainer
{
    public index:number;//在数组的下标
    public id: number;//使用这个变量知道这是谁的
    public display: egret.DisplayObject;//显示对象
    public whos:whosWeapon = whosWeapon.NONE; // 谁的盾
    public tag:WeaponType; //是什么武器

    public constructor()
    {
        super();
        this.index = -1;
        this.tag = WeaponType.NONE;
    }
    //检测与子弹的碰撞
    public abstract isCollsion(obj: Bullet,startCoord?: boolean, endCoord?: boolean):boolean
    public destructor()
    {
        
    }

}