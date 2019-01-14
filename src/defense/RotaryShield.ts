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
            Main.instance.gameView.battleMgr.addShield(shield,whosWeapon.PLAYER);
            // ===== 主玩家防御 exd =====
            break;

          case 1:

            break;
        }
    }

    public getSkills(): Array<Skill> {
        return ;
    }
}