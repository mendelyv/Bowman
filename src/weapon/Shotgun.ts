// TypeScript file

/**
 * class name : Shotgun
 * description : 散弹枪
 * time : 2019.1.4
 * @author : 杨浩然
 */
class Shotgun extends Weapon
{
    public angle: number;//扇形角
    public stayTime: number;//扇形停留时间

    public static levelMax:number = 5;//最大等级
    public constructor(obj: Role)
    {
        super(obj);
        this.angle = 30;
        this.stayTime = 500;
    }

    public attack(attackType: number): boolean
    {
        if(!super.attack(attackType)) return false;

        switch(attackType)
        {
            case 0:
            {
                // ===== 主玩家攻击 start =====
                let bg = Main.instance.gameView.gameBg;
                let group = bg.arrowGroup;

                let rot = this.obj.arrow.rotation + 90;
                let bullet = new ShotgunBullet(this.range, this.angle, this.stayTime);
                bullet.damage = this.obj.attribute.power;
                bullet.id = this.obj.id;
                bullet.whos = WhosBullet.PLAYER;
                //给扇形找个位置
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = this.obj.anchorOffsetY + bullet.height - 10;
                // group.addChild(bullet);
                bullet.index = bg.addBullet(bullet, WhosBullet.PLAYER);

                let playerPoint = group.globalToLocal(this.obj.x, this.obj.y);
                bullet.x = playerPoint.x;
                bullet.y = playerPoint.y;
                bullet.rotation = this.obj.arrow.rotation + 90;

                // ===== 主玩家攻击 end =====
            }break;

            case 1:
            {
                // ===== 敌人攻击 start =====
                let bg = Main.instance.gameView.gameBg;
                let group = bg.arrowGroup;

                //旋转人物
                if (this.obj.target) {
                    this.obj.lookAtTarget();
                }

                // let rot = this.obj.role_img.rotation + 90;
                let bullet = new ShotgunBullet(this.range, this.angle, this.stayTime);
                bullet.damage = this.obj.attribute.power;
                bullet.id = this.obj.id;
                bullet.whos = WhosBullet.ENEMY;
                //给扇形找个位置
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = this.obj.anchorOffsetY + bullet.height - 10;
                bullet.index = bg.addBullet(bullet, WhosBullet.ENEMY);
                let objPoint = new egret.Point(this.obj.x, this.obj.y);
                bullet.x = objPoint.x;
                bullet.y = objPoint.y;
                bullet.rotation = this.obj.role_img.rotation;
                // ===== 敌人攻击 end =====
            }break;
        }
    }

    public upLevel()
    {
        super.upLevel();
        if(this.level > Shotgun.levelMax)
        {
            this.level = Shotgun.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv()
    {
        this.range = (this.level - 1) * 20 + 200;
        this.angle = (this.level - 1) * 3 + 30;
        this.stayTime = (this.level - 1) * 50 + 500;
    }

    public enableSkill(skillType:ShotgunSkillType) 
    {
        super.enableSkill(skillType);
        switch(skillType)
        {
            case ShotgunSkillType.AttackTypeIntensive:
                this.upLevel();
                break;
        }
    }

    public getSkills():Array<Skill>
    {   
        let arr = new Array<Skill>();
        if(this.level < Shotgun.levelMax)
        {
            let skill = new Skill(WeaponType.SHOTGUN,ShotgunSkillType.AttackTypeIntensive);
            arr.push(skill);
        }
        return arr;
    }

//class end
}