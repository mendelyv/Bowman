
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

	/**添加敌人*/
	public addEnemy(enemy:Enemy)
	{
		Util.push(this.enemys,enemy);
	}

	/** 添加弓箭
	 * @param arrow ：弓箭对象
	 * @param whos ：谁的弓箭  0玩家的，1敌人的
	 */
	public addArrow(arrow: Arrow, whos: number): number
	{
		switch(whos)
		{
			case 0 : 
				Util.push(this.arrowsPlayer,arrow);
				return this.arrowsPlayer.indexOf(arrow); 

			case 1 : 
				Util.push(this.arrowsEnemy,arrow);
				return this.arrowsEnemy.indexOf(arrow);

			default: console.error(" ***** error ***** ");
		}
	}

	public update()
	{
		
		//敌人的碰撞检测，吃道具等
		for(let i = 0;i<this.enemys.length;++i)
		{
			let enemy = this.enemys[i];
			if(enemy && !enemy.die)
			{
				let hitPoint = MapManager.getHitItem(this.player,[MapItemType.PROP_BLOOD,MapItemType.PROP_EXP]);
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
							MapManager.mapItems[row][col] = MapItemType.NONE;
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
			let hitPoint = MapManager.getHitItem(this.player,[MapItemType.PROP_BLOOD,MapItemType.PROP_EXP]);
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
							MapManager.mapItems[row][col] = MapItemType.NONE;
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
			let arrow = this.arrowsEnemy[i];
			if(!arrow)
			{
				continue;
			}
			if(!this.player || this.player.die)
			{
				break;
			}
			if(Util.isCircleHit(this.player,arrow,true))
			{
				if(Util.isHit(this.player,arrow,true))
				{
					this.player.doDamage(10);
					ObjectPool.instance.pushObj("arrow",arrow);
					this.arrowsEnemy[i] = null;
				}
			}

		}

		//玩家弓箭的碰撞检测，敌人扣血等
		for(let i = 0;i<this.arrowsPlayer.length;++i)
		{
			let arrow = this.arrowsPlayer[i];
			if(!arrow){
				continue;
			}
			for(let j:number = 0; j < this.enemys.length; j++){
				if(!this.enemys[j] || this.enemys[j].die){
					break;
				}
				if(Util.isCircleHit(this.enemys[j],arrow,true)){
					if(Util.isHit(this.enemys[j],arrow,true)){
					this.enemys[j].doDamage(10);
					ObjectPool.instance.pushObj("arrow",arrow);
					this.arrowsPlayer[i] = null;
					}		
				}
			}
		}
		
	}


}
