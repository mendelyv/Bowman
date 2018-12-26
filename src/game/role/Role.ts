
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
	private shieldPower:number;//护甲值，用于计算伤害
	private critRate:number//暴击率

	private exp:number;//当前经验值


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

	protected  getPosInMap()
	{
		//将角色的坐标转化为地图上的二维数组的坐标
		let x = this.x - MapManager.offsetX;
		let y = this.y - MapManager.offsetY;
		if(x<0||y<0||x>MapManager.rowMax*MapManager.cellPix||y>MapManager.colMax*MapManager.cellPix)
		{
			return ;
		}
		let row = Math.floor(x/MapManager.cellPix);
		let col = Math.floor(y/MapManager.cellPix);
		let aroundItem = []; 
		for(let i = -1;i<2;++i)
		{
			for(let j = -1;j<2;++j)
			{
				if(row+i>=0&&row+i<=MapManager.rowMax&&col+j>=0&&col+j<=MapManager.colMax)
				{
					if(!(i==0&&j==0))
					{
						let pos = {row:row+i,col:col+j};
						aroundItem.push(pos);
					}
				}
			}
		}
		return aroundItem;
	}
}