// TypeScript file

/**
 * class name : StickHandle
 * description : 木棍武器
 * time : 2019.1.16
 * @author : 杨浩然
 */
class StickHandle extends Weapon
{
    public rectLong: number;//长
    public rectWid: number;//宽
    public stayTime: number;//矩形停留时间

    public constructor(obj: Role)
    {
        super(obj);
        this.rectLong = 1000;
        this.rectWid = 400;
        this.stayTime = 200;
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
                let bullet = new Stick(this.rectLong, this.rectWid, this.stayTime);
                bullet.damage = this.obj.attribute.power;
                bullet.id = this.obj.id;
                bullet.whos = WhosBullet.PLAYER;
                //给矩形找个位置
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = bullet.height / 2;
                bullet.index = bg.addBullet(bullet);

                let playerPoint = group.globalToLocal(this.obj.x, this.obj.y);
                bullet.x = playerPoint.x;
                bullet.y = playerPoint.y;
                bullet.rotation = this.obj.arrow.rotation + 90;
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

                let bullet = new Stick(this.rectLong, this.rectWid, this.stayTime);
                bullet.damage = this.obj.attribute.power;
                bullet.id = this.obj.id;
                bullet.whos = WhosBullet.ENEMY;
                //给矩形找个位置
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = bullet.height / 2;
                bullet.index = bg.addBullet(bullet);
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
        this.rectLong = 1000 - (this.level - 1) * 100;
        this.rectWid = 400 + (this.level - 1) * 40;
        this.stayTime = 200 + (this.level - 1) * 20;
    }

    public enableSkill(skillType)
    {
        super.enableSkill(skillType);
        //技能
    }

    public getSkills(): Array<Skill>
    {
        let arr = new Array<Skill>();
        return arr;
    }


//class end
}