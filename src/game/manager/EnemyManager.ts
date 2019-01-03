

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
		// this.initCount = 1;
		this.createEnemys();
	}
	//生成初始敌人数量
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
			let enemy = ObjectPool.instance.getObj("enemy") as Enemy;
			enemy.id = egret.getTimer();
			let point = MapManager.getMapItemPos(vec.x,vec.y);
			enemy.x = point.x;
			enemy.y = point.y;
			Main.instance.gameView.gameBg.addEnemy(enemy);	
		}
		this.bornPiont = null;
	}
	
	/**随机一个位置添加一个敌人到地图*/
	public createOneEnemy(){
		while(true)
		{
			let vec = MapManager.getEmptyItem();
			let p = new egret.Point(vec.row,vec.col);
			if(!this.checkEnemyPos(p)){
				let point = MapManager.getMapItemPos(vec.row,vec.col);
				let enemy = ObjectPool.instance.getObj("enemy") as Enemy;
				enemy.id = egret.getTimer();
				enemy.x = point.x;
				enemy.y	= point.y;	
				Main.instance.gameView.gameBg.addEnemy(enemy); 
				console.log("添加一个敌人到地图"+vec.row+"^^^"+vec.col);
				break;
			}
		}
		
	}
	// 游戏刚开始时，检测是否有相同位置的敌人
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
	//游戏时，检测是否有相同位置的敌人
	public checkEnemyPos(point:egret.Point):boolean
	{
		let enemys = Main.instance.gameView.battleMgr.enemys;
		for(let i = 0 ; i < enemys.length ; i++)
		{
			let enemy = enemys[i];
			if(enemy)
			{
				let p = new egret.Point(enemy.x,enemy.y);
				if(enemy.parent)
				{
					enemy.parent.localToGlobal(enemy.x,enemy.y,p);
				}
				let item = MapManager.getRowColOfMap(p,true);
				if(Math.abs(item.x-point.x)<=2&&Math.abs(item.y-point.y)<=2)
				{
					return true;
				}
			}
		}
		return false;
	}
}