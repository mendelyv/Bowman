// TypeScript file

/**
 * class name : Bow
 * description : 弓弩
 * time : 2019.1.4
 * @author : 杨浩然
 */
class Bow extends Weapon
{
    public  static MAX_ARROW_NUM: number = 7;
    public static levelMax:number = 5;//最大等级
    /** 弓箭数量 */
    public backAttack:boolean;//后方箭
    public arrowNum: number;
    public speed: number;
    public res: string;

    public constructor(obj: Role)
    {
        super(obj);
        this.type = WeaponType.BOW;
        this.backAttack = false;
        this.arrowNum = 1;
        this.speed = 50;
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

                let mid = Math.floor(this.arrowNum *0.5);//找中间的弓箭的位置
                for (let i = 0; i < this.arrowNum; i++) {
                    let times = Math.abs(mid - i);
                    if (i < mid) rotations.push(tmpRot - 15 * times);
                    else if (i > mid) rotations.push(tmpRot + 15 * times);
                    else rotations.push(tmpRot);
                }
                if (rotations.length % 2 == 0)//如果是偶数再偏一次
                {
                    for (let i = 0; i < rotations.length; i++) {
                        rotations[i] += 7.5;
                    }
                }
                for (let i = 0; i < rotations.length; i++) {
                    let arrow: Arrow = ObjectPool.instance.getObj("arrow");
                    arrow.id = this.obj.id;

                    //计算伤害 start
                    arrow.damage = this.obj.getDamage();
                    //end
                    arrow.whos = WhosBullet.PLAYER;
                    arrow.display.texture = RES.getRes(this.res);
                    arrow.addChild(arrow.display);
                    arrow.width = arrow.display.width;
                    arrow.height = arrow.display.height;
                    arrow.width = arrow.width / 2;
                    arrow.shp = Util.drawLineRectangle(0, 0, arrow.width, arrow.height, 0xff0000, 2);
                    arrow.addChild(arrow.shp);

                    let point = new egret.Point();
                    this.obj.parent.localToGlobal(this.obj.x, this.obj.y, point);
                    let targetPoint = new egret.Point();
                    group.parent.globalToLocal(point.x, point.y, targetPoint);
                    // group.addChild(arrow);
                    arrow.anchorOffsetX = arrow.width *0.5;
                    arrow.anchorOffsetY = arrow.height *0.5;
                    arrow.index = bg.addBullet(arrow);
                    arrow.x = targetPoint.x;
                    arrow.y = targetPoint.y;
                    arrow.rotation = rotations[i];

                    arrow.speed = this.speed;
                    arrow.moveFrom(targetPoint.x, targetPoint.y, (arrow.rotation - 90) * Math.PI / 180, this.range);
                }
                if(this.backAttack)//后放箭
                {
                    let arrow: Arrow = ObjectPool.instance.getObj("arrow");
                    arrow.id = this.obj.id;

                    //计算伤害 start
                    arrow.damage = this.obj.getDamage();
                    //end
                    arrow.whos = WhosBullet.PLAYER;
                    arrow.display.texture = RES.getRes(this.res);
                    arrow.addChild(arrow.display);
                    arrow.width = arrow.display.width;
                    arrow.height = arrow.display.height;
                    arrow.width = arrow.width / 2;
                    arrow.shp = Util.drawLineRectangle(0, 0, arrow.width, arrow.height, 0xff0000, 2);
                    arrow.addChild(arrow.shp);

                    let point = new egret.Point();
                    this.obj.parent.localToGlobal(this.obj.x, this.obj.y, point);
                    let targetPoint = new egret.Point();
                    group.parent.globalToLocal(point.x, point.y, targetPoint);
                    // group.addChild(arrow);
                    arrow.anchorOffsetX = arrow.width *0.5;
                    arrow.anchorOffsetY = arrow.height *0.5;
                    arrow.index = bg.addBullet(arrow);
                    arrow.x = targetPoint.x;
                    arrow.y = targetPoint.y;
                    arrow.rotation = tmpRot-180;

                    arrow.speed = this.speed;
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
                let mid = Math.floor(this.arrowNum *0.5);//找中间的弓箭的位置
                for(let i = 0; i < this.arrowNum; i++)
                {
                    let times = Math.abs(mid - i);
                    if(i < mid) rotations.push(tmpRot - 15 * times);
                    else if(i > mid) rotations.push(tmpRot + 15 * times);
                    else rotations.push(tmpRot);
                }
                if(mid % 2 == 0 && mid != 1)//如果是偶数再偏一次
                {
                    for(let i = 0; i < rotations.length; i++)
                    {
                        rotations[i] += 7.5;
                    }
                }

                //先实例化一支弓箭
                group = Main.instance.gameView.gameBg.arrowGroup;
                for(let i = 0; i < rotations.length; i++)
                {
                    arrow = ObjectPool.instance.getObj("arrow") as Arrow;
                    arrow.id = this.obj.id;

                    arrow.damage = this.obj.getDamage();
                    arrow.whos = WhosBullet.ENEMY;
                    arrow.display.texture = RES.getRes(this.res);
                    arrow.addChild(arrow.display);
                    arrow.width = arrow.display.width;
                    arrow.height = arrow.display.height;
                    arrow.width = arrow.width / 2;
                    arrow.shp = Util.drawLineRectangle(0, 0, arrow.width, arrow.height, 0xff0000, 2);
                    arrow.addChild(arrow.shp);
  
                    //添加显示，设置位置和角度，增加tween
                    let bg = Main.instance.gameView.gameBg;
                    arrow.anchorOffsetX = arrow.width *0.5;
                    arrow.anchorOffsetY = arrow.height *0.5;
                    arrow.index = bg.addBullet(arrow);
                    arrow.x = this.obj.x;
                    arrow.y = this.obj.y;
                    arrow.rotation = rotations[i];

                    arrow.speed = this.speed;
                    arrow.moveFrom(this.obj.x, this.obj.y, (arrow.rotation - 90) * Math.PI / 180, this.range);
                }
                if(this.backAttack)//后放箭
                {
                    arrow = ObjectPool.instance.getObj("arrow") as Arrow;
                    arrow.id = this.obj.id;

                    arrow.damage = this.obj.getDamage();
                    arrow.whos = WhosBullet.ENEMY;
                    arrow.display.texture = RES.getRes(this.res);
                    arrow.addChild(arrow.display);
                    arrow.width = arrow.display.width;
                    arrow.height = arrow.display.height;
                    arrow.width = arrow.width / 2;
                    arrow.shp = Util.drawLineRectangle(0, 0, arrow.width, arrow.height, 0xff0000, 2);
                    arrow.addChild(arrow.shp);
  
                    //添加显示，设置位置和角度，增加tween
                    let bg = Main.instance.gameView.gameBg;
                    arrow.anchorOffsetX = arrow.width *0.5;
                    arrow.anchorOffsetY = arrow.height *0.5;
                    arrow.index = bg.addBullet(arrow);
                    arrow.x = this.obj.x;
                    arrow.y = this.obj.y;
                    arrow.rotation = tmpRot - 180;

                    arrow.speed = this.speed;
                    arrow.moveFrom(this.obj.x, this.obj.y, (arrow.rotation - 90) * Math.PI / 180, this.range);
                }
                // ===== 敌人攻击 end =====
            }break;
        }

        return true;
    }

    public upLevel()
    {
        super.upLevel();
        if(this.level > Bow.levelMax)
        {
            this.level = Bow.levelMax;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv()
    {
        this.range = (this.level - 1) * 40 + 400;
        this.shootTime = 1000 - (this.level - 1) * 100;
        this.speed = (this.level - 1) * 5 + 50;
    }

    public enableSkill(skillType:BowSkillType)
    {
        super.enableSkill(skillType);
        switch(skillType)
        {
            case BowSkillType.AddArrowNum:
                this.arrowNum++;
                this.arrowNum = this.arrowNum < Bow.MAX_ARROW_NUM ? this.arrowNum : Bow.MAX_ARROW_NUM;
                break;
            case BowSkillType.AttackTypeIntensive:
                this.upLevel();
                break;
            case BowSkillType.BackAttack:
                this.backAttack = true;
                break;
        }
    }

    public getSkills():Array<Skill>
    {
        let arr = new Array<Skill>();
        if(this.level < Bow.levelMax)
		{
			let skill = new Skill(WeaponType.BOW,BowSkillType.AttackTypeIntensive);
			arr.push(skill);
		}
        if(this.arrowNum < Bow.MAX_ARROW_NUM)
        {
            let skill = new Skill(WeaponType.BOW,BowSkillType.AddArrowNum);
            arr.push(skill);
        }
        if(!this.backAttack)
        {
            let skill = new Skill(WeaponType.BOW,BowSkillType.BackAttack);
            arr.push(skill);
        }
        return arr;
    }

//class end
}