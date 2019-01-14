/**
 * class name : RotaryDarts
 * description : 旋转镖
 */
class RotaryDarts extends Weapon {

    public static levelMax: number = 5;//最大等级

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
                let player = Main.instance.gameView.player;
                let bullet = new RotaryDartsBullet(this.range);
                bullet.damage = this.obj.attribute.power;
                bullet.id = this.obj.id;
                bullet.whos = WhosBullet.PLAYER;
                bullet.anchorOffsetX = bullet.width * 0.5;
                bullet.anchorOffsetY = bullet.height * 0.5;
                bullet.x = player.width + 8;
                bullet.y = player.height + 6;
                player.addChild(bullet);
                Main.instance.gameView.battleMgr.addBullet(bullet, WhosBullet.PLAYER);
                // ===== 主玩家攻击 end =====
                break;

            case 1:


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

    public enableSkill(skillType:Rotary_dartsSkillType) {
        super.enableSkill(skillType);
        switch (skillType) {
            case Rotary_dartsSkillType.AttackTypeIntensive:
                this.upLevel();
                break;
        }
    }

    public getSkills(): Array<Skill> {
        let arr = new Array<Skill>();
        if (this.level < RotaryDarts.levelMax) {
            let skill = new Skill(WeaponType.ROTARY_DARTS, Rotary_dartsSkillType.AttackTypeIntensive);
            arr.push(skill);
        }
        return arr;
    }

    //class end
}