
/**角色类基类 */

class Role extends eui.Component 
{
	public arrow: eui.Image;
	public role_img: eui.Image;
	public bubble_img: eui.Image;
	public target: Role;
	public weapon: Weapon;

	public id: number;//人物编号，使用这个来区分人物

	public die: boolean = false;

	public attribute: Attribute;
	public hpTube: HPTube;//角色的血量条
	public nickName:string;//角色昵称
	public constructor() {
		super();
		this.attribute = new Attribute(this);
	}
	protected createChildren() {
		super.createChildren();
	}


	/*被攻击，受伤害掉血
	*@param damage: 敌人造成的伤害
	*/   
	public doDamage(damage: number) {
		//计算伤害satrt 减去自己的防御
		damage *= 1 - Attribute.defenseArr[this.attribute.DefenseLv]; 
		//end
		this.attribute.hp -= damage;
		this.attribute.hp = this.attribute.hp > 0 ? this.attribute.hp : 0;
		if (this.hpTube) {
			this.hpTube.showHp();
		}
		if(this.attribute.hp == 0)
		{
			this.destroy();
		}
	}

	//角色死亡
	public destroy() 
	{
		this.die = true;
	}
	//对别人的伤害
	public getDamage()
	{
		//基础攻击力 + 技能加成
		let damage = this.attribute.power*(1 + Attribute.attackPowerArr[this.attribute.AttackPowerLv]);
		//是否暴击
		if(this.isCritical())
		{
			damage *= 2;
		}
		return damage;
	}

	//是否暴击，用以计算伤害
	public isCritical()
	{
		let maxCount = 10000;
		let count = Attribute.criticalArr[this.attribute.CriticalLv] * maxCount;
		let num = Util.getRandomRange(1,maxCount);
		if(num <= count)
		{
			return true;
		}
		return false;
	}

	//isSingle:是否不适用技能
	public resumeBlood(resumeValue: number,isSingle:boolean = false)//回血
	{
		//计算血量start
		let rate = 1;
		if(!isSingle)
		{
			rate = 1 + Attribute.resumeBloodArr[this.attribute.ResumeBloodLv];
		}
		this.attribute.hp += resumeValue * rate;
		//end
		this.attribute.hp = this.attribute.hp < this.attribute.hpMax ? this.attribute.hp : this.attribute.hpMax;
		if (this.hpTube) {
			this.hpTube.showHp();
		}
	}

	//加经验
	public addExp(expValue: number) 
	{
		this.attribute.exp += expValue * ( 1 + Attribute.addExpArr[this.attribute.AddExpLv]);
		if (this.attribute.exp >= this.attribute.expMax) 
		{
			this.levelUp();
		}
	}

	//升级
	public levelUp() 
	{	
		this.attribute.level++;
	}

	public attack()//攻击
	{

	}

	// 获取移动速度
	public getSpeed()
	{	
		let speed = this.attribute.speed;
		if(this.attribute.SpeedIntensive)
		{
			speed *= 1.5;
		}
		return speed;
	}

	public destructor() {
		if (this.parent) this.parent.removeChild(this);
		if (this.hpTube) {
			this.hpTube.destructor();
		}
	}

	public lookAtTarget() { }

	//与周围道具碰撞，吃道具
	public getAroundProperty(property: Property) {
		let propertyType = property.propertyType;
		switch (propertyType) {
			case MapItemType.PROP_BLOOD:
				this.resumeBlood(10);
				break;
			case MapItemType.PROP_EXP:
				this.addExp(10);
				break;
		}
	}

	/** 点击技能时增加的属性值 */
	public addSkillProperty(skill: SkillType)
	{
		this.attribute.enable(skill);
	}

}