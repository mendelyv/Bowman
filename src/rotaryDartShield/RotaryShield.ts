/**
 * 旋转盾
 */
class RotaryShield extends Weapon {

    public static levelMax: number = 5;//最大等级

     public constructor(obj: Role) {
        super(obj);
        this.range = 10;
    }
    //防御
    public defense(defenseType:number): boolean{
        if(!super.defense(defenseType)){
            return false;
        }
        switch(defenseType){
          case 0:
          {
                    // ===== 主玩家防御 start =====
                    let player = Main.instance.gameView.player;
                    let shield = new RotaryShieldDefense(this.range);
                    shield.id = this.obj.id;
                    shield.whos = whosWeapon.PLAYER;
                    shield.anchorOffsetX = shield.width * 0.5;
                    shield.anchorOffsetY = shield.height * 0.5;
                    shield.x = player.width + 8;
                    shield.y = player.height + 6;
                    player.addChild(shield);
                    Main.instance.gameView.battleMgr.addShield(shield, whosWeapon.PLAYER);
            // ===== 主玩家防御 exd =====
          }break;

          case 1:
          {
                    // ===========敌人防御盾 start ==========
                    let shield = new RotaryShieldDefense(this.range);
                    shield.id = this.obj.id;
                    shield.whos = whosWeapon.ENEMY;
                    shield.anchorOffsetX = shield.width * 0.5;
                    shield.anchorOffsetY = shield.height * 0.5;
                    shield.x = this.obj.width + 8;
                    shield.y = this.obj.height + 6;
                    this.obj.addChild(shield);
                    Main.instance.gameView.battleMgr.addShield(shield, whosWeapon.ENEMY);
            // ===========敌人防御盾 end ============
          } break;
        }
    }

    public upLevel() {
        super.upLevel();
        if (this.level > RotaryShield.levelMax) {
            this.level = RotaryShield.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv() {
        this.range = (this.level - 1) * 20 + 200;
        this.shootTime = 1000 - (this.level - 1) * 100;
    }

    public enableSkill(skillType) {
        super.enableSkill(skillType);
        // switch (skillType) {
        //     case Rotary_shieldSkillType.DefenseTypeIntensive:
        //         this.upLevel();
        //         break;
        // }
    }

    public getSkills(): Array<Skill> {
        let arr = new Array<Skill>();
        // if (this.level < RotaryShield.levelMax) {
        //     let skill = new Skill(WeaponType.ROTARY_SHIELD, Rotary_shieldSkillType.DefenseTypeIntensive);
        //     arr.push(skill);
        // }
        return arr;
    }
}