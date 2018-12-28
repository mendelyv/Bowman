

//怪物管理类，管理怪物生成
class EnemyManager {
	//初始刷新的数量
	public static initCount:number = 7;
	
	public constructor() 
	{
		this.createEnemys();
	}

	 public createEnemys()
	{
		 
		let enemyArr = new Array<Enemy>();
		for(let i:number = 0; i < EnemyManager.initCount;i++ ){
			 let enemy: Enemy;
			 enemy = ObjectPool.instance.getObj("enemy");
			let vec = MapManager.getEmptyItem();
			let point = MapManager.getMapItemPos(vec.row,vec.col);
			enemy.x = point.x;
			enemy.y = point.y;
			enemyArr.push(enemy);
		}
		// enemyArr.forEach((element: Enemy)=>{
		// 	element.AI.drawCircle();
		// })
		Main.instance.gameView.gameBg.addEnemy(enemyArr);	
	}

}