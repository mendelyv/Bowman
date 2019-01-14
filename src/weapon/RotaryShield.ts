/**
 * 旋转盾
 */
class RotaryShield extends Weapon {

    public static levelMax: number = 5;//最大等级

     public constructor(obj: Role) {
        super(obj);
        this.shootDelay = -1; //攻速
        this.range = 10;
    }
    //防御
    public defense(defenseType:number): boolean{
        if(!super.defense(defenseType)){
            return false;
        }
        switch(defenseType){
          case 0:
            // ===== 主玩家防御 start =====
            let player = Main.instance.gameView.player;
            let shield = new RotaryShieldDefense(this.range);
            shield.id = this.obj.id;
            shield.whos = WhosShield.PLAYER;
            shield.anchorOffsetX = shield.width * 0.5;
            shield.anchorOffsetY = shield.height * 0.5;
            shield.x = player.x + player.width;
            shield.y = player.y + player.height;
            player.addChild(shield);
            Main.instance.gameView.battleMgr.addShield(shield,WhosShield.PLAYER);
            // ===== 主玩家防御 exd =====
            break;

          case 1:

            break;
        }
    }
    //防御盾升级
    public upLevel(){
        super.upLevel();
         if (this.level > RotaryShield.levelMax) {
            this.level = RotaryShield.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv() {
        this.range = (this.level - 1) * 20 + 200;
    }

    public enableSkill(skillType: ShotgunSkillType) {
        super.enableSkill(skillType);
        switch (skillType) {
            case ShotgunSkillType.AttackTypeIntensive:
                this.upLevel();
                break;
        }
    }
    
    public getSkills(): Array<Skill> {
        let arr = new Array<Skill>();
        if (this.level < RotaryDarts.levelMax) {
            let skill = new Skill(WeaponType.ROTARY_SHIELD, ShotgunSkillType.AttackTypeIntensive);
            arr.push(skill);
        }
        return arr;
    }
}