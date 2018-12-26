
//战斗管理类

class BattleManager {
	public player:Player;
	public propertys:Array<Property>;
	public enemys:Array<Enemy>;

	public constructor() 
	{
		this.propertys = new Array<Property>();
		this.enemys = new Array<Enemy>();
	}

	public addProperty(property:Property)
	{
		this.propertys.push(property);
	}

	public addEenmy(enemy:Enemy)
	{
		this.enemys.push(enemy);
	}

}
