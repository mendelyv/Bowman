// TypeScript file

/**
 * class name : Weapon
 * description : 武器
 * time : 2019.1.4
 * @author : 杨浩然
 */
class Weapon
{
    public range: number;//武器攻击距离
    public type: WeaponType;
    public level: number;//等级
    

    //攻击控制
    protected shootDelay: number = 1000;//攻速
    protected previousFrameTime: number = 0;
    protected shootTime: number = 0;
    

    protected obj: Role;//持有这个武器的对象

    public constructor(obj: Role)
    {
        this.obj = obj;
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
    public upLevel()
    {
        this.level++;
    }

    public enableSkill(skillType:number)
    {
        
    }

//class end
}