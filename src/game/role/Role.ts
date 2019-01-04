
/**角色类基类 */

class Role extends eui.Component 
{
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


	//
	public doDamage(damage: number) {
		//计算伤害satrt
		damage = damage > 0 ? damage : 0;
		//end
		this.attribute.hp -= damage;
		this.attribute.hp = this.attribute.hp > 0 ? this.attribute.hp : 0;
		if (this.hpTube) {
			this.hpTube.showHp();
		}
	}

	public destroy() {
		this.die = true;
	}

	public resumeBlood(resumeValue: number)//回血
	{
		this.attribute.hp += resumeValue;
		this.attribute.hp = this.attribute.hp < this.attribute.hpMax ? this.attribute.hp : this.attribute.hpMax;
		if (this.hpTube) {
			this.hpTube.showHp();
		}
	}

	public attack()//攻击
	{

	}

	public destructor() {
		if (this.parent) this.parent.removeChild(this);
		if (this.hpTube) {
			this.hpTube.destructor();
		}
	}

	//与周围道具碰撞，吃道具
	public getAroundProperty(property: Property) {
		let propertyType = property.propertyType;
		switch (propertyType) {
			case MapItemType.PROP_BLOOD:
				//this.resumeBlood(10);
				break;
			case MapItemType.PROP_EXP:
				//this.addExp(1);
				break;
		}
	}

	//加经验
	public addExp(expValue: number) {
		this.attribute.exp += expValue;
		if (this.attribute.exp >= this.attribute.expMax) {
			this.attribute.exp = 0;
			this.attribute.expMax += 5;
			this.levelUp();
		}
	}
	//升级
	public levelUp() {
		this.attribute.level++;
	}

	/** 点击技能时增加的属性值 */
	public addSkillProperty(skill: SkillType)
	{
		this.attribute.enable(skill);
	}
}