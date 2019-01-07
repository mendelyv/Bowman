// TypeScript file

/**
 * class name : Bow
 * description : 弓弩
 * time : 2019.1.4
 * @author : 杨浩然
 */
class Bow extends Weapon
{
    private static MAX_ARROW_NUM: number = 7;
    private static MAX_LEVEL = 5;
    /** 弓箭数量 */
    public arrowNum: number;
    public res: string;

    public constructor(obj: Role)
    {
        super(obj);
        this.type = WeaponType.BOW;
        this.arrowNum = 1;
        this.res = "game_title_rope_png";
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

                let rotations = new Array<number>();
                let tmpRot: number = this.obj.arrow.rotation + 90;

                let mid = Math.floor(this.arrowNum / 2);//找中间的弓箭的位置
                for (let i = 0; i < this.arrowNum; i++) {
                    let times = Math.abs(mid - i);
                    if (i < mid) rotations.push(tmpRot - 15 * times);
                    else if (i > mid) rotations.push(tmpRot + 15 * times);
                    else rotations.push(tmpRot);
                }
                if (mid % 2 == 0)//如果是偶数再偏一次
                {
                    for (let i = 0; i < rotations.length; i++) {
                        rotations[i] += 15 / 2;
                    }
                }
                for (let i = 0; i < rotations.length; i++) {
                    let arrow: Arrow = ObjectPool.instance.getObj("arrow");
                    arrow.id = this.obj.id;

                    arrow.damage = this.obj.attribute.power;
                    arrow.whos = WhosBullet.PLAYER;

                    arrow.display.texture = RES.getRes(this.res);
                    arrow.addChild(arrow.display);

                    let point = new egret.Point();
                    this.obj.parent.localToGlobal(this.obj.x, this.obj.y, point);
                    let targetPoint = new egret.Point();
                    group.parent.globalToLocal(point.x, point.y, targetPoint);
                    // group.addChild(arrow);
                    arrow.anchorOffsetX = arrow.width / 2;
                    arrow.anchorOffsetY = arrow.height / 2;
                    arrow.index = bg.addBullet(arrow, WhosBullet.PLAYER);
                    arrow.x = targetPoint.x;
                    arrow.y = targetPoint.y;
                    arrow.rotation = rotations[i];

                    arrow.moveFrom(targetPoint.x, targetPoint.y, (arrow.rotation - 90) * Math.PI / 180, this.range);
                }
                // ===== 主玩家攻击 end =====
            }break;

            case 1:
            {
                // ===== 敌人攻击 start =====
                let group, arrow: Arrow;

                //旋转人物
                if (this.obj.target) {
                    this.obj.lookAtTarget();
                }

                let rotations = new Array<number>();
                let tmpRot: number = this.obj.role_img.rotation;
                let mid = Math.floor(this.arrowNum / 2);//找中间的弓箭的位置
                for(let i = 0; i < this.arrowNum; i++)
                {
                    let times = Math.abs(mid - i);
                    if(i < mid) rotations.push(tmpRot - 15 * times);
                    else if(i > mid) rotations.push(tmpRot + 15 * times);
                    else rotations.push(tmpRot);
                }
                if(mid % 2 == 0)//如果是偶数再偏一次
                {
                    for(let i = 0; i < rotations.length; i++)
                    {
                        rotations[i] += 15 / 2;
                    }
                }

                //先实例化一支弓箭
                group = Main.instance.gameView.gameBg.arrowGroup;
                for(let i = 0; i < rotations.length; i++)
                {
                    arrow = ObjectPool.instance.getObj("arrow") as Arrow;
                    arrow.id = this.obj.id;
                    arrow.damage = this.obj.attribute.power;
                    arrow.whos = WhosBullet.ENEMY;
                    arrow.display.texture = RES.getRes(this.res);
                    arrow.addChild(arrow.display);
                    //添加显示，设置位置和角度，增加tween
                    let bg = Main.instance.gameView.gameBg;
                    arrow.anchorOffsetX = arrow.width / 2;
                    arrow.anchorOffsetY = arrow.height / 2;
                    arrow.index = bg.addBullet(arrow, WhosBullet.ENEMY);
                    arrow.x = this.obj.x;
                    arrow.y = this.obj.y;
                    arrow.rotation = rotations[i];
                    arrow.moveFrom(this.obj.x, this.obj.y, (arrow.rotation - 90) * Math.PI / 180, this.range);
                }

                // ===== 敌人攻击 end =====
            }break;
        }
    }

    public upLevel()
    {
        super.upLevel();
        if(this.level > Bow.MAX_LEVEL)
            this.level = Bow.MAX_LEVEL;
    }

//class end
}