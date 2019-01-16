/**
 * class name : RotaryDarts
 * description : 旋转镖
 */
class RotaryDarts extends Weapon {

    public static levelMax: number = 5;//最大等级

    private bullet:RotaryDartsBullet;
    public constructor(obj: Role) {
        super(obj);
        this.shootDelay = -1;
        this.range = 5;
    }

    public attack(attackType: number): boolean {
        if (!super.attack(attackType)) return false;

        switch (attackType) {
            case 0:
                // ===== 主玩家攻击 start =====
                {
                    let player = Main.instance.gameView.player;
                    this.bullet = new RotaryDartsBullet(this.range);
                    this.bullet.damage = this.obj.attribute.power;
                    this.bullet.id = this.obj.id;
                    this.bullet.whos = WhosBullet.PLAYER;
                    this.bullet.anchorOffsetX = this.bullet.width * 0.5;
                    this.bullet.anchorOffsetY = this.bullet.height * 0.5;
                    this.bullet.x = this.obj.width + 8;
                    this.bullet.y = this.obj.height + 6;
                    this.bullet.show(this.obj);
                    // this.obj.addChild(this.bullet);
                    // Main.instance.gameView.battleMgr.addBullet(this.bullet);
                }
                
                // ===== 主玩家攻击 end =====
                break;

            case 1:
                {
                    this.bullet = new RotaryDartsBullet(this.range);
                    this.bullet.damage = this.obj.attribute.power;
                    this.bullet.id = this.obj.id;
                    this.bullet.whos = WhosBullet.ENEMY;
                    this.bullet.anchorOffsetX = this.bullet.width * 0.5;
                    this.bullet.anchorOffsetY = this.bullet.height * 0.5;
                    this.bullet.x = this.obj.width + 8;
                    this.bullet.y = this.obj.height + 6;
                    this.bullet.show(this.obj);
                    // this.obj.addChild(this.bullet);
                    // Main.instance.gameView.battleMgr.addBullet(this.bullet);
                }

                break;
        }
    }

    public upLevel() {
        super.upLevel();
        if (this.level > RotaryDarts.levelMax) {
            this.level = RotaryDarts.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv() {
        this.range = (this.level - 1) * 20 + 200;
    }

    public enableSkill(skillType) {
        super.enableSkill(skillType);
        // switch (skillType) {
        //     case Rotary_dartsSkillType.AttackTypeIntensive:
        //         this.upLevel();
        //         break;
        // }
    }

    public getSkills(): Array<Skill> {
        let arr = new Array<Skill>();
        // if (this.level < RotaryDarts.levelMax) {
        //     let skill = new Skill(WeaponType.ROTARY_DARTS, Rotary_dartsSkillType.AttackTypeIntensive);
        //     arr.push(skill);
        // }
        return arr;
    }

    public recycle()
    {
        if(this.bullet)
        {
            this.bullet.destructor();
            this.bullet = null;
        }
    }

    //class end
}