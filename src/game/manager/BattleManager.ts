
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

		// this.allRole = [this.enemys, this.player];
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
		enemy.enemys = this.enemys;
		Util.push(this.enemys,enemy);
	}

	/** 添加弓箭
	 * @param arrow ：弓箭对象
	 * @param whos ：谁的弓箭  0玩家的，1敌人的
	 */
	public addArrow(arrow: Arrow, whos: WhosArrow): number
	{
		switch(whos)
		{
			case WhosArrow.PLAYER : 
				Util.push(this.arrowsPlayer,arrow);
				return this.arrowsPlayer.indexOf(arrow); 

			case WhosArrow.ENEMY : 
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
				let hitPoint = MapManager.getHitItem(enemy,[MapItemType.PROP_BLOOD,MapItemType.PROP_EXP]);
				if(hitPoint)
				{
					let row = hitPoint.x;
					let col = hitPoint.y;
					let index = this.getPropeyty(row,col)
					if(index !=-1 )
					{
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
								Main.instance.gameView.mapMgr.pushPropToArr(property.propertyType,egret.getTimer());
							}
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
							Main.instance.gameView.mapMgr.pushPropToArr(property.propertyType,egret.getTimer());
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
			for(let i =0;i<this.enemys.length;++i)
			{
				let enemy = this.enemys[i];
				if(enemy&&!enemy.die)
				{
					if(arrow.id == enemy.id)
					{
						continue;
					}
					if(Util.isCircleHit(enemy,arrow,true))
					{
						if(Util.isHit(enemy,arrow,true))
						{
							enemy.doDamage(arrow.damage);
							let atk = this.getRoleOfID(arrow.id);

							//吸血
							if(atk)
								if(atk.attribute.Hemophagia)
									atk.resumeBlood(arrow.damage * 0.5);

							if(enemy.die)
							{
								let role = this.getRoleOfID(arrow.id);
								if(role) 
								{
									role.addExp(1);
									//击杀回血
									if(role.attribute.KillOthenAddBlood)
									{
										role.resumeBlood(0.5 * role.attribute.hpMax);
									}
								}
								let roleName = this.getRoleOfnickName(arrow.id);
								Main.instance.gameView.addMsg(roleName + "杀死了"+this.enemys[i].nickName);
							}
							ObjectPool.instance.pushObj("arrow",arrow);
							break;
						}
					}
				}
			}

			if(Util.isCircleHit(this.player,arrow,true))
			{
				if(Util.isHit(this.player,arrow,true))
				{
					this.player.doDamage(arrow.damage);
					let atk = this.getRoleOfID(arrow.id);
					//吸血
					if(atk)
						if(atk.attribute.Hemophagia)
							atk.resumeBlood(arrow.damage * 0.5);
					if(this.player.die)
					{	
						let role = this.getRoleOfID(arrow.id);
						if(role) 
						{
							role.addExp(1);
							//击杀回血
							if(role.attribute.KillOthenAddBlood)
							{
								role.resumeBlood(0.5 * role.attribute.hpMax);
							}
						}
					}
					ObjectPool.instance.pushObj("arrow",arrow);
					// this.arrowsEnemy[arrow.index] = null;
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
					continue;
				}
				if(Util.isCircleHit(this.enemys[j],arrow,true)){
					if(Util.isHit(this.enemys[j],arrow,true)){
					//扣血
					this.enemys[j].doDamage(arrow.damage);
					//吸血
					if(this.player.attribute.Hemophagia)
						this.player.resumeBlood(arrow.damage * 0.5);
					if(this.enemys[j].die)
					{
						this.player.addExp(1);
						//击杀回血
						if(this.player.attribute.KillOthenAddBlood)
						{
							this.player.resumeBlood(0.5 * this.player.attribute.hpMax);
						}
						Main.instance.gameView.addMsg("你杀死了"+this.enemys[j].nickName);
					}
					ObjectPool.instance.pushObj("arrow",arrow);
					// this.arrowsPlayer[arrow.index] = null;
					}		
				}
			}
		}
		
	}

	/** 根据ID返回角色 */
	public getRoleOfID(id: number)
	{
		if(id == 0)
			return this.player;
		
		for(let i = 0; i < this.enemys.length; i++)
		{
			let enemy = this.enemys[i];
			if(!enemy) continue;
			if(enemy.die) continue;
			if(enemy.id == id)
				return enemy;
		}
		return null;
	}
	/**根据ID返回角色昵称*/
	public getRoleOfnickName(id: number)
	{
		if(id == 0)
			return this.player;
		
		for(let i = 0; i < this.enemys.length; i++)
		{
			let enemy = this.enemys[i];
			if(!enemy) continue;
			if(enemy.die) continue;
			if(enemy.id == id)
				return enemy.nickName;
		}
		return null;
	}

	public destructor()
	{
		for(let i = 0 ;i < this.arrowsEnemy.length;i++)
		{
			if(this.arrowsEnemy[i])
			{
				this.arrowsEnemy[i].destructor();
			}
		}
		this.arrowsEnemy = null;
		for(let i = 0 ;i < this.arrowsPlayer.length;i++)
		{
			if(this.arrowsPlayer[i])
			{
				this.arrowsPlayer[i].destructor();
			}
		}
		this.arrowsPlayer = null;
		for(let i = 0 ;i < this.enemys.length;i++)
		{
			if(this.enemys[i])
			{
				this.enemys[i].destructor();
			}
		}
		this.enemys = null;
		this.player.destructor();
		this.player = null;
	}

}
