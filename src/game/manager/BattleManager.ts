
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
					return	i;
				}
			}
		}
		return -1;
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
		
		//敌人的碰撞检测，吃道具等
		for(let i = 0;i<this.enemys.length;++i)
		{
			let enemy = this.enemys[i];
			if(enemy && !enemy.die)
			{
				let hitPoint = MapManager.getHitItem(this.player,[2,3]);
				if(hitPoint)
				{
					let row = hitPoint.x;
					let col = hitPoint.y;
					let index = this.getPropeyty(row,col)
					if(index !=-1 )
					{
						continue;
					}
					let property = this.propertys[index];
					//console.log("row:"+row +";col:"+col +"    "+ egret.getTimer());
			 		if(Util.isCircleHit(enemy,property,true))
					{
				 		if(Util.isHit(enemy,property,true))
				 		{
							enemy.getAroundProperty(property);
							MapManager.mapItems[row][col] = 0;
							ObjectPool.instance.pushObj("property",property);
							this.propertys[index] = null;
						}
					}
				}
			}
		}

		//玩家的碰撞检测，吃道具
		if(this.player && !this.player.die)
		{
			let hitPoint = MapManager.getHitItem(this.player,[2,3]);
			if(hitPoint)
			{
				let row = hitPoint.x;
				let col = hitPoint.y;
				let index = this.getPropeyty(row,col)
				if(index!=-1)
				{
					let property = this.propertys[index];
					//console.log("row:"+row +";col:"+col +"    "+ egret.getTimer());
					if(Util.isCircleHit(this.player,property,true))
					{
						if(Util.isHit(this.player,property,true))
						{
							this.player.getAroundProperty(property);
							MapManager.mapItems[row][col] = 0;
							ObjectPool.instance.pushObj("property",property);
							this.propertys[index] = null;
						}
					}
				}
			}			
		}

		//敌人弓箭的碰撞检测，玩家扣血等
		for(let i = 0 ;i<this.arrowsEnemy.length;++i)
		{
			
		}

		//玩家弓箭的碰撞检测，敌人扣血等
		for(let i = 0;i<this.arrowsPlayer.length;++i)
		{
			
		}
		
	}

}
