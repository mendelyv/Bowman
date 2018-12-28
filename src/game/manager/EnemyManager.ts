

//怪物管理类，管理怪物生成
class EnemyManager {
	//初始刷新的数量
	public initCount:number;
	//开始出生的点的位置
	public bornPiont:Array<egret.Point>;

	public constructor() 
	{
		this.init();
	}

	public init()
	{	
		this.bornPiont = new Array<egret.Point>();
		this.initCount = Util.getRandomRange(5,9);
		this.createEnemys();
	}

	public createEnemys()
	{
		let count = 0;
		while( count < this.initCount)
		{
			let vec = MapManager.getEmptyItem();
			let point = new egret.Point(vec.row,vec.col);
			if(!this.hasSameBornPoint(point))
			{
				this.bornPiont.push(point);
				count++;
			}
		}
		for(let i = 0; i < this.bornPiont.length;i++ )
		{
			let vec = this.bornPiont[i];
			let enemy = ObjectPool.instance.getObj("enemy");
			let point = MapManager.getMapItemPos(vec.x,vec.y);
			enemy.x = point.x;
			enemy.y = point.y;
			Main.instance.gameView.gameBg.addEnemy(enemy);	
		}
		
	}

	public hasSameBornPoint(point:egret.Point)
	{
		let b = false;
		for(let i = 0;i<this.bornPiont.length;++i)
		{
			if(this.bornPiont[i].x==point.x&&this.bornPiont[i].y==point.y)
			{
				b = true;
				break;
			}
		}
		return b;
	}

}