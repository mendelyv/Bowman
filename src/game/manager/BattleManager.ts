
//战斗管理类

class BattleManager {

	public player:Player;
	public propertys:Array<Property>;//所有地图上的道具
	public enemys:Array<Enemy>;//所有敌人
	public arrowsPlayer:Array<Arrow>;//玩家的所有弓箭
	public arrowsEnemy:Array<Arrow>;//所有敌人的弓箭

	public constructor() 
	{
		this.propertys = new Array<Property>();
		this.enemys = new Array<Enemy>();
		this.arrowsEnemy = new Array<Arrow>();
		this.arrowsPlayer = new Array<Arrow>();
	}

	public addProperty(property:Property)
	{
		for(let i=0;i < this.propertys.length;i++)
		{
			if(!this.propertys[i])//可能有空的坑
			{
				this.propertys[i] = property;
				return;
			}
		}
		this.propertys.push(property);
	}

	public getPropeyty(row:number,col:number)
	{
		for(let i =0;i<this.propertys.length;++i)
		{
			let property = this.propertys[i];
			if(property)
			{
				if(property.Row == row && property.Col == col)
				{
					return	this.propertys[i];
				}
			}
		}
	}


	public addEnemy(enemy:Enemy)
	{
		for(let i = 0; i<this.enemys.length;++i)
		{
			let enemy = this.enemys[i];
			if(!enemy)
			{
				this.enemys[i] = enemy;
				return;
			}
		}
		this.enemys.push(enemy);
	}

	public update()
	{
		//敌人弓箭的碰撞检测，玩家扣血等
		for(let i = 0 ;i<this.arrowsEnemy.length;++i)
		{

		}

		//敌人的碰撞检测，吃道具等
		for(let i = 0;i<this.enemys.length;++i)
		{
			let enemy = this.enemys[i];
			if(enemy)
			{
				// if()碰撞了
				// {
					let row = 1;
					let col = 1;
					let property = this.getPropeyty(row,col);
					enemy.getAroundProperty(property);
					ObjectPool.instance.pushObj("property",property);
				// }
			}
		}

		//玩家的碰撞检测，吃道具


		//玩家弓箭的碰撞检测，敌人扣血等
		for(let i = 0;i<this.arrowsPlayer.length;++i)
		{

		}
		
	}

}
