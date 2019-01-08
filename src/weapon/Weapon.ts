// TypeScript file

/**
 * class name : Weapon
 * description : 武器
 * time : 2019.1.4
 * @author : 杨浩然
 */
class Weapon
{
    // public power: number;
    public range: number;//武器攻击距离
    public type;
    public level: number;//等级
    

    //攻击控制
    protected shootDelay: number = 1000;//攻速
    protected previousFrameTime: number = 0;
    protected shootTime: number = 0;
    

    protected obj: Role;//持有这个武器的对象

    public constructor(obj: Role)
    {
        this.obj = obj;
        // this.power = 10;
        this.range = 300;
        this.level = 1;
    }

    /** 攻击 */
    public attack(attackType: number): boolean
    {
        //先更新显示的时间
        let deltaTime = egret.getTimer() - this.previousFrameTime;
        this.shootTime += deltaTime;
        this.previousFrameTime = egret.getTimer();

        if(this.obj.die) return false;

        if(this.shootTime >= this.shootDelay)
        {
            this.shootTime = 0;
            return true;
        }
        return false;
    }

    /** 升级 */
    public setLevel(lv:number)
    {
        this.level = lv;
    }


//class end
}