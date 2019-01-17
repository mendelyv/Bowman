// TypeScript file

/**
 * class name : FireBallBag
 * description : 火球包
 * time : 2019.1.15
 */
class FireBallBag extends Weapon {
    public static MAX_LEVEL: number = 5;//最大等级
    public speed: number;//飞行速度
    public flyRange: number;//飞行距离
    public fireBallNum: number;
    public constructor(obj: Role) {
        super(obj);
        this.type = WeaponType.FIREBALL; //火球
        this.speed = 80;
        this.flyRange = 500;
        this.fireBallNum = 2;
    }
    //攻击
    public attack(attackType: number): boolean {
        if (!super.attack(attackType)) return false;

        switch (attackType) {
            case 0:
                {
                    // ===========主玩家攻击 start =======
                    let bg = Main.instance.gameView.gameBg;
                    let group = bg.arrowGroup;
                    let rotations = new Array<number>();
                    let tmpRot: number = this.obj.arrow.rotation + 90;

                    let mid = Math.floor(this.fireBallNum * 0.5);//找中间的火球的位置
                    for (let i = 0; i < this.fireBallNum; i++) {
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
                        let fireball: FireBall = ObjectPool.instance.getObj("fireball",this);
                        fireball.id = this.obj.id;
                        fireball.damage = this.obj.getDamage();
                        fireball.whos = WhosBullet.PLAYER;
                    
                        let point = new egret.Point();
                        this.obj.parent.localToGlobal(this.obj.x, this.obj.y, point);
                        let targetPoint = new egret.Point();
                        group.parent.globalToLocal(point.x, point.y, targetPoint);

                        fireball.index = bg.addBullet(fireball);
                        fireball.x = targetPoint.x;
                        fireball.y = targetPoint.y;
                        fireball.speed = this.speed;
                        fireball.rotation = rotations[i];
                        fireball.moveFrom(targetPoint.x, targetPoint.y, (fireball.rotation - 90) * Math.PI / 180 , this.range);
                    }
                    // ===========主玩家攻击 end ======= 
                } break;

            case 1:
                {
                    // ===========敌人攻击 start ========
                    let bg = Main.instance.gameView.gameBg;
                    let group = bg.arrowGroup;

                    //旋转人物
                    if (this.obj.target) {
                        this.obj.lookAtTarget();
                    }

                    let rotations = new Array<number>();
                    let tmpRot: number = this.obj.arrow.rotation + 90;

                    let mid = Math.floor(this.fireBallNum * 0.5);//找中间的火球的位置
                    for (let i = 0; i < this.fireBallNum; i++) {
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
                    //======实例化火球
                    for (let i = 0; i < rotations.length; i++) {
                        let fireball: FireBall = ObjectPool.instance.getObj("fireball") as FireBall;
                        fireball.id = this.obj.id;

                        fireball.damage = this.obj.getDamage();
                        fireball.whos = WhosBullet.ENEMY;

                        fireball.index = bg.addBullet(fireball);
                        fireball.x = this.obj.x;
                        fireball.y = this.obj.y;
                        fireball.speed = this.speed;
                        fireball.rotation = rotations[i];
                        fireball.moveFrom(this.obj.x, this.obj.y, (fireball.rotation - 90) * Math.PI / 180, this.range);
                    }
                    // ===========敌人攻击 end   ======== 
                } break;
        }
        return true;
    }

    public upLevel() {
        super.upLevel();
        if (this.level > FireBallBag.MAX_LEVEL) {
            this.level = FireBallBag.MAX_LEVEL;
        }
        this.setWeaponDataOfLv();
    }

    private setWeaponDataOfLv() {
        this.range = (this.level - 1) * 50 + 500;
        this.shootTime = 1500 - (this.level - 1) * 150;
        this.speed = (this.level - 1) * 8 + 80;
    }

    public enableSkill(skillType: FireBallSkillType) {
        super.enableSkill(skillType);
        switch (skillType) {
            case FireBallSkillType.AttackTypeIntensive: //攻击方式强化
                this.upLevel();
                break;
        }
    }

    public getSkills(): Array<Skill>
    {
        let arr = new Array<Skill>();
        if(this.level < FireBallBag.MAX_LEVEL)
        {
            let skill = new Skill(WeaponType.FIREBALL,FireBallSkillType.AttackTypeIntensive);
            arr.push(skill);
        }
        return arr;
    }
}