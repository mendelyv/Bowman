
/**角色类基类 */
class Role extends eui.Component 
{
	public die: boolean = false;
	private hp:number;//当前血量
	public get HP(){return this.hp;}
	private maxHp:number;//最大血量
	public get MaxHP(){return this.maxHp;}
	private level:number;//当前等级
	public get Level(){return this.level;}
	private hpTube:HPTube;//角色的血量条

	public speed:number;//移动速度
	public angle:number;

	public constructor()
	{
		super();
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
}