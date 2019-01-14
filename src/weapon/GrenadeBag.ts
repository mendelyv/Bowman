// TypeScript file

/**
 * class name : GrenadeBag
 * description : 手雷包
 * time : 2019.1.11
 * @author : 杨浩然
 */
class GrenadeBag extends Weapon
{
    public static MAX_LEVEL: number = 5;
    public speed: number;//飞行速度
    public flyRange: number;//飞行距离
    public damageRange: number;//爆炸范围
    public countDown: number;//倒计时

    public constructor(obj: Role)
    {
        super(obj);
        this.type = WeaponType.GRENADEBAG;
        this.speed = 150;
        this.flyRange = 100;
        this.damageRange = 100;
        this.countDown = 400;
    }

    public attack(attackType: number): boolean
    {
        if(!super.attack(attackType)) return false;

        switch(attackType)
        {
            case 0 :
            {
                // ===== 主玩家攻击 start =====
                let bg = Main.instance.gameView.gameBg;
                let group = bg.arrowGroup;

                let rot = this.obj.arrow.rotation + 90;
                let grenade = new Grenade(this.range, this.damageRange, this.countDown, this.speed);
                grenade.id = this.obj.id;
                grenade.damage = this.obj.getDamage();
                grenade.whos = WhosBullet.PLAYER;

                let point = new egret.Point();
                this.obj.parent.localToGlobal(this.obj.x, this.obj.y, point);
                let targetPoint = group.parent.globalToLocal(point.x, point.y);
                
                grenade.index = bg.addBullet(grenade);
                grenade.x = targetPoint.x;
                grenade.y = targetPoint.y;
                grenade.rotation = rot;
                grenade.speed = this.speed;
                grenade.moveFrom(targetPoint.x, targetPoint.y, (grenade.rotation - 90) * Math.PI / 180, this.range);
                // ===== 主玩家攻击 end =====
            }break;

            case 1 :
            {
                // ===== 敌人攻击 start =====
                let bg = Main.instance.gameView.gameBg;
                let group = bg.arrowGroup;

                //旋转人物
                if (this.obj.target) {
                    this.obj.lookAtTarget();
                }

                let rot = this.obj.role_img.rotation;
                let grenade = new Grenade(this.range, this.damageRange, this.countDown, this.speed);
                grenade.id = this.obj.id;
                grenade.damage = this.obj.getDamage();
                grenade.whos = WhosBullet.ENEMY;

                grenade.index = bg.addBullet(grenade);
                grenade.x = this.obj.x;
                grenade.y = this.obj.y;
                grenade.rotation = rot;
                grenade.speed = this.speed;
                grenade.moveFrom(this.obj.x, this.obj.y, (grenade.rotation - 90) * Math.PI / 180, this.range);
                // ===== 敌人攻击 end =====
            }break;
        }

        return true;
    }

    public enableSkill(skillType:GrenadebagSkillType) 
    {
        super.enableSkill(skillType);
        switch(skillType)
        {
            case GrenadebagSkillType.AttackTypeIntensive:
                this.upLevel();
                break;
        }
    }

    public upLevel()
    {
        super.upLevel();
        if(this.level > GrenadeBag.MAX_LEVEL)
        {
            this.level = GrenadeBag.MAX_LEVEL;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv()
    {
        this.range = 100;
        this.shootTime = 1000 - (this.level - 1) * 100;
        this.speed = (this.level - 1) * 15 + 150;
        this.damageRange = (this.level - 1) * 10 + 100;
        this.countDown = 400 - (this.level - 1) * 40;
    }

    public getSkills(): Array<Skill>
    {
        let arr = new Array<Skill>();
        if(this.level < GrenadeBag.MAX_LEVEL)
        {
            let skill = new Skill(WeaponType.GRENADEBAG,GrenadebagSkillType.AttackTypeIntensive);
            arr.push(skill);
        }
        return arr;
    }
}