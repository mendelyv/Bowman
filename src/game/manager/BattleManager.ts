
//战斗管理类

class BattleManager {

	public player:Player;
	public propertys:Array<Property>;//所有地图上的道具
	public enemys:Array<Enemy>;//所有敌人

	public bulletsPlayer:Array<Bullet>;//玩家的子弹
	public bulletsEnemy:Array<Bullet>;//所有敌人的子弹

	public roleArray:Array<Role>;//地图上所有敌人和玩家
	public constructor() 
	{
		this.propertys = new Array<Property>();
		this.enemys = new Array<Enemy>();
		this.roleArray = new Array<Role>();
		this.bulletsEnemy = new Array<Bullet>();
		this.bulletsPlayer = new Array<Bullet>();
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
		this.roleArray.push(enemy);;
	}

	/** 添加弓箭
	 * @param bullet ：子弹对象
	 * @param whos ：谁的子弹  0玩家的，1敌人的
	 */
	public addBullet(bullet: Bullet, whos: WhosBullet): number
	{
		switch(whos)
		{
			case WhosBullet.PLAYER : 
				Util.push(this.bulletsPlayer,bullet);
				return this.bulletsPlayer.indexOf(bullet); 

			case WhosBullet.ENEMY : 
				Util.push(this.bulletsEnemy,bullet);
				return this.bulletsEnemy.indexOf(bullet);

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
		for(let i = 0 ;i<this.bulletsEnemy.length;++i)
		{
			let bullet = this.bulletsEnemy[i];
			if(!bullet)
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
					if(bullet.id == enemy.id)
					{
						continue;
					}
					if(bullet.canDamage(enemy, true))
					{
						enemy.doDamage(bullet.damage);
						let atk = this.getRoleOfID(bullet.id);
						//吸血
						if(atk)
							if(atk.attribute.Hemophagia)
								atk.resumeBlood(bullet.damage * 0.5);

						if(enemy.die)
						{
							this.removeEnemyById(enemy.id);
							let role = this.getRoleOfID(bullet.id);
							if(role) 
							{	
								role.addExp(1);
								//击杀回血
								if(role.attribute.KillOthenAddBlood)
								{
									role.resumeBlood(0.5 * role.attribute.hpMax);
								}
							Main.instance.gameView.addMsg(role.nickName + "杀死了"+enemy.nickName);
							}
						}

						if(bullet.activeTime < 0)
							ObjectPool.instance.pushObj(bullet.poolName, bullet);
						break;
					}
				}
			}

			if(bullet.canDamage(this.player, true))
			{
				this.player.doDamage(bullet.damage);
				let atk = this.getRoleOfID(bullet.id);
				//吸血
				if(atk)
					if(atk.attribute.Hemophagia)
						atk.resumeBlood(bullet.damage * 0.5);
				if(this.player.die)
				{	
					this.removeEnemyById(this.player.id);
					let role = this.getRoleOfID(bullet.id);
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
				if(bullet.activeTime < 0)
					ObjectPool.instance.pushObj(bullet.poolName, bullet);
			}
		}

		//玩家弓箭的碰撞检测，敌人扣血等
		for(let i = 0;i<this.bulletsPlayer.length;++i)
		{
			let bullet = this.bulletsPlayer[i];
			if(!bullet){
				continue;
			}
			for(let j:number = 0; j < this.enemys.length; j++){
				let enemy = this.enemys[j];
				if(!enemy || enemy.die){
					continue;
				}
				if(bullet.canDamage(enemy, false))
				{
					console.log(" hited ");
					enemy.doDamage(bullet.damage);
					//吸血
					if(this.player.attribute.Hemophagia)
						this.player.resumeBlood(bullet.damage * 0.5);

					if(this.enemys[j].die)
					{
						this.removeEnemyById(this.enemys[j].id);
						this.player.addExp(1);
						//击杀回血
						if(this.player.attribute.KillOthenAddBlood)
						{
							this.player.resumeBlood(0.5 * this.player.attribute.hpMax);
						}
						Main.instance.gameView.addMsg("你杀死了"+this.enemys[j].nickName);
						
					}
					if(bullet.activeTime < 0)
						ObjectPool.instance.pushObj(bullet.poolName, bullet);
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
	/**根据ID移除敌人*/
	public removeEnemyById(id:number){
		for(let i= 0;i<this.roleArray.length;i++){
			let role = this.roleArray[i];
			if(!role) continue;
			if(role.id == id){
				this.roleArray[i] = null;
				this.roleArray.splice(i,1);
				
			}
		}
	}
	public destructor()
	{
		for(let i = 0 ;i < this.bulletsEnemy.length;i++)
		{
			if(this.bulletsEnemy[i])
			{
				this.bulletsEnemy[i].destructor();
			}
		}
		this.bulletsEnemy = null;
		for(let i = 0 ;i < this.bulletsPlayer.length;i++)
		{
			if(this.bulletsPlayer[i])
			{
				this.bulletsPlayer[i].destructor();
			}
		}
		this.bulletsPlayer = null;
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
