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
                
                //给扇形找个位置
                bullet.anchorOffsetX = bullet.width / 2;
                bullet.anchorOffsetY = this.obj.anchorOffsetY + bullet.height - 10;
                group.addChild(bullet);

                let playerPoint = group.globalToLocal(this.obj.x, this.obj.y);
                bullet.x = playerPoint.x;
                bullet.y = playerPoint.y;
                bullet.rotation = this.obj.arrow.rotation + 90;

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