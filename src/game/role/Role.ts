
/**角色类基类 */
class Role extends eui.Component 
{
	public die: boolean = false;
	protected hp:number;//当前血量
	public get HP(){return this.hp;}
	protected maxHp:number;//最大血量
	public get MaxHP(){return this.maxHp;}
	protected level:number;//当前等级
	public get Level(){return this.level;}
	protected hpTube:HPTube;//角色的血量条
	protected shieldPower:number;//护甲值，用于计算伤害
	protected critRate:number//暴击率
	protected exp:number;//当前经验值
	protected expMax:number;//当前最大经验（升级所需经验）

	public speed:number;//移动速度
	public angle:number;

	public constructor()
	{
		super();
		this.exp = 0;
		this.expMax = 5;
	}
	protected createChildren()
	{
		super.createChildren();
	}

	public doDamage(damage:number)
	{
		this.hp -= damage;
		this.hp = this.hp > 0 ? this.hp : 0;
		if(this.hpTube)
		{
			this.hpTube.showHp();
		}
		if(this.hp == 0)
		{
			this.destroy();
		}
	}

	public destroy()
	{
		this.die = true;
		//
	}

	public resumeBlood(resumeValue:number)//回血
	{
		this.hp += resumeValue;
		this.hp = this.hp < this.maxHp ? this.hp : this.maxHp;
	}

	public attack()//攻击
	{

	}

	public destructor()
    {
        if(this.parent) this.parent.removeChild(this);
		if(this.hpTube)
		{
			this.hpTube.destructor();
		}
    }

	//与周围道具碰撞，吃道具
	public getAroundProperty(property:Property)
	{
		let propertyType = property.propertyType;
		switch(propertyType)
		{
			case MapItemType.PROP_BLOOD:
				this.resumeBlood(1);
				break;
			case MapItemType.PROP_EXP:
				this.addExp(1);
				break;
		}
	}

	//加经验
	public addExp(expValue:number)
	{
		this.exp += expValue;
		if(this.exp>=this.expMax)
		{
			this.exp == 0;
			this.expMax +=  5;
			this.levelUp();
		}
	}
	//升级
	public levelUp()
	{
		this.level++;
		
	}
}