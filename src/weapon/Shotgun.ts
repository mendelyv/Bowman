// TypeScript file

/**
 * class name : Bow
 * description : 弓弩
 * time : 2019.1.4
 * @author : 杨浩然
 */
class Shotgun extends Weapon
{
    public angle: number;//扇形角
    public stayTime: number;//扇形停留时间

    public constructor(obj: Role)
    {
        super(obj);
    }

    public attack(attackType: number): boolean
    {
        if(super.attack(attackType)) return false;

        switch(attackType)
        {
            case 0:
            {
                // ===== 主玩家攻击 start =====
                let bg = Main.instance.gameView.gameBg;
                let group = bg.arrowGroup;

                let rot = this.obj.arrow.rotation + 90;
                let bullet = new ShotgunBullet();
                
                // ===== 主玩家攻击 end =====
            }break;

            case 1:
            {

            }break;
        }
    }

    public upLevel()
    {

    }

//class end
}