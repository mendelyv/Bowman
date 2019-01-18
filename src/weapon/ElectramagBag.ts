// TypeScript file

/**
 * class name : ElectramagBag
 * description : 电磁包
 * time : 2019.1.17
 */
class ElectramagBag extends Weapon {
    public static MAX_LEVEL: number = 5;//最大等级
    public speed: number;//飞行速度
    public flyRange: number;//飞行距离
    public ElectramagNum: number;
    public constructor(obj: Role) {
        super(obj);
        this.type = WeaponType.ELECTROMAG; //电磁
        this.speed = 40;
        this.flyRange = 400;
        this.ElectramagNum = 1;
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

                    let mid = Math.floor(this.ElectramagNum * 0.5);//找中间的电磁的位置
                    for (let i = 0; i < this.ElectramagNum; i++) {
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
                        let electramag: Electramag = ObjectPool.instance.getObj("electramag",this);
                        electramag.id = this.obj.id;
                        electramag.damage = this.obj.getDamage();
                        electramag.whos = WhosBullet.PLAYER;
                    
                        let point = new egret.Point();
                        this.obj.parent.localToGlobal(this.obj.x, this.obj.y, point);
                        let targetPoint = new egret.Point();
                        group.parent.globalToLocal(point.x, point.y, targetPoint);

                        electramag.index = bg.addBullet(electramag);
                        electramag.x = targetPoint.x;
                        electramag.y = targetPoint.y;
                        electramag.speed = this.speed;
                        electramag.rotation = rotations[i];
                        electramag.moveFrom(targetPoint.x, targetPoint.y, (electramag.rotation - 90) * Math.PI / 180 , this.range);
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

                    let mid = Math.floor(this.ElectramagNum * 0.5);//找中间的电磁的位置
                    for (let i = 0; i < this.ElectramagNum; i++) {
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
                    //======实例化电磁球
                    for (let i = 0; i < rotations.length; i++) {
                        let electramag: Electramag = ObjectPool.instance.getObj("electramag") as Electramag;
                        electramag.id = this.obj.id;

                        electramag.damage = this.obj.getDamage();
                        electramag.whos = WhosBullet.ENEMY;

                        electramag.index = bg.addBullet(electramag);
                        electramag.x = this.obj.x;
                        electramag.y = this.obj.y;
                        electramag.speed = this.speed;
                        electramag.rotation = rotations[i];
                        electramag.moveFrom(this.obj.x, this.obj.y, (electramag.rotation - 90) * Math.PI / 180, this.range);
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
        this.range = (this.level - 1) * 40 + 400;
        this.shootTime = 1000 - (this.level - 1) * 100;
        this.speed = (this.level - 1) * 4 + 40;
    }

    public enableSkill(skillType: ElectramagSkillType) {
        super.enableSkill(skillType);
        switch (skillType) {
            case ElectramagSkillType.AttackTypeIntensive: //攻击方式强化
                this.upLevel();
                break;
        }
    }

    public getSkills(): Array<Skill>
    {
        let arr = new Array<Skill>();
        if(this.level < FireBallBag.MAX_LEVEL)
        {
            let skill = new Skill(WeaponType.ELECTROMAG,ElectramagSkillType.AttackTypeIntensive);
            arr.push(skill);
        }
        return arr;
    }
}